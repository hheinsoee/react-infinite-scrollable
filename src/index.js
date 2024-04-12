import { useEffect, useRef } from "react";

/**
 * A component that implements infinite scrolling behavior.
 * @component
 * @param {Object} props - The component props.
 * @param {boolean} props.hasMore - Indicates whether there are more items to load.
 * @param {boolean} props.loading - Indicates whether the component is currently loading more items.
 * @param {React.ReactNode} [props.loadingComponent] - Optional loading component to display while loading.
 * @param {React.ReactNode} [props.noMoreComponent] - Optional no more data component to display.
 * @param {Function} props.onEnd - A function to load more items.
 * @param {Number} props.offset - A function to load more items.
 * @returns {JSX.Element} - The rendered component.
 */
function InfiniteScroll({
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
            window.scrollBy(0, -5, 'smooth');
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

export default InfiniteScroll;
