# FreeTools ⚡️

A modern, high-performance web application providing 30+ free online utilities for developers, designers, students, and everyday users. Built with React, Vite, and Tailwind CSS.

![FreeTools Screenshot](./public/vite.svg) <!-- Replace with actual screenshot path if available -->

## 🚀 Features

FreeTools offers a clean, client-side, privacy-focused experience. All tools run directly in the browser—no data is uploaded to any server.

### 🖼️ Image Tools (6)
*   **Image Compressor:** Reduce file size without losing quality.
*   **Image Resizer:** Resize images by precise pixel dimensions.
*   **JPG to PNG:** Convert images with transparency support.
*   **PNG to JPG:** Convert to JPG with white background fill.
*   **Image Crop:** Crop images with X/Y offsets and custom dimensions.
*   **Image to Base64:** Convert images to data URIs for embedding.

### 📄 PDF Tools (6)
*   **Merge PDF:** Combine multiple PDFs into one document.
*   **Split PDF:** Extract specific page ranges from a PDF.
*   **Compress PDF:** Reduce PDF file sizes for easier sharing.
*   **PDF to Image:** Render PDF pages as high-quality images.
*   **PDF Page Extractor:** Pull individual pages from a document.
*   **PDF Preview:** View PDFs securely in the browser.

### 💻 Developer Tools (6)
*   **JSON Formatter & Validator:** Pretty-print and validate JSON strings.
*   **Base64 Encoder/Decoder:** Instantly encode or decode text.
*   **JWT Decoder:** Parse JSON Web Tokens (header and payload).
*   **Regex Tester:** Test regular expressions against live text.
*   **Code Beautifier:** Format HTML, CSS, and JS code.
*   **CSS & JS Minifier:** Reduce code size for production.

### 📝 Text & SEO Tools (6)
*   **Word Counter:** Count words, characters, sentences, and paragraphs.
*   **Text Case Converter:** Switch between upper, lower, title case, etc.
*   **Slug Generator:** Create URL-friendly slugs from any string.
*   **Meta Tag Generator:** Generate HTML meta tags for SEO.
*   **URL Encoder/Decoder:** Safely encode/decode URLs and query params.
*   **Lorem Ipsum Generator:** Generate placeholder text for mockups.

### 🎓 Student Tools (6)
*   **Percentage Calculator:** Quickly calculate percentages and changes.
*   **CGPA Calculator:** Determine Cumulative Grade Point Average.
*   **GPA Calculator:** Calculate standard Grade Point Average.
*   **Age Calculator:** Calculate exact age in years, months, and days.
*   **Unit Converter:** Convert length, weight, and temperature metrics.
*   **Password Generator:** Create strong, secure, random passwords.

## 🛠️ Tech Stack

*   **Frontend Framework:** React 18+
*   **Build Tool:** Vite
*   **Styling:** Tailwind CSS (v3)
*   **Routing:** React Router DOM (v6)
*   **State Management:** Zustand
*   **Animations:** Framer Motion
*   **SEO:** React Helmet Async
*   **PDF Processing:** `pdf-lib`, `pdfjs-dist`
*   **Code Formatting:** `js-beautify`

## ⚙️ Architecture & Design

*   **Client-Side Processing:** Ensures absolute user privacy and zero server costs for file processing.
*   **Lazy Loading:** Tools are dynamically imported using React's `lazy` and `Suspense`, ensuring the initial bundle size remains tiny.
*   **Modern UI/UX:** A sleek, SaaS-inspired design system with dark/light mode, smooth transitions, and a mobile-first responsive approach.
*   **Advanced SEO:** Built-in dynamic meta tags, canonical URLs, `sitemap.xml`, `robots.txt`, and structured data (JSON-LD WebApplication/WebSite schemas).

## 📥 Local Installation

To run this project locally:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/tech18arun-stack/free_tools.git
    cd free_tools
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    # or
    npm install --legacy-peer-deps
    ```

3.  **Start the development server:**
    ```bash
    npm run dev
    ```

4.  **Open in browser:**
    Visit `http://localhost:5173`

## 🚀 Deployment (Netlify)

This project is fully configured for deployment on Netlify. It includes a `public/_redirects` file to handle React Router SPA routing.

1.  Push your code to a GitHub repository.
2.  Log into [Netlify](https://www.netlify.com/).
3.  Click **Add new site** > **Import an existing project**.
4.  Connect your GitHub account and select this repository.
5.  Netlify will auto-detect the Vite settings:
    *   **Build command:** `npm run build`
    *   **Publish directory:** `dist`
6.  Click **Deploy site**.

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

