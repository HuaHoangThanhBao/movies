import React, { Suspense } from 'react'
import { Movie } from '../../types/movie'
import { Skeleton } from '../Skeleton'
import { Rating } from '../Rating'
import './movie.scss'
import { NavLink } from 'react-router-dom'

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
      <NavLink to={`/detail/${movie.id}`}>
        <h3 className='movie-title'>{movie.original_title}</h3>
      </NavLink>
      <h4 className='movie-date'>({new Date(movie.release_date).getFullYear()})</h4>
      <div className='rating'>
        <p>RATING</p>
        <Rating movie={movie} />
      </div>
    </div>
  )
}

export default MovieItem
