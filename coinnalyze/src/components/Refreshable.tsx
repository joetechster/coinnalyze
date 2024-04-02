import React from 'react';

export interface RefreshableProps {
  refreshing: boolean;
  children?: React.ReactNode;
  fallback?: React.ReactNode;
}
export default function Refreshable({
  refreshing,
  children,
  fallback,
}: RefreshableProps) {
  if (refreshing) {
    return fallback;
  } else {
    return children;
  }
}
