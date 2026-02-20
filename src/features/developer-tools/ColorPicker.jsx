import { useState, useCallback } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function ColorPicker() {
    const [color, setColor] = useState('#3B82F6');
    const [format, setFormat] = useState('hex');
    const [inputValue, setInputValue] = useState('#3B82F6');

    const parseColor = useCallback((value) => {
        value = value.trim();
        let hex, rgb, hsl;

        // Parse HEX
        if (value.startsWith('#')) {
            hex = value.toUpperCase();
            const r = parseInt(hex.slice(1, 3), 16);
            const g = parseInt(hex.slice(3, 5), 16);
            const b = parseInt(hex.slice(5, 7), 16);
            rgb = `rgb(${r}, ${g}, ${b})`;
            hsl = rgbToHsl(r, g, b);
        }
        // Parse RGB
        else if (value.startsWith('rgb')) {
            const match = value.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
            if (match) {
                const r = parseInt(match[1]);
                const g = parseInt(match[2]);
                const b = parseInt(match[3]);
                hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
                rgb = `rgb(${r}, ${g}, ${b})`;
                hsl = rgbToHsl(r, g, b);
            }
        }
        // Parse HSL
        else if (value.startsWith('hsl')) {
            const match = value.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
            if (match) {
                const h = parseInt(match[1]);
                const s = parseInt(match[2]);
                const l = parseInt(match[3]);
                const rgbResult = hslToRgb(h, s, l);
                const r = Math.round(rgbResult[0] * 255);
                const g = Math.round(rgbResult[1] * 255);
                const b = Math.round(rgbResult[2] * 255);
                hex = '#' + [r, g, b].map(x => x.toString(16).padStart(2, '0')).join('').toUpperCase();
                rgb = `rgb(${r}, ${g}, ${b})`;
                hsl = `hsl(${h}, ${s}%, ${l}%)`;
            }
        }

        return { hex, rgb, hsl };
    }, []);

    const rgbToHsl = (r, g, b) => {
        r /= 255; g /= 255; b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }
        return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
    };

    const hslToRgb = (h, s, l) => {
        h /= 360; s /= 100; l /= 100;
        let r, g, b;
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        return [r, g, b];
    };

    const handleColorChange = (newColor) => {
        setColor(newColor);
        setInputValue(newColor);
    };

    const handleInputChange = (value) => {
        setInputValue(value);
        const parsed = parseColor(value);
        if (parsed.hex) {
            setColor(parsed.hex);
        }
    };

    const copy = (text) => {
        navigator.clipboard.writeText(text);
    };

    const colors = [
        { name: 'Red', hex: '#EF4444' },
        { name: 'Orange', hex: '#F97316' },
        { name: 'Amber', hex: '#F59E0B' },
        { name: 'Yellow', hex: '#EAB308' },
        { name: 'Lime', hex: '#84CC16' },
        { name: 'Green', hex: '#22C55E' },
        { name: 'Emerald', hex: '#10B981' },
        { name: 'Teal', hex: '#14B8A6' },
        { name: 'Cyan', hex: '#06B6D4' },
        { name: 'Sky', hex: '#0EA5E9' },
        { name: 'Blue', hex: '#3B82F6' },
        { name: 'Indigo', hex: '#6366F1' },
        { name: 'Violet', hex: '#8B5CF6' },
        { name: 'Purple', hex: '#A855F7' },
        { name: 'Fuchsia', hex: '#D946EF' },
        { name: 'Pink', hex: '#EC4899' },
        { name: 'Rose', hex: '#F43F5E' },
        { name: 'Slate', hex: '#64748B' },
        { name: 'Gray', hex: '#6B7280' },
        { name: 'Zinc', hex: '#71717A' },
        { name: 'Neutral', hex: '#737373' },
        { name: 'Stone', hex: '#78716C' },
        { name: 'Black', hex: '#000000' },
        { name: 'White', hex: '#FFFFFF' },
    ];

    const parsed = parseColor(color);

    return (
        <ToolLayout toolSlug="color-picker">
            <div className="space-y-6">
                {/* Color Preview */}
                <div
                    className="w-full h-40 rounded-2xl shadow-lg transition-colors duration-200"
                    style={{ backgroundColor: color }}
                >
                    <div className="w-full h-full flex items-center justify-center">
                        <span className="text-white font-bold text-2xl drop-shadow-lg" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>
                            {color}
                        </span>
                    </div>
                </div>

                {/* Color Input */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            Pick a Color
                        </label>
                        <div className="flex gap-2">
                            <input
                                type="color"
                                value={color}
                                onChange={(e) => handleColorChange(e.target.value)}
                                className="w-16 h-12 rounded-lg cursor-pointer border border-surface-300 dark:border-surface-600"
                            />
                            <input
                                type="text"
                                value={inputValue}
                                onChange={(e) => handleInputChange(e.target.value)}
                                placeholder="#000000"
                                className="input-field flex-1 font-mono"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                            Output Format
                        </label>
                        <select
                            value={format}
                            onChange={(e) => setFormat(e.target.value)}
                            className="input-field w-full"
                        >
                            <option value="hex">HEX</option>
                            <option value="rgb">RGB</option>
                            <option value="hsl">HSL</option>
                            <option value="all">All Formats</option>
                        </select>
                    </div>
                </div>

                {/* Color Values */}
                <div className="space-y-3">
                    <h3 className="font-semibold text-surface-900 dark:text-white">Color Values</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-800 rounded-xl">
                            <div>
                                <div className="text-xs text-surface-500">HEX</div>
                                <div className="font-mono font-medium">{parsed.hex}</div>
                            </div>
                            <button onClick={() => copy(parsed.hex)} className="btn-secondary text-xs px-3 py-1">📋 Copy</button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-800 rounded-xl">
                            <div>
                                <div className="text-xs text-surface-500">RGB</div>
                                <div className="font-mono font-medium">{parsed.rgb}</div>
                            </div>
                            <button onClick={() => copy(parsed.rgb)} className="btn-secondary text-xs px-3 py-1">📋 Copy</button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-800 rounded-xl">
                            <div>
                                <div className="text-xs text-surface-500">HSL</div>
                                <div className="font-mono font-medium">{parsed.hsl}</div>
                            </div>
                            <button onClick={() => copy(parsed.hsl)} className="btn-secondary text-xs px-3 py-1">📋 Copy</button>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-800 rounded-xl">
                            <div>
                                <div className="text-xs text-surface-500">CSS</div>
                                <div className="font-mono font-medium">color: {parsed.hex};</div>
                            </div>
                            <button onClick={() => copy(`color: ${parsed.hex};`)} className="btn-secondary text-xs px-3 py-1">📋 Copy</button>
                        </div>
                    </div>
                </div>

                {/* Quick Colors */}
                <div>
                    <h3 className="font-semibold text-surface-900 dark:text-white mb-3">Quick Select</h3>
                    <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
                        {colors.map((c) => (
                            <button
                                key={c.hex}
                                onClick={() => handleColorChange(c.hex)}
                                className="w-full aspect-square rounded-lg border-2 border-surface-200 dark:border-surface-700 hover:scale-110 transition-transform shadow-sm"
                                style={{ backgroundColor: c.hex }}
                                title={c.name}
                            />
                        ))}
                    </div>
                </div>

                {/* Color Info */}
                <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                    <h3 className="font-semibold text-surface-900 dark:text-white mb-2">📊 Color Information</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                            <div className="text-surface-500">Red</div>
                            <div className="font-mono">{parseInt(color.slice(1, 3), 16)}</div>
                        </div>
                        <div>
                            <div className="text-surface-500">Green</div>
                            <div className="font-mono">{parseInt(color.slice(3, 5), 16)}</div>
                        </div>
                        <div>
                            <div className="text-surface-500">Blue</div>
                            <div className="font-mono">{parseInt(color.slice(5, 7), 16)}</div>
                        </div>
                        <div>
                            <div className="text-surface-500">Opacity</div>
                            <div className="font-mono">100%</div>
                        </div>
                    </div>
                </div>
            </div>
        </ToolLayout>
    );
}
