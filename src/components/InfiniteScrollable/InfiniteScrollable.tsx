import React, { useEffect, useRef } from "react";

interface InfiniteScrollable {
  hasMore: boolean;
  loading: boolean;
  loadingComponent?: React.ReactNode;
  noMoreComponent?: React.ReactNode;
  onEnd: Function;
  children?: React.ReactNode[];
  offset?: number | 0;
}

export default function InfiniteScrollable({
  hasMore,
  loading,
  loadingComponent,
  noMoreComponent,
  onEnd,
  children,
  offset = 0 as number,
}: InfiniteScrollable) {
  const observerTarget = useRef(null);
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
  return (
    <div>
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
      <div
        ref={observerTarget}
        style={{ paddingTop: 300, marginTop: -300 - offset }}
      ></div>
    </div>
  );
}
