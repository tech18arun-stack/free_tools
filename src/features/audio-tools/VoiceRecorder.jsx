import { useState, useCallback, useRef } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function VoiceRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [recordings, setRecordings] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const timerRef = useRef(null);

    const startRecording = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            chunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (e) => {
                chunksRef.current.push(e.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                const url = URL.createObjectURL(blob);
                setRecordings(prev => [...prev, {
                    url,
                    blob,
                    name: `recording-${Date.now()}.webm`,
                    duration: elapsedTime
                }]);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setElapsedTime(0);

            timerRef.current = setInterval(() => {
                setElapsedTime(prev => prev + 1);
            }, 1000);
        } catch (err) {
            console.error('Error accessing microphone:', err);
            alert('Could not access microphone. Please allow microphone access.');
        }
    }, [elapsedTime]);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            clearInterval(timerRef.current);
        }
    }, [isRecording]);

    const deleteRecording = (index) => {
        setRecordings(prev => prev.filter((_, i) => i !== index));
    };

    const downloadRecording = (recording) => {
        const a = document.createElement('a');
        a.href = recording.url;
        a.download = recording.name;
        a.click();
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <ToolLayout toolSlug="voice-recorder">
            <div className="space-y-6">
                <div className="text-center py-8">
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
                        isRecording ? 'bg-red-100 dark:bg-red-900/30 animate-pulse' : 'bg-accent-100 dark:bg-accent-900/30'
                    }`}>
                        <svg className={`w-12 h-12 ${isRecording ? 'text-red-600' : 'text-accent-600 dark:text-accent-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    </div>

                    <div className="text-4xl font-bold text-surface-900 dark:text-white mb-2 font-mono">
                        {formatTime(elapsedTime)}
                    </div>
                    <div className="text-surface-500 dark:text-surface-400 mb-8">
                        {isRecording ? 'Recording...' : 'Ready to record'}
                    </div>

                    <div className="flex justify-center gap-4">
                        {!isRecording ? (
                            <button onClick={startRecording} className="btn-primary flex items-center gap-2">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="8" />
                                </svg>
                                Start Recording
                            </button>
                        ) : (
                            <button
                                onClick={stopRecording}
                                className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold transition-colors flex items-center gap-2"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <rect x="6" y="6" width="12" height="12" />
                                </svg>
                                Stop Recording
                            </button>
                        )}
                    </div>
                </div>

                {recordings.length > 0 && (
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-surface-900 dark:text-white">
                            Recordings ({recordings.length})
                        </h3>
                        {recordings.map((recording, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 bg-surface-50 dark:bg-surface-800 rounded-xl">
                                <audio controls src={recording.url} className="flex-1" />
                                <div className="text-sm text-surface-500 whitespace-nowrap">
                                    {formatTime(recording.duration)}
                                </div>
                                <button
                                    onClick={() => downloadRecording(recording)}
                                    className="p-2 rounded-lg hover:bg-accent-100 dark:hover:bg-accent-900/30 text-accent-600"
                                    title="Download"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => deleteRecording(index)}
                                    className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-600"
                                    title="Delete"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">How to Record Voice</h3>
                    <ol className="space-y-3 text-surface-600 dark:text-surface-400">
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">1</span>
                            <span>Click "Start Recording" and allow microphone access</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">2</span>
                            <span>Speak into your microphone</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">3</span>
                            <span>Click "Stop Recording" when done and download your audio</span>
                        </li>
                    </ol>
                </div>
            </div>
        </ToolLayout>
    );
}
