
"use client"

import { useEffect, useState, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { supabase } from "@/lib/supabaseClient"
import { Heart, CheckCircle, ExternalLink, Loader2 } from "lucide-react"
import Link from "next/link"

function UnlockContent() {
    const searchParams = useSearchParams()
    const token = searchParams.get("token")

    const [status, setStatus] = useState("loading") // loading, success, error
    const [valentineLink, setValentineLink] = useState("")

    useEffect(() => {
        async function performUnlock() {
            if (!token) {
                setStatus("error")
                return
            }

            try {
                // Update payment_status to 'paid' via secure RPC
                const { error } = await supabase
                    .rpc('mark_as_paid', { v_id: token })

                if (error) throw error

                setValentineLink(`${window.location.origin}/love/${token}`)
                setStatus("success")
            } catch (err) {
                console.error("Unlock error:", err)
                setStatus("error")
            }
        }

        performUnlock()
    }, [token])

    if (status === "loading") {
        return (
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-12 h-12 text-pink-500 animate-spin" />
                <p className="text-pink-100 font-medium text-lg">Unlocking your surprise...</p>
            </div>
        )
    }

    if (status === "error") {
        return (
            <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 text-center max-w-md w-full">
                <Heart className="w-16 h-16 text-red-400 mx-auto mb-4" />
                <h1 className="text-2xl font-bold text-white mb-2">Oops! Something went wrong</h1>
                <p className="text-pink-100/70 mb-6">We couldn't verify your payment token. Please try again or contact support.</p>
                <Link href="/" className="text-pink-400 underline hover:text-pink-300">Return Home</Link>
            </div>
        )
    }

    return (
        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-3xl border border-white/20 text-center max-w-md w-full shadow-2xl">
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Payment Successful! 🎉</h1>
            <p className="text-pink-100/70 mb-8">Your special Valentine surprise is now permanently unlocked.</p>

            <div className="bg-white/5 p-4 rounded-xl border border-white/10 mb-8 break-all font-mono text-sm text-pink-200">
                {valentineLink}
            </div>

            <div className="flex flex-col gap-4">
                <Link
                    href={valentineLink}
                    className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                    View Your Page <ExternalLink className="w-5 h-5" />
                </Link>

                <button
                    onClick={() => {
                        navigator.clipboard.writeText(valentineLink)
                        alert("Link copied!")
                    }}
                    className="text-white/60 text-sm hover:text-white transition-colors"
                >
                    Copy shareable link 📋
                </button>
            </div>
        </div>
    )
}

export default function UnlockPage() {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <Suspense fallback={<Loader2 className="w-12 h-12 text-pink-500 animate-spin" />}>
                <UnlockContent />
            </Suspense>
        </div>
    )
}
