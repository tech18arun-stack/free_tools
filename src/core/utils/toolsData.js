const toolsData = [
    // ===== IMAGE TOOLS =====
    { id: 'image-compressor', name: 'Image Compressor', slug: 'image-compressor', category: 'image-tools', categoryName: 'Image Tools', icon: '🖼️', description: 'Compress images without losing quality. Reduce file size for faster loading.', keywords: ['compress', 'reduce', 'optimize', 'image'] },
    { id: 'image-resizer', name: 'Image Resizer', slug: 'image-resizer', category: 'image-tools', categoryName: 'Image Tools', icon: '📐', description: 'Resize images to any dimension. Perfect for social media and web use.', keywords: ['resize', 'dimension', 'scale', 'image'] },
    { id: 'jpg-to-png', name: 'JPG to PNG Converter', slug: 'jpg-to-png', category: 'image-tools', categoryName: 'Image Tools', icon: '🔄', description: 'Convert JPG images to PNG format with transparency support.', keywords: ['jpg', 'png', 'convert', 'image'] },
    { id: 'png-to-jpg', name: 'PNG to JPG Converter', slug: 'png-to-jpg', category: 'image-tools', categoryName: 'Image Tools', icon: '🔄', description: 'Convert PNG images to JPG format for smaller file sizes.', keywords: ['png', 'jpg', 'convert', 'image'] },
    { id: 'image-crop', name: 'Image Crop Tool', slug: 'image-crop', category: 'image-tools', categoryName: 'Image Tools', icon: '✂️', description: 'Crop images to any size or aspect ratio with precision controls.', keywords: ['crop', 'cut', 'trim', 'image'] },
    { id: 'image-to-base64', name: 'Image to Base64', slug: 'image-to-base64', category: 'image-tools', categoryName: 'Image Tools', icon: '🔣', description: 'Convert images to Base64 encoded strings for embedding in code.', keywords: ['base64', 'encode', 'embed', 'image'] },

    // ===== PDF TOOLS =====
    { id: 'merge-pdf', name: 'Merge PDF', slug: 'merge-pdf', category: 'pdf-tools', categoryName: 'PDF Tools', icon: '📑', description: 'Combine multiple PDF files into a single document instantly.', keywords: ['merge', 'combine', 'join', 'pdf'] },
    { id: 'split-pdf', name: 'Split PDF', slug: 'split-pdf', category: 'pdf-tools', categoryName: 'PDF Tools', icon: '✂️', description: 'Split a PDF file into multiple separate documents by page range.', keywords: ['split', 'separate', 'divide', 'pdf'] },
    { id: 'compress-pdf', name: 'Compress PDF', slug: 'compress-pdf', category: 'pdf-tools', categoryName: 'PDF Tools', icon: '📦', description: 'Reduce PDF file size while maintaining quality for easy sharing.', keywords: ['compress', 'reduce', 'shrink', 'pdf'] },
    { id: 'pdf-to-image', name: 'PDF to Image', slug: 'pdf-to-image', category: 'pdf-tools', categoryName: 'PDF Tools', icon: '🖼️', description: 'Convert PDF pages to high-quality PNG or JPG images.', keywords: ['pdf', 'image', 'convert', 'png', 'jpg'] },
    { id: 'pdf-page-extractor', name: 'PDF Page Extractor', slug: 'pdf-page-extractor', category: 'pdf-tools', categoryName: 'PDF Tools', icon: '📄', description: 'Extract specific pages from a PDF document.', keywords: ['extract', 'page', 'remove', 'pdf'] },
    { id: 'pdf-preview', name: 'PDF Preview', slug: 'pdf-preview', category: 'pdf-tools', categoryName: 'PDF Tools', icon: '👁️', description: 'Preview PDF files directly in your browser without downloading.', keywords: ['preview', 'view', 'read', 'pdf'] },

    // ===== DEVELOPER TOOLS =====
    { id: 'json-formatter', name: 'JSON Formatter', slug: 'json-formatter', category: 'developer-tools', categoryName: 'Developer Tools', icon: '{ }', description: 'Format, validate, and beautify JSON data with syntax highlighting.', keywords: ['json', 'format', 'validate', 'beautify'] },
    { id: 'base64-encoder-decoder', name: 'Base64 Encoder/Decoder', slug: 'base64-encoder-decoder', category: 'developer-tools', categoryName: 'Developer Tools', icon: '🔐', description: 'Encode text to Base64 or decode Base64 strings instantly.', keywords: ['base64', 'encode', 'decode', 'convert'] },
    { id: 'jwt-decoder', name: 'JWT Decoder', slug: 'jwt-decoder', category: 'developer-tools', categoryName: 'Developer Tools', icon: '🔑', description: 'Decode and inspect JSON Web Tokens (JWT) header and payload.', keywords: ['jwt', 'token', 'decode', 'json'] },
    { id: 'regex-tester', name: 'Regex Tester', slug: 'regex-tester', category: 'developer-tools', categoryName: 'Developer Tools', icon: '🔍', description: 'Test and debug regular expressions with real-time matching.', keywords: ['regex', 'regular expression', 'test', 'match'] },
    { id: 'code-beautifier', name: 'Code Beautifier', slug: 'code-beautifier', category: 'developer-tools', categoryName: 'Developer Tools', icon: '✨', description: 'Beautify and format HTML, CSS, and JavaScript code instantly.', keywords: ['beautify', 'format', 'html', 'css', 'javascript'] },
    { id: 'css-js-minifier', name: 'CSS & JS Minifier', slug: 'css-js-minifier', category: 'developer-tools', categoryName: 'Developer Tools', icon: '🗜️', description: 'Minify CSS and JavaScript code to reduce file size.', keywords: ['minify', 'compress', 'css', 'javascript'] },

    // ===== TEXT TOOLS =====
    { id: 'word-counter', name: 'Word Counter', slug: 'word-counter', category: 'text-tools', categoryName: 'Text Tools', icon: '📝', description: 'Count words, characters, sentences, and paragraphs in your text.', keywords: ['word', 'count', 'character', 'text'] },
    { id: 'text-case-converter', name: 'Text Case Converter', slug: 'text-case-converter', category: 'text-tools', categoryName: 'Text Tools', icon: 'Aa', description: 'Convert text between uppercase, lowercase, title case, and more.', keywords: ['case', 'convert', 'uppercase', 'lowercase'] },
    { id: 'slug-generator', name: 'Slug Generator', slug: 'slug-generator', category: 'text-tools', categoryName: 'Text Tools', icon: '🔗', description: 'Generate URL-friendly slugs from any text for SEO-friendly URLs.', keywords: ['slug', 'url', 'seo', 'generate'] },
    { id: 'meta-tag-generator', name: 'Meta Tag Generator', slug: 'meta-tag-generator', category: 'text-tools', categoryName: 'Text Tools', icon: '🏷️', description: 'Generate HTML meta tags for SEO optimization of your website.', keywords: ['meta', 'tag', 'seo', 'html'] },
    { id: 'url-encoder-decoder', name: 'URL Encoder/Decoder', slug: 'url-encoder-decoder', category: 'text-tools', categoryName: 'Text Tools', icon: '🌐', description: 'Encode or decode URLs and query parameters instantly.', keywords: ['url', 'encode', 'decode', 'query'] },
    { id: 'lorem-ipsum-generator', name: 'Lorem Ipsum Generator', slug: 'lorem-ipsum-generator', category: 'text-tools', categoryName: 'Text Tools', icon: '📜', description: 'Generate placeholder Lorem Ipsum text for design and development.', keywords: ['lorem', 'ipsum', 'placeholder', 'text'] },

    // ===== STUDENT TOOLS =====
    { id: 'percentage-calculator', name: 'Percentage Calculator', slug: 'percentage-calculator', category: 'calculator-tools', categoryName: 'Student Tools', icon: '📊', description: 'Calculate percentages, percentage change, and more with ease.', keywords: ['percentage', 'calculate', 'math', 'percent'] },
    { id: 'cgpa-calculator', name: 'CGPA Calculator', slug: 'cgpa-calculator', category: 'calculator-tools', categoryName: 'Student Tools', icon: '🎓', description: 'Calculate your Cumulative Grade Point Average (CGPA) quickly.', keywords: ['cgpa', 'grade', 'gpa', 'calculate'] },
    { id: 'age-calculator', name: 'Age Calculator', slug: 'age-calculator', category: 'calculator-tools', categoryName: 'Student Tools', icon: '🎂', description: 'Calculate your exact age in years, months, and days from your birthdate.', keywords: ['age', 'birthday', 'calculate', 'date'] },
    { id: 'unit-converter', name: 'Unit Converter', slug: 'unit-converter', category: 'calculator-tools', categoryName: 'Student Tools', icon: '⚖️', description: 'Convert between units of length, weight, temperature, and more.', keywords: ['unit', 'convert', 'length', 'weight'] },
    { id: 'gpa-calculator', name: 'GPA Calculator', slug: 'gpa-calculator', category: 'calculator-tools', categoryName: 'Student Tools', icon: '📈', description: 'Calculate your Grade Point Average (GPA) with customizable grading scales.', keywords: ['gpa', 'grade', 'point', 'calculate'] },
    { id: 'password-generator', name: 'Password Generator', slug: 'password-generator', category: 'calculator-tools', categoryName: 'Student Tools', icon: '🔒', description: 'Generate strong, secure passwords with customizable options.', keywords: ['password', 'generate', 'secure', 'random'] },
];

export const categories = [
    { id: 'image-tools', name: 'Image Tools', slug: 'image-tools', icon: '🖼️', color: 'bg-pink-100 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400', description: 'Powerful image editing tools — compress, resize, convert, and crop images online for free.' },
    { id: 'pdf-tools', name: 'PDF Tools', slug: 'pdf-tools', icon: '📄', color: 'bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400', description: 'Complete PDF toolkit — merge, split, compress, and convert PDF files online.' },
    { id: 'developer-tools', name: 'Developer Tools', slug: 'developer-tools', icon: '💻', color: 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400', description: 'Essential developer utilities — format JSON, test regex, decode JWT, and beautify code.' },
    { id: 'text-tools', name: 'Text & SEO Tools', slug: 'text-tools', icon: '📝', color: 'bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400', description: 'Text processing and SEO tools — count words, generate slugs, create meta tags.' },
    { id: 'calculator-tools', name: 'Student Tools', slug: 'calculator-tools', icon: '🎓', color: 'bg-violet-100 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400', description: 'Student calculators and utilities — CGPA, GPA, age calculator, unit converter, and more.' },
];

export const getToolsByCategory = (categorySlug) => toolsData.filter(t => t.category === categorySlug);
export const getToolBySlug = (slug) => toolsData.find(t => t.slug === slug);
export const getCategoryBySlug = (slug) => categories.find(c => c.slug === slug);
export const searchTools = (query) => {
    const q = query.toLowerCase();
    return toolsData.filter(t =>
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.keywords.some(k => k.includes(q))
    );
};
export const getRelatedTools = (toolSlug, limit = 4) => {
    const tool = getToolBySlug(toolSlug);
    if (!tool) return [];
    return toolsData.filter(t => t.category === tool.category && t.slug !== toolSlug).slice(0, limit);
};
export const popularTools = ['json-formatter', 'image-compressor', 'word-counter', 'merge-pdf', 'password-generator', 'age-calculator', 'base64-encoder-decoder', 'percentage-calculator'];

export default toolsData;
