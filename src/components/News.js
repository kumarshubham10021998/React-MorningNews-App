import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6,
    category: "general"
  }

  static PropsTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  }


  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1

    }
  }
  async updatenews() {
    const url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8ba755303d854b8dab44605bd1b01d00&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResules: parsedData.totalResules,
      loading: false
    });
  }
  async componentDidMount() {
    console.log("cdm")
    //   let url = ` https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8ba755303d854b8dab44605bd1b01d00&page=1&pageSize=${this.props.pageSize}`;
    //   this.setState({loading:true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json()
    //   console.log(parsedData);
    //   this.setState({ articles: parsedData.articles ,
    //   totalResules:parsedData.totalResules,
    // loading:false });
    this.updatenews();
  }

  handleprevClick = async () => {
    // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8ba755303d854b8dab44605bd1b01d00&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    // this.setState({loading:true});
    // let data = await fetch(url);
    // let parsedData = await data.json()
    // console.log(parsedData);

    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parsedData.articles,
    //   loading:false
    // })
    this.setState({ page: this.state.page - 1 })
    this.updatenews();

  }

  handlenextClick = async () => {
    // if(!(this.state.page +1>Math.ceil(this.state.totalResules/this.props.pageSize))){
    //  let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8ba755303d854b8dab44605bd1b01d00&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
    //  this.setState({loading:true});
    //   let data = await fetch(url);
    //   let parsedData = await data.json()


    //   this.setState({
    //     page: this.state.page + 1,
    //     articles: parsedData.articles,
    //     loading:false
    //   })

    // }
    this.setState({ page: this.state.page + 1 })
    this.updatenews();
  }
  render() {
    return (
      <div className='container my-3'>

        <h1 className='text-center' style={{ margin: '35px 0px' }}>&#x1F305;  News-Top headlines </h1>
        {!this.state.loading && this.state.loading && <Spinner />}
        <div className="row">
          {this.state.articles?.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title} description={element.description} imageurl={element.urlToImage} Newsurl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page <= 1} type="button" className="btn btn-success" onClick={this.handleprevClick}><i className='fa fa-angle-double-left'></i></button>
          <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.state.pageSize)} type="button" className="btn btn-success" onClick={this.handlenextClick}><i className='	fa fa-angle-double-right'></i></button>
        </div>
      </div>
    )
  }
}

export default News
