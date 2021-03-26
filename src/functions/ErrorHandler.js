import React from 'react';

class ErrorHandler extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        if (typeof this.props.error === "function") {
            this.props.error(error, errorInfo);
        }
        console.error(error);
        console.error(errorInfo);
    }

    componentDidMount() {
        if (typeof this.props.callback === "function") {
            this.props.callback();
        }
    }

    render() {
        if (this.state.hasError) {
            // You can render any custom fallback UI
            return <p className="text-red-600">投稿の描画に失敗しました．マークダウン記法が間違っている可能性があります．</p>;
        }

        return this.props.children;
    }
}

export default ErrorHandler;