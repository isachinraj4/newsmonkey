import React, { useState, useEffect} from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'


const News = (props) =>{
  const [articles, setarticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const capatilizedFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const updateNews =async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading({ loading: true });
    props.setProgress(20);
    let data = await fetch(url)
    props.setProgress(50);
    let parsedData = await data.json();
    setarticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  useEffect(() => {
    // setPage(page)
    updateNews()
    document.title = `${capatilizedFirstLetter(props.category)} - NewsMonkey`
  }, [])

  const handleNextClick = async () => {
    setPage(page + 1 )
    updateNews()
  }


  const handlePrevClick = async () => {
    setPage(page - 1 )
    updateNews()
  }

    return (
      <div className='container my-3'>
        <h1 className='text-center' style={{margin: '30px 0px', marginTop:'90px'}}> This is NewsMonkey - Top {capatilizedFirstLetter(props.category)} headlines</h1>
        {loading && <Spinner />}
        <div className="row">
          {!loading && articles && articles.map((elements) => {
            return <div className="col-md-4" key={elements.url}>
              <NewsItem title={elements.title ? elements.title : ""}
                description={elements.description ? elements.description : ""}
                imageUrl={elements.urlToImage} newsUrl={elements.url} author={elements.author} date={elements.publishedAt} source={elements.source.name} />
            </div>
          })}
        </div>
        <div className="container d-flex justify-content-between">
          <button disabled={page <= 1 ? true : false} type="button" className="btn btn-dark" onClick={handlePrevClick}>&larr; Previous</button>
          <button disabled={(page + 1) > Math.ceil(totalResults / props.pageSize)} type="button" className="btn btn-dark" onClick={handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    )
  
}

News.defaultProps = {
  country: 'in',
  pageSize: '7',
  category: 'general'
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
}

export default News
