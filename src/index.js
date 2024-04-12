import React, { useEffect, useRef } from "react";

/**
 * A component that implements infinite scrolling behavior.
 * @component
 * @param {Object} _ref - The component props.
 * @param {boolean} _ref.hasMore - Indicates whether there are more items to load.
 * @param {boolean} _ref.loading - Indicates whether the component is currently loading more items.
 * @param {React.ReactNode} [_ref.loadingComponent] - Optional loading component to display while loading.
 * @param {React.ReactNode} [_ref.noMoreComponent] - Optional no more data component to display.
 * @param {Function} _ref.onEnd - A function to load more items.
 * @param {Number} _ref.offset - A function to load more items.
 * @returns {JSX.Element} - The rendered component.
 */
export default function InfiniteScrollable({
  hasMore,
  loading,
  loadingComponent,
  noMoreComponent,
  onEnd,
  children,
  offset = 0,
}) {
  const observerTarget = useRef(null);
  useEffect(() => {
    if (!loading && hasMore) {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            window.scrollBy(0, -5, "smooth");
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
          {loading && (loadingComponent || <center>loading..</center>)}
        </div>
      )}
      {!hasMore && (noMoreComponent || <center>no more</center>)}
      <div
        ref={observerTarget}
        style={{ paddingTop: 300, marginTop: -300 - offset }}
      ></div>
    </div>
  );
}
