import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import { MovieCategory } from '../../types/movie'
import { MovieState } from '../MovieItem/Movie.slice'
import Pagination from '@mui/material/Pagination'
import './pagination.scss'

interface PaginationProps {
  movie: MovieState
  refreshMovieList: (movieType: MovieCategory, page: number) => void
}

export const Paginations = ({ movie, refreshMovieList }: PaginationProps) => {
  const movieType = useSelector((state: RootState) => state.movie.categorySelection)
  const page = useSelector((state: RootState) => state.movie.page)

  const handleChange = (event, value: number) => {
    refreshMovieList(movieType, value)
  }

  return (
    <div className='pagination'>
      <Pagination count={movie.total_pages} page={page} onChange={handleChange} />
    </div>
  )
}
