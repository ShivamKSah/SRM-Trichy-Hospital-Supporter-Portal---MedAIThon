
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Simple ErrorBoundary to render a visible error instead of a blank page
class ErrorBoundary extends React.Component<{}, { error: Error | null; info: React.ErrorInfo | null }> {
  constructor(props: {}) {
    super(props);
    this.state = { error: null, info: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { error, info: null };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    // Log for debugging
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught error:', error, info);
    this.setState({ error, info });
  }

  render() {
    if (this.state.error) {
      const err = this.state.error;
      const stack = this.state.info?.componentStack || (err.stack || '').toString();
      return (
        <div style={{ padding: 24, fontFamily: 'Inter, system-ui, Arial', color: '#111' }}>
          <h1 style={{ color: '#c53030' }}>An error occurred while loading the app</h1>
          <p style={{ whiteSpace: 'pre-wrap', background: '#fee', padding: 12, borderRadius: 6 }}>{err.message}</p>
          <details style={{ whiteSpace: 'pre-wrap', marginTop: 12, background: '#fff7f7', padding: 12, borderRadius: 6 }}>
            <summary style={{ cursor: 'pointer' }}>Stack / component trace</summary>
            <pre style={{ overflowX: 'auto' }}>{stack}</pre>
          </details>
        </div>
      );
    }
    return this.props.children as React.ReactElement;
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  // Don't throw; instead write a visible message to the document so the deployed page isn't blank.
  // eslint-disable-next-line no-console
  console.error('Could not find root element to mount to');
  document.body.innerHTML = '<div style="padding:24px;font-family:Inter,system-ui,Arial;color:#111"><h1 style="color:#c53030">Application mount failed</h1><p>Missing <code>#root</code> element in page.</p></div>';
} else {
  const root = ReactDOM.createRoot(rootElement);

  // Global error handlers to show runtime errors on the page
  window.addEventListener('error', (evt) => {
    // eslint-disable-next-line no-console
    console.error('Global error caught:', evt.error || evt.message, evt);
    const el = document.getElementById('root');
    if (el) {
      el.innerHTML = `\n        <div style="padding:24px;font-family:Inter,system-ui,Arial;color:#111">\n          <h1 style=\"color:#c53030\">Runtime Error</h1>\n          <pre style=\"white-space:pre-wrap;background:#fee;padding:12px;border-radius:6px;\">${(evt.error && (evt.error.message || evt.error.toString())) || evt.message}</pre>\n        </div>`;
    }
  });

  window.addEventListener('unhandledrejection', (evt) => {
    // eslint-disable-next-line no-console
    console.error('Unhandled rejection:', evt.reason);
    const el = document.getElementById('root');
    if (el) {
      el.innerHTML = `\n        <div style="padding:24px;font-family:Inter,system-ui,Arial;color:#111">\n          <h1 style=\"color:#c53030\">Unhandled Promise Rejection</h1>\n          <pre style=\"white-space:pre-wrap;background:#fee;padding:12px;border-radius:6px;\">${(evt.reason && (evt.reason.message || evt.reason.toString())) || String(evt.reason)}</pre>\n        </div>`;
    }
  });

  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  );
}
