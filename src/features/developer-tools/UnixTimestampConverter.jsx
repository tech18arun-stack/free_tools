import { useState, useEffect, useCallback } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function UnixTimestampConverter() {
    const [timestamp, setTimestamp] = useState('');
    const [dateStr, setDateStr] = useState('');
    const [currentTimestamp, setCurrentTimestamp] = useState(Math.floor(Date.now() / 1000));
    const [currentDate, setCurrentDate] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTimestamp(Math.floor(Date.now() / 1000));
            setCurrentDate(new Date());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const timestampToDate = useCallback((ts) => {
        const num = parseInt(ts);
        if (isNaN(num)) return 'Invalid timestamp';
        // Handle milliseconds vs seconds
        const date = num > 1e12 ? new Date(num) : new Date(num * 1000);
        return date.toString();
    }, []);

    const dateToTimestamp = useCallback((dateString) => {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return 'Invalid date';
        return Math.floor(date.getTime() / 1000);
    }, []);

    const handleTimestampChange = (value) => {
        setTimestamp(value);
        if (value) {
            const result = timestampToDate(value);
            setDateStr(result);
        }
    };

    const handleDateChange = (value) => {
        setDateStr(value);
        if (value) {
            const result = dateToTimestamp(value);
            setTimestamp(result.toString());
        }
    };

    const copyToNow = () => {
        setTimestamp(currentTimestamp.toString());
        setDateStr(currentDate.toString());
    };

    const formats = {
        unix: currentTimestamp,
        milliseconds: currentTimestamp * 1000,
        iso: currentDate.toISOString(),
        utc: currentDate.toUTCString(),
        local: currentDate.toLocaleString(),
        dateOnly: currentDate.toLocaleDateString(),
        timeOnly: currentDate.toLocaleTimeString(),
    };

    return (
        <ToolLayout toolSlug="unix-timestamp-converter">
            <div className="space-y-6">
                {/* Current Time Display */}
                <div className="p-6 bg-gradient-to-r from-accent-500 to-purple-600 rounded-2xl text-white">
                    <div className="text-sm opacity-80 mb-1">Current Unix Timestamp</div>
                    <div className="text-4xl md:text-5xl font-mono font-bold mb-2">{currentTimestamp}</div>
                    <div className="text-sm opacity-80">{currentDate.toLocaleString()}</div>
                    <button onClick={copyToNow} className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors">
                        📋 Use Current Time
                    </button>
                </div>

                {/* Converters */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {/* Timestamp to Date */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-surface-900 dark:text-white">Unix Timestamp → Date</h3>
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                Unix Timestamp (seconds)
                            </label>
                            <input
                                type="text"
                                value={timestamp}
                                onChange={(e) => handleTimestampChange(e.target.value)}
                                placeholder="1708435200"
                                className="input-field font-mono"
                            />
                        </div>
                        {timestamp && (
                            <div className="p-3 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <div className="text-xs text-surface-500 mb-1">Converted Date:</div>
                                <div className="font-mono text-sm break-all">{dateStr}</div>
                            </div>
                        )}
                    </div>

                    {/* Date to Timestamp */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-surface-900 dark:text-white">Date → Unix Timestamp</h3>
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                Date/Time String
                            </label>
                            <input
                                type="text"
                                value={dateStr || ''}
                                onChange={(e) => handleDateChange(e.target.value)}
                                placeholder="2024-02-20 12:00:00"
                                className="input-field font-mono"
                            />
                            <p className="text-xs text-surface-500 mt-1">Accepts: YYYY-MM-DD, ISO format, natural language</p>
                        </div>
                        {dateStr && timestamp && (
                            <div className="p-3 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <div className="text-xs text-surface-500 mb-1">Unix Timestamp:</div>
                                <div className="font-mono text-sm">{timestamp}</div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Conversions */}
                <div>
                    <h3 className="font-semibold text-surface-900 dark:text-white mb-3">Common Timestamp Formats</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                            { label: 'Unix (seconds)', value: formats.unix },
                            { label: 'Unix (milliseconds)', value: formats.milliseconds },
                            { label: 'ISO 8601', value: formats.iso },
                            { label: 'UTC String', value: formats.utc },
                            { label: 'Local Time', value: formats.local },
                            { label: 'Date Only', value: formats.dateOnly },
                            { label: 'Time Only', value: formats.timeOnly },
                        ].map(format => (
                            <div
                                key={format.label}
                                className="flex items-center justify-between p-3 bg-surface-50 dark:bg-surface-800 rounded-xl"
                            >
                                <div>
                                    <div className="text-xs text-surface-500">{format.label}</div>
                                    <div className="font-mono text-sm">{format.value}</div>
                                </div>
                                <button
                                    onClick={() => {
                                        navigator.clipboard.writeText(format.value.toString());
                                    }}
                                    className="btn-secondary text-xs px-3 py-1"
                                >
                                    📋 Copy
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Select */}
                <div>
                    <h3 className="font-semibold text-surface-900 dark:text-white mb-3">Quick Select</h3>
                    <div className="flex flex-wrap gap-2">
                        {[
                            { label: 'Now', ts: currentTimestamp },
                            { label: '1 hour ago', ts: currentTimestamp - 3600 },
                            { label: '1 day ago', ts: currentTimestamp - 86400 },
                            { label: '1 week ago', ts: currentTimestamp - 604800 },
                            { label: '1 month ago', ts: currentTimestamp - 2592000 },
                            { label: '1 year ago', ts: currentTimestamp - 31536000 },
                            { label: 'Tomorrow', ts: currentTimestamp + 86400 },
                        ].map(item => (
                            <button
                                key={item.label}
                                onClick={() => handleTimestampChange(item.ts.toString())}
                                className="btn-secondary text-sm px-4 py-2"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                    <h3 className="font-semibold text-surface-900 dark:text-white mb-2">📖 What is Unix Timestamp?</h3>
                    <p className="text-sm text-surface-600 dark:text-surface-400 leading-relaxed">
                        Unix timestamp is the number of seconds that have elapsed since January 1, 1970 (midnight UTC/GMT), 
                        not counting leap seconds. It's widely used in programming, databases, and file systems for 
                        representing dates and times in a standardized way.
                    </p>
                </div>
            </div>
        </ToolLayout>
    );
}
