import React, { Suspense } from 'react'
import { Movie } from '../../types/movie'
import { Skeleton } from '../Skeleton'
import { Rating } from '../Rating'
import './movie.scss'

const MovieImage = React.lazy(() => import('../MovieImage'))

interface MovieItemProps {
  movie: Movie
}

const MovieItem = ({ movie }: MovieItemProps) => {
  return (
    <div className='movie'>
      <Suspense fallback={<Skeleton />}>
        <MovieImage movie={movie} />
      </Suspense>
      <h3 className='movie-title'>{movie.original_title}</h3>
      <h4 className='movie-date'>({new Date(movie.release_date).getFullYear()})</h4>
      <div className='rating'>
        <p>RATING</p>
        <Rating movie={movie} />
      </div>
    </div>
  )
}

export default MovieItem
