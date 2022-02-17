import React, { Component } from 'react'

export class NewsItem extends Component {
    
    render() {
        let{title,description,imageurl,Newsurl} = this.props;
        return (
            <div className='my-2'>
                <div className="card">
                    <img src={!imageurl?"https://m.economictimes.com/thumb/msid-89603946,width-1273,height-725,resizemode-4,imgsize-134350/fewer-china-flights-may-worsen-chip-shortage-with-port-snarled-.jpg":imageurl} className="card-img-top" alt="..."/>
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <a rel="noreferrer" href={Newsurl} target="_blank" className="btn btm-sm btn-dark">Read More</a>
                        </div>
                </div>
            </div>
        )
    }
}

export default NewsItem
