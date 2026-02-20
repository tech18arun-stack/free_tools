import { useState, useCallback, useMemo } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function MarkdownEditor() {
    const [markdown, setMarkdown] = useState(`# Welcome to Markdown Editor

## Features
- **Live preview** - See your changes instantly
- *Syntax highlighting* - Proper formatting
- [Links](https://freetools.com) - Easy linking

### Code Example
\`\`\`javascript
const greeting = "Hello, World!";
console.log(greeting);
\`\`\`

### List Example
1. First item
2. Second item
3. Third item

### Table Example
| Feature | Status |
|---------|--------|
| Editor  | ✅ Done |
| Preview | ✅ Done |

> "Markdown is a lightweight markup language."

---

**Start typing to see the magic happen!** 🚀
`);

    const [showPreview, setShowPreview] = useState(true);
    const [copied, setCopied] = useState(false);

    const parseMarkdown = useCallback((text) => {
        let html = text;

        // Escape HTML
        html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

        // Code blocks (must be before other processing)
        html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (match, lang, code) => {
            return `<pre class="bg-surface-800 dark:bg-surface-900 p-4 rounded-lg overflow-x-auto my-4"><code class="language-${lang || 'text'}">${code.trim()}</code></pre>`;
        });

        // Inline code
        html = html.replace(/`([^`]+)`/g, '<code class="bg-surface-200 dark:bg-surface-700 px-2 py-0.5 rounded text-sm font-mono">$1</code>');

        // Headers
        html = html.replace(/^### (.*$)/gm, '<h3 class="text-xl font-bold mt-6 mb-3 text-surface-900 dark:text-white">$1</h3>');
        html = html.replace(/^## (.*$)/gm, '<h2 class="text-2xl font-bold mt-8 mb-4 text-surface-900 dark:text-white">$1</h2>');
        html = html.replace(/^# (.*$)/gm, '<h1 class="text-3xl font-bold mt-8 mb-4 text-surface-900 dark:text-white">$1</h1>');

        // Bold
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold">$1</strong>');

        // Italic
        html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

        // Strikethrough
        html = html.replace(/~~(.*?)~~/g, '<del class="line-through">$1</del>');

        // Links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-accent-600 hover:underline" target="_blank" rel="noopener">$1</a>');

        // Images
        html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-4" />');

        // Blockquotes
        html = html.replace(/^&gt; (.*$)/gm, '<blockquote class="border-l-4 border-accent-500 pl-4 my-4 italic text-surface-600 dark:text-surface-400">$1</blockquote>');

        // Horizontal rule
        html = html.replace(/^---$/gm, '<hr class="my-8 border-surface-300 dark:border-surface-700" />');

        // Unordered lists
        html = html.replace(/^[-*] (.*$)/gm, '<li class="ml-4 list-disc">$1</li>');
        html = html.replace(/(<li.*<\/li>\n?)+/g, '<ul class="my-4 space-y-1">$&</ul>');

        // Ordered lists
        html = html.replace(/^\d+\. (.*$)/gm, '<li class="ml-4 list-decimal">$1</li>');

        // Tables
        html = html.replace(/\|(.+)\|/g, (match, content) => {
            const cells = content.split('|').map(cell => cell.trim());
            if (cells.every(cell => /^[-:]+$/.test(cell))) {
                return ''; // Skip separator row
            }
            const isHeader = cells.every(cell => !/^[-:]+$/.test(cell));
            const cellTag = isHeader ? 'th' : 'td';
            const cellClass = isHeader 
                ? 'class="px-4 py-2 text-left font-semibold border-b border-surface-300 dark:border-surface-600"'
                : 'class="px-4 py-2 border-b border-surface-200 dark:border-surface-700"';
            return `<tr>${cells.map(cell => `<${cellTag} ${cellClass}>${cell}</${cellTag}>`).join('')}</tr>`;
        });
        html = html.replace(/(<tr.*<\/tr>\n?)+/g, '<table class="w-full my-4 border-collapse">$&</table>');

        // Paragraphs (simple approach - wrap remaining lines)
        html = html.split('\n\n').map(para => {
            if (para.trim() && !para.startsWith('<')) {
                return `<p class="my-4 leading-relaxed">${para.replace(/\n/g, '<br />')}</p>`;
            }
            return para;
        }).join('\n');

        return html;
    }, []);

    const html = useMemo(() => parseMarkdown(markdown), [markdown, parseMarkdown]);

    const copyHtml = () => {
        navigator.clipboard.writeText(html);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const copyMarkdown = () => {
        navigator.clipboard.writeText(markdown);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const clear = () => {
        setMarkdown('');
    };

    const insertSyntax = (before, after = '') => {
        const textarea = document.getElementById('md-textarea');
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const selected = markdown.substring(start, end);
        const newMarkdown = markdown.substring(0, start) + before + selected + after + markdown.substring(end);
        setMarkdown(newMarkdown);
        setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + before.length, start + before.length + selected.length);
        }, 0);
    };

    return (
        <ToolLayout toolSlug="markdown-editor">
            <div className="space-y-4">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center gap-2 p-3 bg-surface-50 dark:bg-surface-800 rounded-xl">
                    <button onClick={() => insertSyntax('# ')} className="btn-secondary text-sm px-3 py-1" title="Heading 1">H1</button>
                    <button onClick={() => insertSyntax('## ')} className="btn-secondary text-sm px-3 py-1" title="Heading 2">H2</button>
                    <button onClick={() => insertSyntax('### ')} className="btn-secondary text-sm px-3 py-1" title="Heading 3">H3</button>
                    <div className="w-px h-6 bg-surface-300 dark:bg-surface-600 mx-2"></div>
                    <button onClick={() => insertSyntax('**', '**')} className="btn-secondary text-sm px-3 py-1" title="Bold">B</button>
                    <button onClick={() => insertSyntax('*', '*')} className="btn-secondary text-sm px-3 py-1" title="Italic">I</button>
                    <button onClick={() => insertSyntax('~~', '~~')} className="btn-secondary text-sm px-3 py-1" title="Strikethrough">S</button>
                    <div className="w-px h-6 bg-surface-300 dark:bg-surface-600 mx-2"></div>
                    <button onClick={() => insertSyntax('[', '](url)')} className="btn-secondary text-sm px-3 py-1" title="Link">🔗</button>
                    <button onClick={() => insertSyntax('![', '](url)')} className="btn-secondary text-sm px-3 py-1" title="Image">🖼️</button>
                    <button onClick={() => insertSyntax('> ')} className="btn-secondary text-sm px-3 py-1" title="Quote">❝</button>
                    <div className="w-px h-6 bg-surface-300 dark:bg-surface-600 mx-2"></div>
                    <button onClick={() => insertSyntax('`', '`')} className="btn-secondary text-sm px-3 py-1" title="Code">{'<>'}</button>
                    <button onClick={() => insertSyntax('```\n', '\n```')} className="btn-secondary text-sm px-3 py-1" title="Code Block">{'{ }'}</button>
                    <div className="w-px h-6 bg-surface-300 dark:bg-surface-600 mx-2"></div>
                    <button onClick={() => insertSyntax('- ')} className="btn-secondary text-sm px-3 py-1" title="List">•</button>
                    <button onClick={() => insertSyntax('1. ')} className="btn-secondary text-sm px-3 py-1" title="Numbered List">1.</button>
                    <button onClick={() => insertSyntax('| ', ' | | |\n|---|---|---|\n| | | |')} className="btn-secondary text-sm px-3 py-1" title="Table">▦</button>
                    <div className="flex-1"></div>
                    <button onClick={() => setShowPreview(!showPreview)} className="btn-secondary text-sm px-3 py-1">
                        {showPreview ? '📝 Edit Only' : '👁️ Preview'}
                    </button>
                </div>

                {/* Editor + Preview */}
                <div className={`grid gap-4 ${showPreview ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1'}`}>
                    {/* Editor */}
                    <div>
                        <div className="flex items-center justify-between mb-2">
                            <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Markdown</label>
                            <div className="flex gap-2">
                                <button onClick={copyMarkdown} className="text-xs btn-secondary px-3 py-1">{copied ? '✅' : '📋'}</button>
                                <button onClick={clear} className="text-xs btn-secondary px-3 py-1">🗑️ Clear</button>
                            </div>
                        </div>
                        <textarea
                            id="md-textarea"
                            value={markdown}
                            onChange={(e) => setMarkdown(e.target.value)}
                            className="input-field font-mono text-sm h-96 lg:h-[600px] resize-y"
                            placeholder="Type your markdown here..."
                        />
                    </div>

                    {/* Preview */}
                    {showPreview && (
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="text-sm font-medium text-surface-700 dark:text-surface-300">Preview</label>
                                <button onClick={copyHtml} className="text-xs btn-secondary px-3 py-1">
                                    {copied ? '✅ Copied HTML!' : '📋 Copy HTML'}
                                </button>
                            </div>
                            <div
                                className="p-6 bg-white dark:bg-surface-900 border border-surface-200 dark:border-surface-700 rounded-xl h-96 lg:h-[600px] overflow-y-auto prose dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: html }}
                            />
                        </div>
                    )}
                </div>

                {/* Quick Reference */}
                <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                    <h3 className="font-semibold text-surface-900 dark:text-white mb-3">📖 Markdown Quick Reference</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div className="flex items-center gap-2">
                            <code className="bg-surface-200 dark:bg-surface-700 px-2 py-1 rounded"># Heading</code>
                            <span className="text-surface-500">H1</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <code className="bg-surface-200 dark:bg-surface-700 px-2 py-1 rounded">**bold**</code>
                            <span className="text-surface-500">Bold</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <code className="bg-surface-200 dark:bg-surface-700 px-2 py-1 rounded">*italic*</code>
                            <span className="text-surface-500">Italic</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <code className="bg-surface-200 dark:bg-surface-700 px-2 py-1 rounded">[text](url)</code>
                            <span className="text-surface-500">Link</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <code className="bg-surface-200 dark:bg-surface-700 px-2 py-1 rounded">`code`</code>
                            <span className="text-surface-500">Inline</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <code className="bg-surface-200 dark:bg-surface-700 px-2 py-1 rounded">- item</code>
                            <span className="text-surface-500">List</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <code className="bg-surface-200 dark:bg-surface-700 px-2 py-1 rounded">&gt; quote</code>
                            <span className="text-surface-500">Quote</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <code className="bg-surface-200 dark:bg-surface-700 px-2 py-1 rounded">---</code>
                            <span className="text-surface-500">Line</span>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
