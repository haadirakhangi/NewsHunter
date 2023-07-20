import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export default function News(props) {
  const [article, setArticle] = useState([]);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState(0);
  const [loading, setloading] = useState(false);

  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      setloading(true);
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d94174f27893413fadfeed2df73fbeb0&page=${page}&pageSize=${props.pageSize}`
      );
      const data = await response.json();
      setArticle(data.articles);
      settotalResults(data.totalResults);
      setloading(false);
      setpage(page+1)
      document.title = capitalize(props.category) + " - NewsHunter";
    } catch (error) {
      console.log(error);
    }
  };

  const fetchMoreData = async () => {
    try {
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=d94174f27893413fadfeed2df73fbeb0&page=${page}&pageSize=${props.pageSize}`
      );
      const data = await response.json();
      setArticle(article.concat(data.articles));
      settotalResults(data.totalResults);
      setpage(page + 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="text-center my-3">
        NewsHunter - Top {capitalize(props.category)} headline
      </h2>
      <div className="text-center">{loading && <Spinner />}</div>
      <InfiniteScroll
        dataLength={article.length}
        next={fetchMoreData}
        hasMore={article.length !== totalResults}
        loader={<Spinner />}
      >
        <div className="container">
          <div className="row">
            {article.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element["title"] ? element["title"] : ""}
                    desc={element.description ? element.description : ""}
                    url={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://neurosciencenews.com/files/2023/07/mental-test-dementia-neurosicence.jpg"
                    }
                    newsUrl={element.url ? element.url : ""}
                    author={element.author}
                    time={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
    </>
  );
}

News.propTypes = {
  country: PropTypes.string,
  category: PropTypes.string,
  pageSize: PropTypes.number,
};

News.defaultProps = {
  country: "in",
  category: "general",
  pageSize: 6,
};
