import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from '../core/layouts/MainLayout';
import { Loader } from '../core/components/Loader';

// Pages
const HomePage = lazy(() => import('../pages/HomePage'));
const CategoryPage = lazy(() => import('../pages/CategoryPage'));
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'));

// Image Tools
const ImageCompressor = lazy(() => import('../features/image-tools/ImageCompressor'));
const ImageResizer = lazy(() => import('../features/image-tools/ImageResizer'));
const JpgToPng = lazy(() => import('../features/image-tools/JpgToPng'));
const PngToJpg = lazy(() => import('../features/image-tools/PngToJpg'));
const ImageCrop = lazy(() => import('../features/image-tools/ImageCrop'));
const ImageToBase64 = lazy(() => import('../features/image-tools/ImageToBase64'));
const ScreenshotTool = lazy(() => import('../features/image-tools/ScreenshotTool'));
const ImageFormatConverter = lazy(() => import('../features/image-tools/ImageFormatConverter'));
const ImageFilterEditor = lazy(() => import('../features/image-tools/ImageFilterEditor'));
const ImageWatermark = lazy(() => import('../features/image-tools/ImageWatermark'));
const AvifToJpgConverter = lazy(() => import('../features/image-tools/AvifToJpgConverter'));

// PDF Tools
const MergePdf = lazy(() => import('../features/pdf-tools/MergePdf'));
const SplitPdf = lazy(() => import('../features/pdf-tools/SplitPdf'));
const CompressPdf = lazy(() => import('../features/pdf-tools/CompressPdf'));
const PdfToImage = lazy(() => import('../features/pdf-tools/PdfToImage'));
const PdfPageExtractor = lazy(() => import('../features/pdf-tools/PdfPageExtractor'));
const PdfPreview = lazy(() => import('../features/pdf-tools/PdfPreview'));
const PdfToWord = lazy(() => import('../features/pdf-tools/PdfToWord'));
const WordToPdf = lazy(() => import('../features/pdf-tools/WordToPdf'));
const PdfToExcel = lazy(() => import('../features/pdf-tools/PdfToExcel'));
const RotatePdf = lazy(() => import('../features/pdf-tools/RotatePdf'));
const AddPageNumbersToPdf = lazy(() => import('../features/pdf-tools/AddPageNumbersToPdf'));
const CompressPdfPages = lazy(() => import('../features/pdf-tools/CompressPdfPages'));

// Developer Tools
const JsonFormatter = lazy(() => import('../features/developer-tools/JsonFormatter'));
const Base64EncoderDecoder = lazy(() => import('../features/developer-tools/Base64EncoderDecoder'));
const JwtDecoder = lazy(() => import('../features/developer-tools/JwtDecoder'));
const RegexTester = lazy(() => import('../features/developer-tools/RegexTester'));
const CodeBeautifier = lazy(() => import('../features/developer-tools/CodeBeautifier'));
const CssJsMinifier = lazy(() => import('../features/developer-tools/CssJsMinifier'));
const QrCodeGenerator = lazy(() => import('../features/developer-tools/QrCodeGenerator'));
const ColorPicker = lazy(() => import('../features/developer-tools/ColorPicker'));
const MarkdownEditor = lazy(() => import('../features/developer-tools/MarkdownEditor'));
const DiffChecker = lazy(() => import('../features/developer-tools/DiffChecker'));
const UnixTimestampConverter = lazy(() => import('../features/developer-tools/UnixTimestampConverter'));
const HtmlEntityEncoder = lazy(() => import('../features/developer-tools/HtmlEntityEncoder'));
const UserAgentParser = lazy(() => import('../features/developer-tools/UserAgentParser'));

// Text Tools
const WordCounter = lazy(() => import('../features/text-tools/WordCounter'));
const TextCaseConverter = lazy(() => import('../features/text-tools/TextCaseConverter'));
const SlugGenerator = lazy(() => import('../features/text-tools/SlugGenerator'));
const MetaTagGenerator = lazy(() => import('../features/text-tools/MetaTagGenerator'));
const UrlEncoderDecoder = lazy(() => import('../features/text-tools/UrlEncoderDecoder'));
const LoremIpsumGenerator = lazy(() => import('../features/text-tools/LoremIpsumGenerator'));

// Student / Calculator Tools
const PercentageCalculator = lazy(() => import('../features/calculator-tools/PercentageCalculator'));
const CgpaCalculator = lazy(() => import('../features/calculator-tools/CgpaCalculator'));
const AgeCalculator = lazy(() => import('../features/calculator-tools/AgeCalculator'));
const UnitConverter = lazy(() => import('../features/calculator-tools/UnitConverter'));
const GpaCalculator = lazy(() => import('../features/calculator-tools/GpaCalculator'));
const PasswordGenerator = lazy(() => import('../features/calculator-tools/PasswordGenerator'));
const AspectRatioCalculator = lazy(() => import('../features/calculator-tools/AspectRatioCalculator'));

const Wrap = ({ children }) => <Suspense fallback={<Loader />}>{children}</Suspense>;

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            { index: true, element: <Wrap><HomePage /></Wrap> },
            { path: 'category/:slug', element: <Wrap><CategoryPage /></Wrap> },

            // Image Tools
            { path: 'tools/image-compressor', element: <Wrap><ImageCompressor /></Wrap> },
            { path: 'tools/image-resizer', element: <Wrap><ImageResizer /></Wrap> },
            { path: 'tools/jpg-to-png', element: <Wrap><JpgToPng /></Wrap> },
            { path: 'tools/png-to-jpg', element: <Wrap><PngToJpg /></Wrap> },
            { path: 'tools/image-crop', element: <Wrap><ImageCrop /></Wrap> },
            { path: 'tools/image-to-base64', element: <Wrap><ImageToBase64 /></Wrap> },
            { path: 'tools/screenshot-tool', element: <Wrap><ScreenshotTool /></Wrap> },
            { path: 'tools/image-format-converter', element: <Wrap><ImageFormatConverter /></Wrap> },
            { path: 'tools/image-filter-editor', element: <Wrap><ImageFilterEditor /></Wrap> },
            { path: 'tools/image-watermark', element: <Wrap><ImageWatermark /></Wrap> },
            { path: 'tools/avif-to-jpg-converter', element: <Wrap><AvifToJpgConverter /></Wrap> },

            // PDF Tools
            { path: 'tools/merge-pdf', element: <Wrap><MergePdf /></Wrap> },
            { path: 'tools/split-pdf', element: <Wrap><SplitPdf /></Wrap> },
            { path: 'tools/compress-pdf', element: <Wrap><CompressPdf /></Wrap> },
            { path: 'tools/pdf-to-image', element: <Wrap><PdfToImage /></Wrap> },
            { path: 'tools/pdf-page-extractor', element: <Wrap><PdfPageExtractor /></Wrap> },
            { path: 'tools/pdf-preview', element: <Wrap><PdfPreview /></Wrap> },
            { path: 'tools/pdf-to-word', element: <Wrap><PdfToWord /></Wrap> },
            { path: 'tools/word-to-pdf', element: <Wrap><WordToPdf /></Wrap> },
            { path: 'tools/pdf-to-excel', element: <Wrap><PdfToExcel /></Wrap> },
            { path: 'tools/rotate-pdf', element: <Wrap><RotatePdf /></Wrap> },
            { path: 'tools/add-page-numbers-to-pdf', element: <Wrap><AddPageNumbersToPdf /></Wrap> },
            { path: 'tools/compress-pdf-pages', element: <Wrap><CompressPdfPages /></Wrap> },

            // Developer Tools
            { path: 'tools/json-formatter', element: <Wrap><JsonFormatter /></Wrap> },
            { path: 'tools/base64-encoder-decoder', element: <Wrap><Base64EncoderDecoder /></Wrap> },
            { path: 'tools/jwt-decoder', element: <Wrap><JwtDecoder /></Wrap> },
            { path: 'tools/regex-tester', element: <Wrap><RegexTester /></Wrap> },
            { path: 'tools/code-beautifier', element: <Wrap><CodeBeautifier /></Wrap> },
            { path: 'tools/css-js-minifier', element: <Wrap><CssJsMinifier /></Wrap> },
            { path: 'tools/qr-code-generator', element: <Wrap><QrCodeGenerator /></Wrap> },
            { path: 'tools/color-picker', element: <Wrap><ColorPicker /></Wrap> },
            { path: 'tools/markdown-editor', element: <Wrap><MarkdownEditor /></Wrap> },
            { path: 'tools/diff-checker', element: <Wrap><DiffChecker /></Wrap> },
            { path: 'tools/unix-timestamp-converter', element: <Wrap><UnixTimestampConverter /></Wrap> },
            { path: 'tools/html-entity-encoder', element: <Wrap><HtmlEntityEncoder /></Wrap> },
            { path: 'tools/user-agent-parser', element: <Wrap><UserAgentParser /></Wrap> },

            // Text Tools
            { path: 'tools/word-counter', element: <Wrap><WordCounter /></Wrap> },
            { path: 'tools/text-case-converter', element: <Wrap><TextCaseConverter /></Wrap> },
            { path: 'tools/slug-generator', element: <Wrap><SlugGenerator /></Wrap> },
            { path: 'tools/meta-tag-generator', element: <Wrap><MetaTagGenerator /></Wrap> },
            { path: 'tools/url-encoder-decoder', element: <Wrap><UrlEncoderDecoder /></Wrap> },
            { path: 'tools/lorem-ipsum-generator', element: <Wrap><LoremIpsumGenerator /></Wrap> },

            // Student / Calculator Tools
            { path: 'tools/percentage-calculator', element: <Wrap><PercentageCalculator /></Wrap> },
            { path: 'tools/cgpa-calculator', element: <Wrap><CgpaCalculator /></Wrap> },
            { path: 'tools/age-calculator', element: <Wrap><AgeCalculator /></Wrap> },
            { path: 'tools/unit-converter', element: <Wrap><UnitConverter /></Wrap> },
            { path: 'tools/gpa-calculator', element: <Wrap><GpaCalculator /></Wrap> },
            { path: 'tools/password-generator', element: <Wrap><PasswordGenerator /></Wrap> },
            { path: 'tools/aspect-ratio-calculator', element: <Wrap><AspectRatioCalculator /></Wrap> },

            { path: '*', element: <Wrap><NotFoundPage /></Wrap> },
        ],
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
