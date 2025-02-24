import Link from "next/link"
import Image from "next/image"

const templates = [
    { id: "traditional", name: "和風", image: "/template/traditional.webp" },
    { id: "chara", name: "キャラクター", image: "/template/chara.webp" },
    { id: "pop", name: "ポップ", image: "/template/pop.webp" },
    { id: "gorgeous", name: "ゴージャス", image: "/template/gorgeous.webp" },
]

export default function TemplatesPage() {
    return (
        <main className="flex flex-col min-h-screen justify-center">
            <div className="text-center max-w-[calc(100%-80px)] mx-auto md:max-w-sm">
                <h2 className="text-2xl leading-[1.4] mb-6">テンプレートを選択</h2>
                <div className="grid grid-cols-2 md:grid-cols-2 gap-4 mb-8">
                    {templates.map((template) => (
                        <Link key={template.id} href={`/edit/${template.id}`} className="block">
                            <div className="border rounded-lg bg-white overflow-hidden hover:shadow-lg transition duration-300">
                                <Image
                                    src={template.image || "/placeholder.svg"}
                                    alt={template.name}
                                    width={300}
                                    height={400}
                                    className="w-full"
                                    unoptimized
                                />
                                <div className="p-2 text-center">{template.name}</div>
                            </div>
                        </Link>
                    ))}
                </div>
                <Link href="/share" className="text-ws hover:text-red-500">作成済みのデザインをみる</Link>
            </div>
        </main>
    )
}