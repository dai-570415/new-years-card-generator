"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { useMotion } from "./hooks/useMotion";

export default function Home() {
  const { showLink } = useMotion();
  return (
    <main className="flex flex-col min-h-screen justify-center">
      <div className="max-w-[calc(100%-80px)] mx-auto md:max-w-sm">
        {showLink && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="mb-6 text-sm">New Year&apos;s Card Generator</h1>
            <h2 className="text-3xl leading-[1.4] mb-4">年賀状カードを<br className="sp" />つくろう</h2>
            <p className="text-sm leading-[1.6] mb-8">簡単・おしゃれ・すぐにダウンロード</p>
            <Link
              href="/templates"
              className="block text-center text-sm bg-black text-white mb-6 px-6 py-3 rounded-full hover:bg-red-500 transition-colors"
            >
              始める
            </Link>
          </motion.div>
        )}
      </div>
    </main>
  )
}