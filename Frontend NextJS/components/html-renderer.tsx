"use client"

import { useEffect, useRef } from "react"

interface HtmlRendererProps {
  htmlContent: string
}

export function HtmlRenderer({ htmlContent }: HtmlRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.innerHTML = htmlContent
    }
  }, [htmlContent])

  return <div ref={containerRef} className="mt-4 overflow-x-auto rounded-md border border-gray-200" />
}