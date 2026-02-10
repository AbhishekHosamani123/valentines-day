
"use client"

import { useEffect, useState, useRef } from "react"
import { useParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import ConfessionFlow from "@/components/ConfessionFlow"
import { Heart, Lock, Eye } from "lucide-react"

export default function ValentinePage() {
    const params = useParams()
    const id = Array.isArray(params?.id) ? params.id[0] : params?.id

    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [isPaid, setIsPaid] = useState(false)
    const [viewCount, setViewCount] = useState(0)
    const [isLocked, setIsLocked] = useState(false)

    // Prevent double-fetch in React StrictMode
    const dataFetchedRef = useRef(false)

    // Gumroad Link
    const unlockUrl = typeof window !== 'undefined' ? `${window.location.origin}/unlock?token=${id}` : '';
    const gumroadUrl = `https://abhishekhosamani.gumroad.com/l/lobmf?redirect_url=${encodeURIComponent(unlockUrl)}`;

    const handlePayment = async () => {
        const res = await fetch("/api/create-order", { method: "POST" });
        const data = await res.json();

        if (!data.id) {
            alert("Razorpay payment failed to initiate.");
            return;
        }

        const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            amount: data.amount,
            currency: data.currency,
            name: "Valentine Confession",
            description: "Unlock your special message",
            order_id: data.id,
            handler: async function (response) {
                // Verify Payment
                const verifyRes = await fetch("/api/verify-payment", {
                    method: "POST",
                    body: JSON.stringify({
                        orderCreationId: data.id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature,
                        valentineId: id
                    }),
                });

                const verifyData = await verifyRes.json();

                if (verifyData.isOk) {
                    alert("Payment Successful! Page will reload.");
                    window.location.reload();
                } else {
                    alert("Payment Verification Failed.");
                }
            },
            prefill: {
                name: "Your Name",
                email: "youremail@example.com",
            },
            theme: {
                color: "#ec4899",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    };

    useEffect(() => {
        if (!id || dataFetchedRef.current) return
        dataFetchedRef.current = true


        async function fetchData() {
            try {
                // 1. Fetch & Check Status
                console.log("Fetching valentine for ID:", id);
                const { data: valentine, error: fetchError } = await supabase
                    .from("valentines")
                    .select("*")
                    .eq("id", id)
                    .single()

                if (fetchError) {
                    console.error("Supabase Fetch Error:", fetchError);
                    setError(true); setLoading(false); return;
                }

                if (!valentine) {
                    console.error("Valentine not found (null data)");
                    setError(true); setLoading(false); return;
                }

                if (valentine.payment_status === 'paid') {
                    // Paid = Unlimited Access
                    setData(valentine)
                    setIsPaid(true)
                    setLoading(false)
                } else {
                    // Unpaid = Check/Increment View Count
                    console.log("Incrementing view count...");
                    const { data: newCount, error: rpcError } = await supabase
                        .rpc('increment_view_count', { v_id: id })

                    if (rpcError) {
                        console.error("RPC Error:", rpcError);
                        // Fallback: If RPC fails, just show the valentine but don't count it (safer than blocking)
                        // or throw if you want strictness.
                        // throw rpcError; 

                        // For debugging, let's treat RPC error as non-fatal for now to see if data loads
                        setData(valentine)
                        setLoading(false)
                        return
                    }

                    console.log("New View Count:", newCount);

                    if (newCount <= 3) {
                        // Allowed (1st, 2nd, or 3rd view)
                        setData(valentine)
                        setViewCount(newCount)
                        setLoading(false)
                    } else {
                        // Locked (4th+ view)
                        setIsLocked(true)
                        setLoading(false)
                        // Still set data so we might show background/partner name if needed
                        setData(valentine)
                    }
                }

            } catch (err) {
                console.error("Unexpected Error in fetchData:", err)
                setError(true)
                setLoading(false)
            }
        }

        fetchData()
    }, [id])

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-black"><Heart className="w-12 h-12 text-pink-500 animate-bounce" /></div>

    if (error) return <div className="min-h-screen flex items-center justify-center bg-black text-white"><h1>💔 Oh no! Not found.</h1></div>

    if (isLocked) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-6 text-center">
                <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 max-w-sm w-full">
                    <div className="bg-gradient-to-br from-pink-500 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                        <Lock className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-2xl font-bold mb-4 text-white">Preview Limit Reached 🔒</h1>
                    <p className="text-pink-100/70 mb-6">
                        You've used your 3 free previews. <br />
                        Pay <b>₹49</b> to unlock lifetime access & shareable link!
                    </p>
                    <button onClick={handlePayment} className="block w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition-transform">
                        🔓 Pay ₹49 to Unlock
                    </button>
                </div>
            </div>
        )
    }


    const handleShare = () => {
        if (!isPaid) {
            handlePayment()
            return
        }
        navigator.clipboard.writeText(window.location.href)
        alert("Link copied to clipboard! 📋")
    }

    return (
        <>
            <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

            {/* Header - Only visible if NOT locked AND NOT paid (so it's clean for the recipient) */}
            {!isLocked && !isPaid && (
                <div className="fixed top-0 left-0 right-0 z-[100] bg-indigo-600 text-white px-4 py-2 flex items-center justify-between shadow-lg">
                    <div className="flex items-center gap-2 text-sm font-bold">
                        <Eye className="w-4 h-4" />
                        <span>{!isPaid ? `View ${viewCount}/3` : "Unlocked Forever 💖"}</span>
                    </div>
                    <button
                        onClick={handleShare}
                        className={`${isPaid ? 'bg-green-500 text-white' : 'bg-white text-indigo-600'} px-3 py-1 rounded-full text-xs font-bold hover:opacity-90 transition shadow-sm flex items-center gap-1`}
                    >
                        {isPaid ? (
                            <>📋 Copy Link</>
                        ) : (
                            <><Lock className="w-3 h-3" /> Pay ₹49 to Get Link</>
                        )}
                    </button>
                </div>
            )}

            <ConfessionFlow
                name={data.partner_name}
                message={data.message}
                photos={data.photos}
                musicUrl={data.music_url}
            />
        </>
    )
}
