import React, { Suspense } from 'react'
import './movie.scss'
import { Movie } from '../../types/movie'
import { Skeleton } from '../Skeleton'

const MovieImage = React.lazy(() => import('../MovieImage'))

interface MovieItemProps {
  movie: Movie
}

export const MovieItem = ({ movie }: MovieItemProps) => {
  const calculateStar = () => {
    const max = 10
    const range = max - movie.vote_average
    if (range <= 2) {
      return Array.from(Array(5).keys()).map((item) => <div key={item} className='star'></div>)
    } else if (range > 2 && range <= 4) {
      return Array.from(Array(4).keys()).map((item) => <div key={item} className='star'></div>)
    } else if (range > 4 && range <= 6) {
      return Array.from(Array(3).keys()).map((item) => <div key={item} className='star'></div>)
    } else if (range > 6 && range <= 8) {
      return Array.from(Array(2).keys()).map((item) => <div key={item} className='star'></div>)
    } else return <div className='star'></div>
  }

  return (
    <div className='movie'>
      <Suspense fallback={<Skeleton />}>
        <MovieImage movie={movie} />
      </Suspense>
      <h3 className='movie-title'>{movie.original_title}</h3>
      <h4 className='movie-date'>({new Date(movie.release_date).getFullYear()})</h4>
      <div className='rating'>
        <p>RATING</p>
        <div className='stars'>{calculateStar()}</div>
        {/* <span className='comments'>12</span> */}
      </div>
    </div>
  )
}
