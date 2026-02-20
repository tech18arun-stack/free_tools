import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function SocialMediaImageResizer() {
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState('');
    const [platform, setPlatform] = useState('instagram-square');
    const [result, setResult] = useState(null);

    const platforms = {
        'instagram-square': { name: 'Instagram Square', width: 1080, height: 1080 },
        'instagram-portrait': { name: 'Instagram Portrait', width: 1080, height: 1350 },
        'instagram-story': { name: 'Instagram Story', width: 1080, height: 1920 },
        'facebook-post': { name: 'Facebook Post', width: 1200, height: 630 },
        'facebook-cover': { name: 'Facebook Cover', width: 820, height: 312 },
        'twitter-post': { name: 'Twitter Post', width: 1200, height: 675 },
        'twitter-header': { name: 'Twitter Header', width: 1500, height: 500 },
        'linkedin-post': { name: 'LinkedIn Post', width: 1200, height: 627 },
        'pinterest': { name: 'Pinterest Pin', width: 1000, height: 1500 },
        'youtube-thumbnail': { name: 'YouTube Thumbnail', width: 1280, height: 720 },
    };

    const handleFile = (file) => {
        setImage(file);
        setResult(null);
        const url = URL.createObjectURL(file);
        setPreview(url);
    };

    const resize = () => {
        if (!image) return;
        setResult(platforms[platform]);
    };

    const download = () => {
        if (!result || !preview) return;
        const a = document.createElement('a');
        a.href = preview;
        a.download = `${platform}-${Date.now()}.png`;
        a.click();
    };

    return (
        <ToolLayout toolSlug="social-media-image-resizer">
            <div className="space-y-6">
                <FileUploader accept="image/*" onFilesSelected={handleFile} label="Upload your image" />

                {preview && (
                    <div className="space-y-4">
                        <img src={preview} alt="Preview" className="w-full rounded-xl max-h-80 object-contain" />

                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">Platform</label>
                            <select
                                value={platform}
                                onChange={(e) => setPlatform(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900"
                            >
                                {Object.entries(platforms).map(([key, platform]) => (
                                    <option key={key} value={key}>
                                        {platform.name} ({platform.width}x{platform.height})
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                            <div className="text-sm text-surface-600 dark:text-surface-400">
                                Target Size: <span className="font-semibold text-surface-900 dark:text-white">{platforms[platform].width} x {platforms[platform].height}px</span>
                            </div>
                        </div>

                        <button onClick={resize} className="btn-primary w-full">
                            📐 Resize for {platforms[platform].name}
                        </button>

                        {result && (
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                                <button onClick={download} className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-semibold transition-colors">
                                    📥 Download Resized Image
                                </button>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">Supported Platforms</h3>
                    <div className="grid grid-cols-2 gap-3">
                        {Object.entries(platforms).map(([key, platform]) => (
                            <div key={key} className="p-3 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <div className="font-medium text-surface-900 dark:text-white">{platform.name}</div>
                                <div className="text-sm text-surface-500">{platform.width}x{platform.height}px</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
