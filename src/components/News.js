import React, { useEffect, useState } from "react";
import PropTypes from 'prop-types'
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export default function News(props) {
  const [article, setArticle] = useState([]);
  const [page, setpage] = useState(1);
  const [totalResults, settotalResults] = useState()
  const [loading, setloading] = useState(false)
  // const pageSize = 3;

  const capitalize = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  useEffect(() => {
    fetchArticles();
  }, [page]);

  const fetchArticles = async () => {
    try {
      setloading(true)
      const response = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=eb5382eb095645a5b71210fa0941e3df&page=${page}&pageSize=${props.pageSize}`
      );
      const data = await response.json();
      setArticle(data.articles);
      settotalResults(data.totalResults)
      setloading(false)
      document.title = capitalize(props.category) + " - NewsHunter"
    } catch (error) {
      console.log(error);
    }
  };

  const handleNextClick = () => {
    if(page === Math.ceil(totalResults/props.pageSize)){

    }else{
      setpage(page + 1);
    }
  };

  const handlePreviousClick = () => {
    setpage(page - 1);
  };

  return (
    <>
      <div className="container">
        <h2 className="text-center my-3">NewsHunter - Top {capitalize(props.category)} headline</h2>
        <div className="text-center">{loading && <Spinner/>}</div>
        <div className="row">
          {article.map((element) => {
            return (
              !loading && <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element["title"] ? element["title"] : ""}
                  desc={element.description ? element.description : ""}
                  url={
                    element.urlToImage?element.urlToImage:"https://neurosciencenews.com/files/2023/07/mental-test-dementia-neurosicence.jpg"
                  }
                  newsUrl={element.url ? element.url : ""}
                  author = {element.author}
                  time = {element.publishedAt}
                  source = {element.source.name}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="container d-flex justify-content-between">
        <button
          type="button"
          className="btn btn-primary"
          disabled={page === 1}
          onClick={handlePreviousClick}
        >
          &larr; Previous
        </button>
        <button
          disabled= {page === Math.ceil(totalResults/props.pageSize)}
          type="button"
          className="btn btn-primary"
          onClick={handleNextClick}
        >
          Next &rarr;
        </button>
      </div>
    </>
  );
}

News.propTypes = {
  country : PropTypes.string,
  category : PropTypes.string,
  pageSize : PropTypes.number
}

News.defaultProps = {
  country : 'in',
  category: 'general',
  pageSize : 6
}