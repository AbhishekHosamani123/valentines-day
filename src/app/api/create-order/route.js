import Razorpay from "razorpay";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const razorpay = new Razorpay({
            key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET,
        });

        const payment_capture = 1;
        const amount = 49 * 100; // amount in paise (49 INR)
        const currency = "INR";
        const options = {
            amount: amount.toString(),
            currency,
            receipt: `receipt_${Date.now()}`,
            payment_capture,
        };

        const response = await razorpay.orders.create(options);

        return NextResponse.json({
            id: response.id,
            currency: response.currency,
            amount: response.amount,
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json(
            { error: "Error creating Razorpay order" },
            { status: 500 }
        );
    }
}
