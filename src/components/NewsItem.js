import React from "react";

export default function NewsItem(props) {
  return (
    <div className="card mx-4 my-4 text-center">
      <span className="position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger">
        {props.source}
      </span>
      <img src={props.url} className="card-img-top" alt="failed to load img" />
      <div className="card-body">
        <h5 className="card-title">{props.title.slice(0, 45)}...</h5>
        <p className="card-text">{props.desc.slice(0, 90)}...</p>
        <a
          href={props.newsUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-sm btn-primary text-center"
        >
          Check this out
        </a>
        <div className="text-body-secondary">
          By {props.author ? props.author : "Unknown"} on{" "}
          {new Date(props.time).toGMTString()}
        </div>
      </div>
    </div>
  );
}
