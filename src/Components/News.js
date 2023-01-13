import React, { Component } from "react";
import NewsItem from "./NewsItem";
import API_Key from "../Config";
import Spinner from "./Spinner";
import propTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 12,
    category: 'general'
  }

  static propTypes = {
    country: propTypes.string,
    pageSize: propTypes.number,
    category: propTypes.string
  }

  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async updateNews(pageNumber = 1) {
    const url =
      `https://newsapi.org/v2/top-headlines?&category=${this.props.category}&country=${this.props.country}&apiKey=${API_Key}&page=${pageNumber}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({ articles: parsedData.articles, totalResults: parsedData.totalResults, loading: false });
  }

  async componentDidMount() {
    this.updateNews()
  }

  prevClickHandler = async () => {
    await this.setState({ page: this.state.page - 1 })
    this.updateNews(this.state.page)
  };

  nextClickHandler = async () => {
    await this.setState({ page: this.state.page + 1 })
    this.updateNews(this.state.page)
  };

  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center my-3">NewsDaily - Top Headlines</h1>

        <div className="row">
          {/* {this.state.loading && <Spinner />} */}
          {this.state.loading ? <Spinner /> : this.state.articles.map((article) => {
            return (
              <div className="col-md-3" key={article.url}>
                <NewsItem
                  title={article.title}
                  description={article.description}
                  imageUrl={article.urlToImage}
                  newsUrl={article.url}
                  author={article.author}
                  date={article.publishedAt}
                  source={article.source.name}
                />
              </div>
            );
          })}
        </div>
        <div className="container my-3 d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.prevClickHandler}
          >
            &larr; Previous
          </button>
          <button
            disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)}
            type="button"
            className="btn btn-dark"
            onClick={this.nextClickHandler}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default News;
