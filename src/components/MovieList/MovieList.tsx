import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { useEffectOnce } from '../../hooks/useEffectOnce'
import { useFetchMovies } from '../../hooks/useFetchMovies'
import { Movie, MovieView } from '../../types/movie'
import { MovieItem } from '../MovieItem'
import { Paginations } from '../Pagination'
import { Skeleton } from '../Skeleton'
import './movieList.scss'

interface MovieListProps {
  viewType: MovieView
}

export const MovieList = ({ viewType }: MovieListProps) => {
  const movie = useSelector((state: RootState) => state.movie)
  const { refreshMovieList, renderErrorMessage } = useFetchMovies({ callBack: () => {} })

  useEffectOnce(() => {
    refreshMovieList()
  })

  return (
    <>
      <div className={`movie-list ${viewType.toLowerCase()}`}>
        {Object.keys(movie.results).length === 0 && Array.from(Array(20).keys()).map((item) => <Skeleton key={item} />)}
        {Object.keys(movie.results).length !== 0 &&
          movie.results.map((movie: Movie) => <MovieItem key={movie.id} movie={movie} />)}
        {renderErrorMessage()}
      </div>
      <Paginations movie={movie} refreshMovieList={refreshMovieList} />
    </>
  )
}
