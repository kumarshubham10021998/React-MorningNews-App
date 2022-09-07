import React, { Component } from 'react'
import moment from "moment";
export class NewsItem extends Component {

    render() {
        let { title, description, imageurl, Newsurl, author, date, source } = this.props;
        return (
            <div className='my-2'>
                <div className="card">
                    <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:"80%",zIndex:'1'}}>
                        {source}

                    </span>
                    <img src={!imageurl ? "https://m.economictimes.com/thumb/msid-89603946,width-1273,height-725,resizemode-4,imgsize-134350/fewer-china-flights-may-worsen-chip-shortage-with-port-snarled-.jpg" : imageurl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5>
                        <p className="card-text">{description}...</p>
                        {/* <p className='card-text'><small className='text-muted'>By {!author?"Unknow":author} on {date}</small></p> */}
                        <p className='card-text'><small className='text-muted'>By {!author ? "Unknow" : author} on  {moment(date).format(
                            " MMMM Do YYYY"
                        )}</small></p>

                        <a rel="noreferrer" href={Newsurl} target="_blank" className="btn btm-sm btn-outline-success">Read More</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
