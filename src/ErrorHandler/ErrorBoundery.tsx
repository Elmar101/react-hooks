import React, { Component, ErrorInfo, ReactNode } from "react";
interface Props {
    children: ReactNode;
    onError?: (error: Error)=> void
}
interface State {
  hasError: boolean;
  error: Error | undefined
}
class ErrorBoundery extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: undefined
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true , error: error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
      if(this.props.onError){
        this.props.onError(error)
      }
    console.error("!!!Uncaught error:", error, errorInfo);
    console.log(this.state.hasError)
  }

  public render() {
    if (this.state.hasError /* && !!this.state.error */) {
      return <h1>Sorry.. there was an error</h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundery;
