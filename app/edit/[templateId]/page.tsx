"use client"

import { useState, useEffect, use } from "react"
import Link from "next/link"
import Image from 'next/image'

export default function EditPage({ params }: { params: Promise<{ templateId: string }> }) {
    const [text, setText] = useState("明けましておめでとうございます。")
    const [fontSize, setFontSize] = useState(24)
    const [fontColor, setFontColor] = useState("#000000")
    const [imageUrl, setImageUrl] = useState("")

    const [fontFamily, setFontFamily] = useState("'Zen Kaku Gothic Antique', sans-serif")
    const fontOptions = [
        { id: "1", label: "ゴシック体", value: "'Zen Kaku Gothic Antique', sans-serif" },
        { id: "2", label: "丸ゴシック体", value: "'Zen Maru Gothic', serif" },
        { id: "3", label: "明朝体", value: "'EB Garamond', 'Hina Mincho', serif" },
    ];

    const unwrapParams = use(params);

    useEffect(() => {
        setImageUrl(`/template/${unwrapParams.templateId}.webp`)
    }, [unwrapParams.templateId])

    const handleSave = () => {
        localStorage.setItem(
            "cardData",
            JSON.stringify({ templateId: unwrapParams.templateId, text, fontSize, fontColor, fontFamily, imageUrl }),
        )
        alert("保存しました！")
    }

    return (
        <main>
            <div className="flex flex-col justify-between w-[calc(100%-40px)] max-w-[calc(720px)] mx-auto py-8">
                {/* プレビュー */}
                <div className="text-center relative mx-auto my-8 w-[calc(320px)] max-w-[calc(320px)] h-[calc(240px)] bg-white shadow-lg rounded-lg">
                    {imageUrl && (
                        <Image
                            src={imageUrl || "/placeholder.svg"}
                            width={320}
                            height={240}
                            alt="Template"
                            className="block w-full rounded-lg"
                        />
                    )}
                    <div
                        className="absolute leading-[1.2] top-1/2 transform -translate-y-1/2 left-[calc(40px)] right-[calc(40px)]"
                        style={{
                            fontSize: `${fontSize}px`,
                            color: fontColor,
                            fontFamily: `${fontFamily}`
                        }}>
                        {text.split("\n").map((line, index) => <span key={index}>{line}<br /></span>)}
                    </div>
                </div>

                <div className="w-[calc(100%)]">
                    {/* 編集 */}
                    <div className="mb-4 p-6 rounded-lg bg-white">
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="w-full p-2 border rounded"
                            rows={4}
                        />
                        <div className="mt-2">
                            <label className="block">フォントサイズ:</label>
                            <input
                                type="range"
                                min="12"
                                max="48"
                                value={fontSize}
                                onChange={(e) => setFontSize(Number(e.target.value))}
                                className="w-full"
                            />
                        </div>
                        <div className="mt-2">
                            <label className="block">フォントカラー:</label>
                            <input
                                type="color"
                                value={fontColor}
                                onChange={(e) => setFontColor(e.target.value)}
                                className="w-full"
                                style={{
                                    appearance: "none",
                                    width: "100%",
                                    height: "40px",
                                    border: "none",
                                    borderRadius: "0px",
                                    padding: "0",
                                    background: "none"
                                }}
                            />
                        </div>

                        <div className="flex gap-4 mt-2">
                            {fontOptions.map((font) => (
                                <div key={font.id}>
                                    <input
                                        type="radio"
                                        name="fontFamily"
                                        className="mr-1"
                                        id={font.id}
                                        value={font.value}
                                        onChange={() => setFontFamily(font.value)}
                                    />
                                    <label htmlFor={font.id}>{font.label}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* ボタン */}
                    <div className="text-center flex justify-center gap-2 flex-wrap">
                        <Link href="/templates" className="w-full md:w-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">テンプレート選択</Link>
                        <button onClick={handleSave} className="w-full md:w-auto bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                            保存
                        </button>
                        <Link href="/share" className="w-full md:w-auto bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">ダウンロード</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}