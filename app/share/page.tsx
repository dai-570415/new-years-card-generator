"use client"

import { useEffect, useState, useRef } from "react"
import Link from "next/link"
import Image from 'next/image'
import html2canvas from "html2canvas"

export default function SharePage() {
    const [cardData, setCardData] = useState<any>(null)
    const cardRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const savedData = localStorage.getItem("cardData")
        if (savedData) {
            setCardData(JSON.parse(savedData))
        }
    }, [])

    const handleDownload = async () => {
        if (cardRef.current) {
            const canvas = await html2canvas(cardRef.current, {
                useCORS: true,
                allowTaint: true,
            })
            const image = canvas.toDataURL("image/jpg")
            const link = document.createElement("a")
            link.href = image
            link.download = "年賀状.jpg"
            link.click()
        }
    }

    const handleClearStorage = () => {
        localStorage.removeItem("cardData") // データを削除
        setCardData(null) // ステートも更新
    }

    if (!cardData) {
        return (
            <div className="text-center fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <p className="my-6">
                    デザインが保存されていません。<br />
                    以下ボタンからデザインを作成してください。
                </p>
                <Link href="/templates" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    新しい年賀状を作る
                </Link>
            </div>
        )
    }

    return (
        <main>
            <div className="flex flex-col justify-between w-[calc(100%-40px)] max-w-[calc(720px)] mx-auto py-8">
                <div ref={cardRef} className="text-center relative mx-auto my-8 w-[calc(320px)] max-w-[calc(320px)] h-[calc(240px)] bg-white shadow-lg rounded-lg">
                    <Image
                        src={cardData.imageUrl || "/placeholder.svg"}
                        width={320}
                        height={240}
                        alt="Your Card"
                        className="block w-full"
                    />
                    <div
                        className="absolute leading-[1.2] top-1/2 transform -translate-y-1/2 left-[calc(40px)] right-[calc(40px)]"
                        style={{
                            fontSize: `${cardData.fontSize}px`,
                            color: cardData.fontColor
                        }}>
                        {cardData.text.split("\n").map((line: string, index: number) => <span key={index}>{line}<br /></span>)}
                    </div>
                </div>

                <div className="flex justify-center gap-2 w-[calc(100%)]">
                    <button
                        onClick={handleClearStorage}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        データをクリア
                    </button>

                    <button
                        onClick={handleDownload}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        ダウンロード
                    </button>

                    <Link href="/templates" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                        新しい年賀状を作る
                    </Link>
                </div>
            </div>
        </main>
    )
}