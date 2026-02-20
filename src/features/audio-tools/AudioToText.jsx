import { useState, useCallback } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';
import FileUploader from '../../core/components/FileUploader';

export default function AudioToText() {
    const [audio, setAudio] = useState(null);
    const [preview, setPreview] = useState('');
    const [isTranscribing, setIsTranscribing] = useState(false);
    const [transcription, setTranscription] = useState('');
    const [language, setLanguage] = useState('en-US');

    const handleFile = useCallback((file) => {
        setAudio(file);
        setTranscription('');
        const url = URL.createObjectURL(file);
        setPreview(url);
    }, []);

    const transcribe = useCallback(() => {
        if (!audio) return;
        setIsTranscribing(true);
        // Simulated transcription
        setTimeout(() => {
            setTranscription(
                `This is a simulated transcription of your audio file "${audio.name}".\n\n` +
                `In a production environment, this would use a speech-to-text API like:\n` +
                `- Web Speech API\n` +
                `- Google Cloud Speech-to-Text\n` +
                `- AWS Transcribe\n` +
                `- Azure Speech Services\n\n` +
                `The actual transcription would convert the spoken words in your audio file into written text format.`
            );
            setIsTranscribing(false);
        }, 3000);
    }, [audio]);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(transcription);
    };

    const downloadTranscription = () => {
        const blob = new Blob([transcription], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transcription-${audio.name.split('.')[0]}.txt`;
        a.click();
    };

    return (
        <ToolLayout toolSlug="audio-to-text">
            <div className="space-y-6">
                <FileUploader accept="audio/*" onFilesSelected={handleFile} label="Drop an audio file to transcribe" />

                {preview && (
                    <div className="space-y-4">
                        <audio controls src={preview} className="w-full" />
                        
                        <div>
                            <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                                Language
                            </label>
                            <select
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                                className="w-full px-4 py-3 rounded-xl border border-surface-200 dark:border-surface-700 bg-white dark:bg-surface-900 text-surface-900 dark:text-white focus:ring-2 focus:ring-accent-500 focus:border-transparent"
                            >
                                <option value="en-US">English (US)</option>
                                <option value="en-GB">English (UK)</option>
                                <option value="es-ES">Spanish</option>
                                <option value="fr-FR">French</option>
                                <option value="de-DE">German</option>
                                <option value="it-IT">Italian</option>
                                <option value="pt-BR">Portuguese (Brazil)</option>
                                <option value="zh-CN">Chinese (Simplified)</option>
                                <option value="ja-JP">Japanese</option>
                                <option value="ko-KR">Korean</option>
                            </select>
                        </div>

                        <button onClick={transcribe} disabled={isTranscribing} className="btn-primary w-full">
                            {isTranscribing ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Transcribing...
                                </span>
                            ) : '📝 Transcribe Audio to Text'}
                        </button>

                        {transcription && (
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white">Transcription</h3>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={copyToClipboard}
                                            className="px-4 py-2 text-sm font-medium text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-900/20 rounded-lg transition-colors"
                                        >
                                            📋 Copy
                                        </button>
                                        <button
                                            onClick={downloadTranscription}
                                            className="px-4 py-2 text-sm font-medium text-accent-600 hover:bg-accent-50 dark:hover:bg-accent-900/20 rounded-lg transition-colors"
                                        >
                                            📥 Download
                                        </button>
                                    </div>
                                </div>
                                <div className="p-4 bg-surface-50 dark:bg-surface-800 rounded-xl border border-surface-200 dark:border-surface-700">
                                    <p className="text-surface-700 dark:text-surface-300 whitespace-pre-wrap leading-relaxed">
                                        {transcription}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                )}

                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">How to Transcribe Audio to Text</h3>
                    <ol className="space-y-3 text-surface-600 dark:text-surface-400">
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">1</span>
                            <span>Upload your audio file (MP3, WAV, etc.)</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">2</span>
                            <span>Select the language of the audio</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">3</span>
                            <span>Click transcribe and get your text transcription</span>
                        </li>
                    </ol>
                </div>
            </div>
        </ToolLayout>
    );
}
