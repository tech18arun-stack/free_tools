import { useState, useCallback, useRef } from 'react';
import ToolLayout from '../../core/layouts/ToolLayout';

export default function ScreenRecorder() {
    const [isRecording, setIsRecording] = useState(false);
    const [recordings, setRecordings] = useState([]);
    const [elapsedTime, setElapsedTime] = useState(0);
    const [includeAudio, setIncludeAudio] = useState(true);
    const mediaRecorderRef = useRef(null);
    const chunksRef = useRef([]);
    const timerRef = useRef(null);
    const streamRef = useRef(null);

    const startRecording = useCallback(async () => {
        try {
            const displayStream = await navigator.mediaDevices.getDisplayMedia({
                video: { mediaSource: 'screen' },
                audio: includeAudio
            });

            let audioStream = null;
            if (includeAudio) {
                try {
                    audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    audioStream.getTracks().forEach(track => displayStream.addTrack(track));
                } catch (err) {
                    console.log('Audio not available');
                }
            }

            mediaRecorderRef.current = new MediaRecorder(displayStream, {
                mimeType: 'video/webm;codecs=vp9'
            });

            streamRef.current = displayStream;
            chunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'video/webm' });
                const url = URL.createObjectURL(blob);
                setRecordings(prev => [...prev, {
                    url,
                    blob,
                    name: `screen-recording-${Date.now()}.webm`,
                    duration: elapsedTime
                }]);
                
                displayStream.getTracks().forEach(track => track.stop());
                if (audioStream) {
                    audioStream.getTracks().forEach(track => track.stop());
                }
            };

            displayStream.getVideoTracks()[0].onended = () => {
                stopRecording();
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setElapsedTime(0);

            timerRef.current = setInterval(() => {
                setElapsedTime(prev => prev + 1);
            }, 1000);
        } catch (err) {
            console.error('Error starting screen recording:', err);
            alert('Could not start screen recording. Please allow screen sharing.');
        }
    }, [includeAudio, elapsedTime]);

    const stopRecording = useCallback(() => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            clearInterval(timerRef.current);
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
            }
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
        <ToolLayout toolSlug="screen-recorder">
            <div className="space-y-6">
                <div className="text-center py-8">
                    <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 ${
                        isRecording ? 'bg-red-100 dark:bg-red-900/30 animate-pulse' : 'bg-accent-100 dark:bg-accent-900/30'
                    }`}>
                        <svg className={`w-12 h-12 ${isRecording ? 'text-red-600' : 'text-accent-600 dark:text-accent-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </div>

                    <div className="text-4xl font-bold text-surface-900 dark:text-white mb-2 font-mono">
                        {formatTime(elapsedTime)}
                    </div>
                    <div className="text-surface-500 dark:text-surface-400 mb-8">
                        {isRecording ? 'Recording screen...' : 'Ready to record'}
                    </div>

                    <div className="flex items-center justify-center gap-4 mb-8">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={includeAudio}
                                onChange={(e) => setIncludeAudio(e.target.checked)}
                                className="w-4 h-4 rounded border-surface-300 text-accent-600 focus:ring-accent-500"
                            />
                            <span className="text-surface-700 dark:text-surface-300">Include microphone audio</span>
                        </label>
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
                                <video controls src={recording.url} className="flex-1 max-h-32 rounded-lg" />
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
                    <h3 className="text-lg font-semibold text-surface-900 dark:text-white mb-4">How to Record Screen</h3>
                    <ol className="space-y-3 text-surface-600 dark:text-surface-400">
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">1</span>
                            <span>Optionally enable microphone audio</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">2</span>
                            <span>Click "Start Recording" and select the screen/window to record</span>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-600 dark:text-accent-400 flex items-center justify-center text-sm font-semibold">3</span>
                            <span>Click "Stop Recording" when done and download your video</span>
                        </li>
                    </ol>
                </div>
            </div>
        </ToolLayout>
    );
}
