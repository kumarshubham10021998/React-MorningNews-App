import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
 static defaultProps = {
    country: 'in',
     pageSize:5,
    category:"general"
   }

  static PropsTypes = {
    country: PropTypes.string,
    pageSize:PropTypes.number,
    category:PropTypes.string,
   }


  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page:1

    }
  }

  async componentDidMount() {
    console.log("cdm")
    let url = ` /top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8ba755303d854b8dab44605bd1b01d00&page=1&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);
    this.setState({ articles: parsedData.articles ,
    totalResules:parsedData.totalResules,
  loading:false });
  }

  handleprevClick = async () => {
    let url = `/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8ba755303d854b8dab44605bd1b01d00&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({loading:true});
    let data = await fetch(url);
    let parsedData = await data.json()
    console.log(parsedData);

    this.setState({
      page: this.state.page - 1,
      articles: parsedData.articles,
      loading:false
    })
  }

  handlenextClick = async () => {
    if(!(this.state.page +1>Math.ceil(this.state.totalResules/this.props.pageSize))){
     let url = `/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=8ba755303d854b8dab44605bd1b01d00&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
     this.setState({loading:true});
      let data = await fetch(url);
      let parsedData = await data.json()
      
  
      this.setState({
        page: this.state.page + 1,
        articles: parsedData.articles,
        loading:false
      })
    
    }
  }
  render() {
    return (
      <div className='container my-3'>
         
        <h1 className='text-center' style={{margin:'35px 0px'}}>&#x1F305;Morning News </h1>
        {!this.state.loading && this.state.loading &&<Spinner/>}
        <div className="row">
          {this.state.articles?.map((element) => {
            return <div className="col-md-4" key={element.url}>
              <NewsItem title={element.title} description={element.description} imageurl={element.urlToImage} Newsurl={element.url} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={this.state.page<= 1} type="button" className="btn btn-dark" onClick={this.handleprevClick}>&larr;Previous </button>
          <button disabled={this.state.page +1 > Math.ceil(this.state.totalResults/this.state.pageSize)} type="button" className="btn btn-dark" onClick={this.handlenextClick}>Next	&rarr;</button>
        </div>
      </div>
    )
  }
}

export default News
