import { cn } from "@/lib/utils"

interface MarkdownProps {
  markdown: string
  className?: string
}

export default function Markdown({ markdown, className }: MarkdownProps) {
  const convertToHtml = (markdownText: string) => {
    // Convert headers with Tailwind classes (fixed sizing)
    markdownText = markdownText.replace(
      /^### (.*$)/gim,
      '<h3 class="text-base font-semibold my-2">$1</h3>'
    )
    markdownText = markdownText.replace(
      /^## (.*$)/gim,
      '<h2 class="text-lg font-semibold my-3">$1</h2>'
    )
    markdownText = markdownText.replace(
      /^# (.*$)/gim,
      '<h1 class="text-xl font-bold my-3">$1</h1>'
    )

    // Convert bold text with Tailwind
    markdownText = markdownText.replace(
      /\*\*(.*)\*\*/gim,
      '<strong class="font-bold">$1</strong>'
    )

    // Convert italic text with Tailwind
    markdownText = markdownText.replace(
      /\*(.*)\*/gim,
      '<i class="italic">$1</i>'
    )

    // Convert links with Tailwind
    markdownText = markdownText.replace(
      /\[([^[]+)\]$$(.*)$$/gim,
      '<a href="$2" class="text-blue-500 hover:text-blue-700 underline">$1</a>'
    )

    // Convert blockquotes with Tailwind
    markdownText = markdownText.replace(
      /^> (.*$)/gim,
      '<blockquote class="border-l-4 border-gray-500 pl-4 py-1 my-2 text-gray-700">$1</blockquote>'
    )

    // Convert code blocks with black background
    markdownText = markdownText.replace(
      /```(.*?)```/gs,
      '<pre class="bg-[#282C34] text-white p-4 rounded-md my-3 overflow-x-auto text-sm"><code>$1</code></pre>'
    )

    // Convert inline code
    markdownText = markdownText.replace(
      /`([^`]+)`/g,
      '<code class="bg-gray-100 text-red-500 px-1 py-0.5 rounded text-sm font-mono">$1</code>'
    )

    // Convert unordered lists
    markdownText = markdownText.replace(
      /^(?:-|\+|\*)\s+(.+)$/gim,
      '<li class="ml-5 text-sm my-1">$1</li>'
    )
    markdownText = markdownText.replace(
      /((?:<li class="ml-5 text-sm my-1">.+<\/li>\s*)+)/gim,
      '<ul class="list-disc my-3">$1</ul>'
    )

    // Convert ordered lists
    markdownText = markdownText.replace(
      /^\d+\.\s+(.+)$/gim,
      '<li class="ml-5 text-sm my-1">$1</li>'
    )
    markdownText = markdownText.replace(
      /((?:<li class="ml-5 text-sm my-1">.+<\/li>\s*)+)/gim,
      '<ol class="list-decimal pl-5 my-3">$1</ol>'
    )

    // Handle paragraphs by wrapping non-tagged text in <p>
    markdownText = markdownText.replace(
      /^(?!<(?:ul|ol|li|h1|h2|h3|h4|h5|h6|blockquote|a|strong|i|em|div|p|pre)\b)[^<]+/gim,
      '<p class="text-sm my-2 leading-relaxed">$&</p>'
    )

    // Replace line breaks with <br>
    markdownText = markdownText.replace(/\n/g, "<br>")

    return markdownText
  }

  const htmlContent = convertToHtml(markdown)

  return (
    <div
      className={cn("prose max-w-none", className)}
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  )
}
