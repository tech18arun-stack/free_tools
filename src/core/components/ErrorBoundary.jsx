import { Component } from 'react';
import { Link } from 'react-router-dom';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-[400px] flex items-center justify-center p-8">
                    <div className="text-center">
                        <div className="text-6xl mb-4">⚠️</div>
                        <h2 className="text-2xl font-bold text-surface-900 dark:text-white mb-2">Something went wrong</h2>
                        <p className="text-surface-500 mb-6">This tool encountered an unexpected error.</p>
                        <div className="flex items-center justify-center gap-3">
                            <button
                                onClick={() => this.setState({ hasError: false, error: null })}
                                className="btn-primary"
                            >
                                Try Again
                            </button>
                            <Link to="/" className="btn-secondary">Go Home</Link>
                        </div>
                    </div>
                </div>
            );
        }
        return this.props.children;
    }
}
