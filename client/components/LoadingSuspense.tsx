import * as React from "react";

interface LoadingSuspenseProps {
    loading: boolean;
    fallback: JSX.Element;
    children?: JSX.Element | JSX.Element[];
}

function LoadingSuspense({ loading, fallback, children }: LoadingSuspenseProps) {
    if (loading) {
        return <>{fallback}</>;
    }
    return <>{children}</>;
}

export default React.memo(LoadingSuspense);
