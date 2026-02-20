import { useState, useMemo } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function UserAgentParser() {
    const [userAgent, setUserAgent] = useState('');
    const [copied, setCopied] = useState(false);

    const parseUserAgent = (ua) => {
        if (!ua) return null;

        const result = {
            userAgent: ua,
            browser: { name: 'Unknown', version: 'Unknown' },
            os: { name: 'Unknown', version: 'Unknown' },
            device: { type: 'Desktop', vendor: 'Unknown', model: 'Unknown' },
            engine: { name: 'Unknown', version: 'Unknown' },
            cpu: { architecture: 'Unknown' },
        };

        // Browser detection
        if (ua.includes('Edg/')) {
            result.browser.name = 'Microsoft Edge';
            result.browser.version = ua.match(/Edg\/([\d.]+)/)?.[1] || 'Unknown';
        } else if (ua.includes('Chrome/') && !ua.includes('Edg/')) {
            result.browser.name = 'Chrome';
            result.browser.version = ua.match(/Chrome\/([\d.]+)/)?.[1] || 'Unknown';
        } else if (ua.includes('Firefox/')) {
            result.browser.name = 'Firefox';
            result.browser.version = ua.match(/Firefox\/([\d.]+)/)?.[1] || 'Unknown';
        } else if (ua.includes('Safari/') && !ua.includes('Chrome/')) {
            result.browser.name = 'Safari';
            result.browser.version = ua.match(/Version\/([\d.]+)/)?.[1] || 'Unknown';
        } else if (ua.includes('MSIE') || ua.includes('Trident/')) {
            result.browser.name = 'Internet Explorer';
            result.browser.version = ua.match(/(?:MSIE |rv:)([\d.]+)/)?.[1] || 'Unknown';
        } else if (ua.includes('Opera') || ua.includes('OPR/')) {
            result.browser.name = 'Opera';
            result.browser.version = ua.match(/(?:Opera|OPR\/)([\d.]+)/)?.[1] || 'Unknown';
        }

        // OS detection
        if (ua.includes('Win')) {
            result.os.name = 'Windows';
            if (ua.includes('Windows NT 10.0')) result.os.version = '10';
            else if (ua.includes('Windows NT 6.3')) result.os.version = '8.1';
            else if (ua.includes('Windows NT 6.2')) result.os.version = '8';
            else if (ua.includes('Windows NT 6.1')) result.os.version = '7';
            else if (ua.includes('Windows NT 6.0')) result.os.version = 'Vista';
        } else if (ua.includes('Mac')) {
            result.os.name = 'macOS';
            const macMatch = ua.match(/Mac OS X ([\d_]+)/);
            result.os.version = macMatch ? macMatch[1].replace(/_/g, '.') : 'Unknown';
        } else if (ua.includes('Linux')) {
            result.os.name = 'Linux';
            if (ua.includes('Ubuntu')) result.os.version = 'Ubuntu';
            else if (ua.includes('Fedora')) result.os.version = 'Fedora';
            else if (ua.includes('Debian')) result.os.version = 'Debian';
        } else if (ua.includes('Android')) {
            result.os.name = 'Android';
            result.os.version = ua.match(/Android ([\d.]+)/)?.[1] || 'Unknown';
        } else if (ua.includes('iOS') || ua.includes('iPhone') || ua.includes('iPad')) {
            result.os.name = 'iOS';
            const iosMatch = ua.match(/OS ([\d_]+)/);
            result.os.version = iosMatch ? iosMatch[1].replace(/_/g, '.') : 'Unknown';
        }

        // Device detection
        if (/Mobile|Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
            result.device.type = 'Mobile';
            if (ua.includes('iPad') || ua.includes('Tablet')) result.device.type = 'Tablet';
        }

        if (ua.includes('iPhone')) {
            result.device.vendor = 'Apple';
            result.device.model = 'iPhone';
        } else if (ua.includes('iPad')) {
            result.device.vendor = 'Apple';
            result.device.model = 'iPad';
        } else if (ua.includes('Android')) {
            const deviceMatch = ua.match(/Mobile\/([^\s;]+)/);
            if (deviceMatch && deviceMatch[1] !== 'Android') {
                result.device.vendor = 'Various';
                result.device.model = deviceMatch[1];
            }
        }

        // Engine detection
        if (ua.includes('AppleWebKit/')) {
            result.engine.name = 'WebKit';
            result.engine.version = ua.match(/AppleWebKit\/([\d.]+)/)?.[1] || 'Unknown';
        } else if (ua.includes('Gecko/')) {
            result.engine.name = 'Gecko';
            result.engine.version = ua.match(/Gecko\/([\d.]+)/)?.[1] || 'Unknown';
        } else if (ua.includes('Trident/')) {
            result.engine.name = 'Trident';
            result.engine.version = ua.match(/Trident\/([\d.]+)/)?.[1] || 'Unknown';
        }

        // CPU architecture
        if (ua.includes('WOW64') || ua.includes('Win64')) {
            result.cpu.architecture = '64-bit';
        } else if (ua.includes('ARM')) {
            result.cpu.architecture = 'ARM';
        } else if (ua.includes('Linux x86_64')) {
            result.cpu.architecture = 'x86_64';
        }

        return result;
    };

    const parsed = useMemo(() => parseUserAgent(userAgent), [userAgent]);

    const loadSample = () => {
        const samples = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
            'Mozilla/5.0 (iPhone; CPU iPhone OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Mobile/15E148 Safari/604.1',
            'Mozilla/5.0 (Linux; Android 14; SM-S918B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:122.0) Gecko/20100101 Firefox/122.0',
        ];
        setUserAgent(samples[Math.floor(Math.random() * samples.length)]);
    };

    const useCurrentUA = () => {
        setUserAgent(navigator.userAgent);
    };

    const copy = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <ToolLayout toolSlug="user-agent-parser">
            <div className="space-y-6">
                {/* Input */}
                <div>
                    <div className="flex items-center justify-between mb-2">
                        <label className="text-sm font-medium text-surface-700 dark:text-surface-300">User Agent String</label>
                        <div className="flex gap-2">
                            <button onClick={useCurrentUA} className="text-xs btn-secondary px-3 py-1">🌐 Use Current</button>
                            <button onClick={loadSample} className="text-xs btn-secondary px-3 py-1">📄 Sample</button>
                        </div>
                    </div>
                    <textarea
                        value={userAgent}
                        onChange={(e) => setUserAgent(e.target.value)}
                        placeholder="Paste user agent string here..."
                        className="input-field font-mono text-xs h-24 resize-y"
                    />
                </div>

                {parsed && (
                    <>
                        {/* Summary Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl text-white">
                                <div className="text-sm opacity-80 mb-1">Browser</div>
                                <div className="text-xl font-bold">{parsed.browser.name}</div>
                                <div className="text-sm opacity-80">{parsed.browser.version}</div>
                            </div>
                            <div className="p-4 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl text-white">
                                <div className="text-sm opacity-80 mb-1">Operating System</div>
                                <div className="text-xl font-bold">{parsed.os.name}</div>
                                <div className="text-sm opacity-80">{parsed.os.version}</div>
                            </div>
                            <div className="p-4 bg-gradient-to-br from-green-500 to-green-600 rounded-xl text-white">
                                <div className="text-sm opacity-80 mb-1">Device</div>
                                <div className="text-xl font-bold">{parsed.device.type}</div>
                                <div className="text-sm opacity-80">{parsed.device.vendor}</div>
                            </div>
                            <div className="p-4 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl text-white">
                                <div className="text-sm opacity-80 mb-1">Engine</div>
                                <div className="text-xl font-bold">{parsed.engine.name}</div>
                                <div className="text-sm opacity-80">{parsed.engine.version}</div>
                            </div>
                        </div>

                        {/* Detailed Info */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {/* Browser Details */}
                            <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <h3 className="font-semibold text-surface-900 dark:text-white mb-3 flex items-center gap-2">
                                    🌐 Browser Details
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-surface-500">Name</span>
                                        <span className="font-medium">{parsed.browser.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-surface-500">Version</span>
                                        <span className="font-mono">{parsed.browser.version}</span>
                                    </div>
                                </div>
                            </div>

                            {/* OS Details */}
                            <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <h3 className="font-semibold text-surface-900 dark:text-white mb-3 flex items-center gap-2">
                                    💻 Operating System
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-surface-500">Name</span>
                                        <span className="font-medium">{parsed.os.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-surface-500">Version</span>
                                        <span className="font-mono">{parsed.os.version}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Device Details */}
                            <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <h3 className="font-semibold text-surface-900 dark:text-white mb-3 flex items-center gap-2">
                                    📱 Device Information
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-surface-500">Type</span>
                                        <span className="font-medium">{parsed.device.type}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-surface-500">Vendor</span>
                                        <span className="font-medium">{parsed.device.vendor}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-surface-500">Model</span>
                                        <span className="font-medium">{parsed.device.model}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Engine & CPU */}
                            <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <h3 className="font-semibold text-surface-900 dark:text-white mb-3 flex items-center gap-2">
                                    ⚙️ Engine & CPU
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-surface-500">Rendering Engine</span>
                                        <span className="font-medium">{parsed.engine.name}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-surface-500">Engine Version</span>
                                        <span className="font-mono">{parsed.engine.version}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-surface-500">CPU Architecture</span>
                                        <span className="font-medium">{parsed.cpu.architecture}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Raw User Agent */}
                        <div>
                            <h3 className="font-semibold text-surface-900 dark:text-white mb-2">Raw User Agent String</h3>
                            <div className="flex items-center gap-2">
                                <code className="flex-1 p-3 bg-surface-50 dark:bg-surface-800 rounded-xl text-xs break-all font-mono">
                                    {parsed.userAgent}
                                </code>
                                <button onClick={() => copy(parsed.userAgent)} className="btn-secondary px-3 py-2">
                                    {copied ? '✅' : '📋'}
                                </button>
                            </div>
                        </div>
                    </>
                )}

                {/* Info */}
                <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                    <h3 className="font-semibold text-surface-900 dark:text-white mb-2">📖 What is a User Agent?</h3>
                    <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
                        A User Agent (UA) string is a text identifier that browsers send to websites, containing information 
                        about the browser, operating system, and device. Websites use this data for analytics, compatibility 
                        checks, and serving appropriate content. Developers use UA parsing for browser detection and 
                        responsive design decisions.
                    </p>
                </div>
            </div>
        </ToolLayout>
    );
}
