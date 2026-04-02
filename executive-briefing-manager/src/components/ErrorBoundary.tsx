import { Component, type ReactNode, type ErrorInfo } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('App crashed:', error, errorInfo);
    this.setState({ errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          height: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#0b0f1a',
          color: '#e2e8f0',
          fontFamily: 'system-ui, sans-serif',
          padding: 32,
        }}>
          <div style={{
            maxWidth: 600,
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(239,68,68,0.4)',
            borderRadius: 12,
            padding: 32,
          }}>
            <div style={{ fontSize: 32, marginBottom: 16 }}>⚠️</div>
            <h2 style={{ margin: '0 0 8px', color: '#f87171' }}>Something went wrong</h2>
            <p style={{ color: '#94a3b8', marginBottom: 16 }}>
              The app crashed during startup. Check the details below.
            </p>
            <pre style={{
              background: 'rgba(0,0,0,0.4)',
              borderRadius: 8,
              padding: 16,
              fontSize: 12,
              color: '#fca5a5',
              overflow: 'auto',
              maxHeight: 300,
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
            }}>
              {this.state.error?.toString()}
              {'\n\n'}
              {this.state.errorInfo?.componentStack}
            </pre>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
