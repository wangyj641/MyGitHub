import MarkdownIt from 'markdown-it'
import 'github-markdown-css'
import { memo, useMemo } from "react"

const md = new MarkdownIt({
    html: true,
    linkify: true
})

function b64_to_utf8(str: string) {
    return decodeURIComponent(escape(atob(str)))
}

export default memo(function MarkdownRender({ content, isBase64 }: { content: any, isBase64: boolean }) {
    const markdown = isBase64 ? b64_to_utf8(content) : content
    const html = useMemo(() => md.render(markdown), [markdown])

    return (
        <div className="markdown-body">
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </div >
    )
})