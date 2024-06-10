import React, { useEffect, useRef } from "react";

interface InfiniteScrollable {
  hasMore: boolean;
  loading: boolean;
  loadingComponent?: React.ReactNode;
  noMoreComponent?: React.ReactNode;
  onEnd: Function;
  children?: React.ReactNode[];
  offset?: number;
  height?: string | number;
}

export default function InfiniteScrollable({
  hasMore,
  loading,
  loadingComponent,
  noMoreComponent,
  onEnd,
  children,
  offset,
  height,
}: InfiniteScrollable) {
  const observerTarget = useRef<HTMLDivElement | null>(null);
  const parentObserver = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!loading && hasMore) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            window.scroll({
              top: window.scrollY - 5,
              behavior: "smooth",
            });
            onEnd();
          }
        },
        { threshold: 1 }
      );
      if (observerTarget.current) {
        observer.observe(observerTarget.current);
      }
      return () => {
        if (observerTarget.current) {
          observer.unobserve(observerTarget.current);
        }
      };
    }
  }, [observerTarget, loading, hasMore]);

  useEffect(() => {
    if (!loading && hasMore) {
      if (observerTarget.current && parentObserver.current) {
        if (
          observerTarget.current.offsetTop < parentObserver.current.clientHeight
        ) {
          onEnd();
        }
      }
    }
  }, [observerTarget, loading, hasMore]);
  return (
    <div style={{ height: height, overflow: "auto" }} ref={parentObserver}>
      {children}
      {hasMore && (
        <div style={{ minHeight: 50 }}>
          {loading &&
            (loadingComponent || (
              <span style={{ textAlign: "center" }}>loading..</span>
            ))}
        </div>
      )}
      {!hasMore &&
        (noMoreComponent || (
          <span style={{ textAlign: "center" }}>no more</span>
        ))}
      <div ref={observerTarget} style={{ marginTop: -(offset || 0) }}></div>
    </div>
  );
}
