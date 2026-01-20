import { Component, type ReactNode, type ErrorInfo } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error);
    console.error("Error info:", errorInfo);

    this.setState({ errorInfo });
  }

  handleReset = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleRefresh = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="flex min-h-screen items-center justify-center bg-background p-4">
          <div className="w-full max-w-md rounded-lg border bg-card p-6 text-center shadow-lg">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-6 w-6 text-destructive" />
            </div>

            <h2 className="mb-2 text-xl font-semibold text-foreground">
              Something went wrong
            </h2>

            <p className="mb-6 text-sm text-muted-foreground">
              We encountered an unexpected error. Please try refreshing the page
              or contact support if the problem persists.
            </p>

            {import.meta.env.VITE_APP_NODE_ENV === "development" &&
              this.state.error && (
                <div className="mb-6 rounded-md bg-muted p-3 text-left">
                  <p className="mb-1 text-xs font-medium text-muted-foreground">
                    Error Details (Development Only):
                  </p>
                  <pre className="overflow-auto text-xs text-destructive">
                    {this.state.error.message}
                  </pre>
                </div>
              )}

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={this.handleReset}
              >
                Try Again
              </Button>
              <Button className="flex-1" onClick={this.handleRefresh}>
                <RefreshCw className="mr-2 h-4 w-4" />
                Refresh Page
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
