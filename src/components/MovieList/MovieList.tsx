import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { useFetchMovies } from '../../hooks/useFetchMovies'
import { Movie, MovieView } from '../../types/movie'
// import { MovieItem } from '../MovieItem'
// import { Paginations } from '../Pagination'
import { Skeleton } from '../Skeleton'
import './movieList.scss'

const MovieItem = React.lazy(() => import('../MovieItem'))
const Paginations = React.lazy(() => import('../Pagination'))

interface MovieListProps {
  viewType: MovieView
}

export const MovieList = ({ viewType }: MovieListProps) => {
  const movie = useSelector((state: RootState) => state.movie)
  const { refreshMovieList } = useFetchMovies({ callBack: () => {} })

  return (
    <>
      <div className={`movie-list ${viewType.toLowerCase()}`}>
        {Object.keys(movie.results).length === 0 && Array.from(Array(20).keys()).map((item) => <Skeleton key={item} />)}
        {Object.keys(movie.results).length !== 0 &&
          movie.results.map((movie: Movie) => (
            <Suspense fallback={<Skeleton />} key={movie.id}>
              <MovieItem movie={movie} />
            </Suspense>
          ))}
      </div>
      <Suspense fallback={<Skeleton />}>
        <Paginations movie={movie} refreshMovieList={refreshMovieList} />
      </Suspense>
    </>
  )
}
