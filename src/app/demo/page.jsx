"use client"

import ConfessionFlow from "@/components/ConfessionFlow"

export default function DemoPage() {
    // Sample Data for Demo
    const demoData = {
        partner_name: "Pookie 🎀",
        message: "This is a demo message! Starts with a heartfelt note, then shows photos, and finally asks the big question. 💖 \n\n     You saying yes is not just happiness, it’s trust—and I don’t take that lightly. I don’t promise perfection, but I promise honesty, effort, and a love that grows stronger with time. I’m really glad it’s you. \n\nI hope you like this surprise!",
        photos: [
            "/1.jpg",
            "/2.jpg",
            "/3.jpg",
            "/4.jpg",
            "/5.jpg",
            "/6.jpg"
        ],
        music_url: "/HB.mp3" // Default demo music
    }

    return (
        <ConfessionFlow
            name={demoData.partner_name}
            message={demoData.message}
            photos={demoData.photos}
            musicUrl={demoData.music_url}
        />
    )
}
