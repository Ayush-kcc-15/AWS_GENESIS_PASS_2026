import { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error caught by ErrorBoundary:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-genesis-midnight text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
          {/* Ambient Lighting */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-genesis-electric/15 rounded-full blur-[140px] pointer-events-none" />

          <div className="relative max-w-md w-full glass-panel p-8 rounded-3xl border-2 border-genesis-electric/40 bg-genesis-dark/95 shadow-glow-electric-lg text-center space-y-6">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-[0_0_20px_rgba(245,158,11,0.3)]">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <span className="text-[10px] font-mono px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold uppercase tracking-wider">
                System Anomaly Detected
              </span>
              <h2 className="text-xl font-black text-white tracking-tight uppercase pt-1">
                Unable to Display Screen
              </h2>
              <p className="text-xs text-genesis-muted leading-relaxed">
                An unexpected interface error occurred. Don't worry, your session data is stored safely in your browser.
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={this.handleReload}
                className="w-full sm:w-auto glow-btn px-5 py-2.5 rounded-xl bg-gradient-to-r from-genesis-electric to-genesis-cyan text-genesis-midnight font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-glow-electric"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reload App</span>
              </button>

              <button
                onClick={this.handleGoHome}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl glass-panel text-white hover:text-genesis-cyan font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors"
              >
                <Home className="w-3.5 h-3.5" />
                <span>Genesis Home</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
