# react-infinite-scrollable
`react-infinite-scrollable` is a lightweight and easy-to-use React component that enables infinite scrolling functionality in your web applications. With this package, you can effortlessly implement infinite scrolling for long lists, grids, or any other content that needs to be dynamically loaded as the user scrolls.

## Installation

To get started with react-infinite-scrollable, simply install the package via npm:

```npm
npm install react-infinite-scrollable --save
```

## Usage

```js
import React from "react";
import InfiniteScrollable from "react-infinite-scrollable";

function YourComponent() {
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoadig] = useState(true);
  const [article, setArticle] = useState([]);

  const fetchPost = () => {
    setLoadig(true);
    fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`)
      .then((data) => {
        setData((old) => [...old, ...data]);
      })
      .catch((error) => {
        setHasMore(false);
        console.log({ error });
      })
      .finally(() => {
        setLoadig(false);
      });
  };

  useEffect(() => {
    fetchPost();
  }, [page]);

  const loadMore = () => {
    setPage((pre) => pre + 1);
  };
  return (
    <InfiniteScrollable
      onEnd={loadMore}
      loading={loading}
      hasMore={hasMore}
      loadingComponent={<center>my custom loading component</center>}
      noMoreComponent={<center>my custom No more Post</center>}
      offset={300}
    >
      {articles.map((article) => (
        <div key={article.id} style={{ marginBottom: 16 }}>
          <h2>{article.title}</h2>
          <p>{article.body}</p>
        </div> // your component here
      ))}
    </InfiniteScrollable>
  );
}
```

## Parameters Table

| Name               | Description                                                      | Type              | Default                      |
| ------------------ | ---------------------------------------------------------------- | ----------------- | ---------------------------- |
| `hasMore`          | Indicates whether there are more items to load.                  | `boolean`         | `true`                       |
| `loading`          | Indicates whether the component is currently loading more items. | `boolean`         | `false`                      |
| `loadingComponent` | Optional loading component to display while loading.             | `React.ReactNode` | `<center>loading..</center>` |
| `noMoreComponent`  | Optional no more data component to display.                      | `React.ReactNode` | `<center>no more</center>`   |
| `onEnd`            | A function to load more items.                                   | `Function`        | -                            |
| `offset`           | The offset value to trigger loading more items.                  | `Number`          | 0                            |
