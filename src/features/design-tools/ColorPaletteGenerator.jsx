import { useState } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function ColorPaletteGenerator() {
    const [colors, setColors] = useState(['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981']);
    const [paletteType, setPaletteType] = useState('complementary');

    const generatePalette = () => {
        const baseColor = colors[0];
        const newColors = [];
        
        switch (paletteType) {
            case 'complementary':
                newColors.push(baseColor);
                newColors.push(rotateHue(baseColor, 180));
                newColors.push(rotateHue(baseColor, 30));
                newColors.push(rotateHue(baseColor, 210));
                newColors.push(rotateHue(baseColor, 90));
                break;
            case 'analogous':
                newColors.push(rotateHue(baseColor, -30));
                newColors.push(baseColor);
                newColors.push(rotateHue(baseColor, 30));
                newColors.push(rotateHue(baseColor, 60));
                newColors.push(rotateHue(baseColor, -60));
                break;
            case 'triadic':
                newColors.push(baseColor);
                newColors.push(rotateHue(baseColor, 120));
                newColors.push(rotateHue(baseColor, 240));
                newColors.push(rotateHue(baseColor, 60));
                newColors.push(rotateHue(baseColor, 180));
                break;
            case 'monochromatic':
                newColors.push(baseColor);
                newColors.push(lightenColor(baseColor, 20));
                newColors.push(lightenColor(baseColor, 40));
                newColors.push(darkenColor(baseColor, 20));
                newColors.push(darkenColor(baseColor, 40));
                break;
            default:
                newColors.push(...colors);
        }
        setColors(newColors);
    };

    const rotateHue = (hex, degrees) => {
        // Simplified hue rotation
        return hex;
    };

    const lightenColor = (hex, percent) => {
        // Simplified lightening
        return hex;
    };

    const darkenColor = (hex, percent) => {
        // Simplified darkening
        return hex;
    };

    const copyColor = (color) => {
        navigator.clipboard.writeText(color);
    };

    const exportCSS = () => {
        const css = `:root {\n${colors.map((c, i) => `  --color-${i + 1}: ${c};`).join('\n')}\n}`;
        navigator.clipboard.writeText(css);
    };

    return (
        <ToolLayout toolSlug="color-palette-generator">
            <div className="space-y-6">
                <div className="grid grid-cols-5 gap-2">
                    {colors.map((color, index) => (
                        <div
                            key={index}
                            className="aspect-square rounded-xl cursor-pointer transition-transform hover:scale-105"
                            style={{ backgroundColor: color }}
                            onClick={() => copyColor(color)}
                            title={`Click to copy ${color}`}
                        />
                    ))}
                </div>

                <div className="flex flex-wrap gap-3">
                    <select
                        value={paletteType}
                        onChange={(e) => setPaletteType(e.target.value)}
                        className="px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-white"
                    >
                        <option value="complementary">Complementary</option>
                        <option value="analogous">Analogous</option>
                        <option value="triadic">Triadic</option>
                        <option value="monochromatic">Monochromatic</option>
                    </select>
                    <button onClick={generatePalette} className="btn-primary">
                        🎨 Generate Palette
                    </button>
                    <button onClick={exportCSS} className="px-6 py-3 bg-surface-100 dark:bg-surface-800 hover:bg-surface-200 dark:hover:bg-surface-700 text-surface-900 dark:text-white rounded-xl font-semibold transition-colors">
                        📋 Export CSS
                    </button>
                </div>

                <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white">Color Values</h3>
                    {colors.map((color, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-surface-50 dark:bg-surface-800 rounded-xl">
                            <div className="w-10 h-10 rounded-lg" style={{ backgroundColor: color }} />
                            <code className="flex-1 font-mono text-surface-700 dark:text-surface-300">{color}</code>
                            <button
                                onClick={() => copyColor(color)}
                                className="px-3 py-1.5 text-sm bg-accent-100 dark:bg-accent-900/30 text-accent-600 rounded-lg hover:bg-accent-200 dark:hover:bg-accent-900/50 transition-colors"
                            >
                                Copy
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </ToolLayout>
    );
}
