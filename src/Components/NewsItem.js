import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="my-3">
        <div className="card" >
          <img
            src={
              imageUrl
                ? imageUrl
                : "https://cdn.pixabay.com/photo/2015/02/15/09/33/news-636978_960_720.jpg"
            }
            className="card-img-top"
            alt="{title}"
            style={{ width: 'auto', height: '180px' }}
          />
          <div className="card-body">
            <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{ left: '90%', zIndex: '1' }}>
              {source}
              <span className="visually-hidden">unread messages</span>
            </span>
            <h5 className="card-title">{title.length > 60 ? title.slice(0, 60) : title}...</h5>
            <p className="card-text">
              {description ? description.slice(0, 88) : ""}...
            </p>
            <p class="card-text"><small class="text-muted">By {author ? author : 'Unknown'} on {new Date(date).toGMTString()}</small></p>
            <a
              href={newsUrl}
              rel="noreferrer"
              target="_blank"
              className="btn btn-sm btn-dark"
            >
              Read More
            </a>
          </div>
        </div>
      </div >
    );
  }
}

export default NewsItem;
