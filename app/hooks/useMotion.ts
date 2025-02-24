import { useEffect, useState } from "react"

export const useMotion = () => {
    const [showLink, setShowLink] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setShowLink(true), 500)
        return () => clearTimeout(timer)
    }, [])

    return { showLink };
}