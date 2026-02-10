import { NextResponse } from "next/server";
import crypto from "crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req) {
    try {
        const { orderCreationId, razorpayPaymentId, razorpaySignature, valentineId } = await req.json();

        const signature = orderCreationId + "|" + razorpayPaymentId;
        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(signature.toString())
            .digest("hex");



        if (expectedSignature !== razorpaySignature) {
            return NextResponse.json(
                { message: "Invalid signature", isOk: false },
                { status: 400 }
            );
        }

        // Update database
        const { error } = await supabaseAdmin
            .from("valentines")
            .update({ payment_status: "paid" })
            .eq("id", valentineId);

        if (error) {
            console.error("Supabase update error:", error);
            return NextResponse.json(
                { message: "Payment verified but database update failed", isOk: false },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Payment verified successfully", isOk: true },
            { status: 200 }
        );
    } catch (error) {
        console.error("Verification error:", error);
        return NextResponse.json(
            { message: "Internal Server Error", isOk: false },
            { status: 500 }
        );
    }
}
