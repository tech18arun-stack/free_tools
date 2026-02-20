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

// Audio Tools
const AudioConverter = lazy(() => import('../features/audio-tools/AudioConverter'));
const AudioCompressor = lazy(() => import('../features/audio-tools/AudioCompressor'));
const AudioJoiner = lazy(() => import('../features/audio-tools/AudioJoiner'));
const AudioCutter = lazy(() => import('../features/audio-tools/AudioCutter'));
const VolumeBooster = lazy(() => import('../features/audio-tools/VolumeBooster'));
const AudioSpeedChanger = lazy(() => import('../features/audio-tools/AudioSpeedChanger'));
const VoiceRecorder = lazy(() => import('../features/audio-tools/VoiceRecorder'));
const AudioToText = lazy(() => import('../features/audio-tools/AudioToText'));

// Video Tools
const VideoConverter = lazy(() => import('../features/video-tools/VideoConverter'));
const VideoCompressor = lazy(() => import('../features/video-tools/VideoCompressor'));
const VideoCutter = lazy(() => import('../features/video-tools/VideoCutter'));
const VideoJoiner = lazy(() => import('../features/video-tools/VideoJoiner'));
const VideoToGif = lazy(() => import('../features/video-tools/VideoToGif'));
const VideoResizer = lazy(() => import('../features/video-tools/VideoResizer'));
const VideoRotator = lazy(() => import('../features/video-tools/VideoRotator'));
const VideoThumbnailExtractor = lazy(() => import('../features/video-tools/VideoThumbnailExtractor'));
const ScreenRecorder = lazy(() => import('../features/video-tools/ScreenRecorder'));

// Design Tools
const ColorPaletteGenerator = lazy(() => import('../features/design-tools/ColorPaletteGenerator'));
const GradientGenerator = lazy(() => import('../features/design-tools/GradientGenerator'));
const FontPairing = lazy(() => import('../features/design-tools/FontPairing'));
const MockupGenerator = lazy(() => import('../features/design-tools/MockupGenerator'));
const BackgroundRemover = lazy(() => import('../features/design-tools/BackgroundRemover'));
const SvgOptimizer = lazy(() => import('../features/design-tools/SvgOptimizer'));
const FaviconGenerator = lazy(() => import('../features/design-tools/FaviconGenerator'));
const SocialMediaImageResizer = lazy(() => import('../features/design-tools/SocialMediaImageResizer'));

// Finance Tools
const LoanCalculator = lazy(() => import('../features/finance-tools/LoanCalculator'));
const CurrencyConverter = lazy(() => import('../features/finance-tools/CurrencyConverter'));
const TipCalculator = lazy(() => import('../features/finance-tools/TipCalculator'));
const BudgetPlanner = lazy(() => import('../features/finance-tools/BudgetPlanner'));
const SavingsCalculator = lazy(() => import('../features/finance-tools/SavingsCalculator'));
const RetirementCalculator = lazy(() => import('../features/finance-tools/RetirementCalculator'));
const GstCalculator = lazy(() => import('../features/finance-tools/GstCalculator'));
const DiscountCalculator = lazy(() => import('../features/finance-tools/DiscountCalculator'));

// Health Tools
const BmiCalculator = lazy(() => import('../features/health-tools/BmiCalculator'));
const CalorieCalculator = lazy(() => import('../features/health-tools/CalorieCalculator'));
const WaterIntakeCalculator = lazy(() => import('../features/health-tools/WaterIntakeCalculator'));
const HeartRateCalculator = lazy(() => import('../features/health-tools/HeartRateCalculator'));
const SleepCalculator = lazy(() => import('../features/health-tools/SleepCalculator'));
const PregnancyDueDateCalculator = lazy(() => import('../features/health-tools/PregnancyDueDateCalculator'));
const BodyFatCalculator = lazy(() => import('../features/health-tools/BodyFatCalculator'));
const RunningPaceCalculator = lazy(() => import('../features/health-tools/RunningPaceCalculator'));

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

            // Audio Tools
            { path: 'tools/audio-converter', element: <Wrap><AudioConverter /></Wrap> },
            { path: 'tools/audio-compressor', element: <Wrap><AudioCompressor /></Wrap> },
            { path: 'tools/audio-joiner', element: <Wrap><AudioJoiner /></Wrap> },
            { path: 'tools/audio-cutter', element: <Wrap><AudioCutter /></Wrap> },
            { path: 'tools/volume-booster', element: <Wrap><VolumeBooster /></Wrap> },
            { path: 'tools/audio-speed-changer', element: <Wrap><AudioSpeedChanger /></Wrap> },
            { path: 'tools/voice-recorder', element: <Wrap><VoiceRecorder /></Wrap> },
            { path: 'tools/audio-to-text', element: <Wrap><AudioToText /></Wrap> },

            // Video Tools
            { path: 'tools/video-converter', element: <Wrap><VideoConverter /></Wrap> },
            { path: 'tools/video-compressor', element: <Wrap><VideoCompressor /></Wrap> },
            { path: 'tools/video-cutter', element: <Wrap><VideoCutter /></Wrap> },
            { path: 'tools/video-joiner', element: <Wrap><VideoJoiner /></Wrap> },
            { path: 'tools/video-to-gif', element: <Wrap><VideoToGif /></Wrap> },
            { path: 'tools/video-resizer', element: <Wrap><VideoResizer /></Wrap> },
            { path: 'tools/video-rotator', element: <Wrap><VideoRotator /></Wrap> },
            { path: 'tools/video-thumbnail-extractor', element: <Wrap><VideoThumbnailExtractor /></Wrap> },
            { path: 'tools/screen-recorder', element: <Wrap><ScreenRecorder /></Wrap> },

            // Design Tools
            { path: 'tools/color-palette-generator', element: <Wrap><ColorPaletteGenerator /></Wrap> },
            { path: 'tools/gradient-generator', element: <Wrap><GradientGenerator /></Wrap> },
            { path: 'tools/font-pairing', element: <Wrap><FontPairing /></Wrap> },
            { path: 'tools/mockup-generator', element: <Wrap><MockupGenerator /></Wrap> },
            { path: 'tools/image-background-remover', element: <Wrap><BackgroundRemover /></Wrap> },
            { path: 'tools/svg-optimizer', element: <Wrap><SvgOptimizer /></Wrap> },
            { path: 'tools/favicon-generator', element: <Wrap><FaviconGenerator /></Wrap> },
            { path: 'tools/social-media-image-resizer', element: <Wrap><SocialMediaImageResizer /></Wrap> },

            // Finance Tools
            { path: 'tools/loan-calculator', element: <Wrap><LoanCalculator /></Wrap> },
            { path: 'tools/currency-converter', element: <Wrap><CurrencyConverter /></Wrap> },
            { path: 'tools/tip-calculator', element: <Wrap><TipCalculator /></Wrap> },
            { path: 'tools/budget-planner', element: <Wrap><BudgetPlanner /></Wrap> },
            { path: 'tools/savings-calculator', element: <Wrap><SavingsCalculator /></Wrap> },
            { path: 'tools/retirement-calculator', element: <Wrap><RetirementCalculator /></Wrap> },
            { path: 'tools/gst-calculator', element: <Wrap><GstCalculator /></Wrap> },
            { path: 'tools/discount-calculator', element: <Wrap><DiscountCalculator /></Wrap> },

            // Health Tools
            { path: 'tools/bmi-calculator', element: <Wrap><BmiCalculator /></Wrap> },
            { path: 'tools/calorie-calculator', element: <Wrap><CalorieCalculator /></Wrap> },
            { path: 'tools/water-intake-calculator', element: <Wrap><WaterIntakeCalculator /></Wrap> },
            { path: 'tools/heart-rate-calculator', element: <Wrap><HeartRateCalculator /></Wrap> },
            { path: 'tools/sleep-calculator', element: <Wrap><SleepCalculator /></Wrap> },
            { path: 'tools/pregnancy-due-date-calculator', element: <Wrap><PregnancyDueDateCalculator /></Wrap> },
            { path: 'tools/body-fat-calculator', element: <Wrap><BodyFatCalculator /></Wrap> },
            { path: 'tools/running-pace-calculator', element: <Wrap><RunningPaceCalculator /></Wrap> },

            { path: '*', element: <Wrap><NotFoundPage /></Wrap> },
        ],
    },
]);

export default function AppRouter() {
    return <RouterProvider router={router} />;
}
