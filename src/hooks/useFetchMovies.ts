import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../app/store'
import { getMovieDetail, getMovieNowPlayingList, getMovieSearchList, getMovieTopRatedList } from '../components/MovieItem/Movie.slice'
import { MovieCategory } from '../types/movie'
import { useShowErrorMessage } from './useShowErrorMessage'

interface useFetchMoviesProps {
  callBack: () => void
}

export const useFetchMovies = ({ callBack }: useFetchMoviesProps) => {
  const searchValue = useSelector((state: RootState) => state.movie.searchValue)
  const dispatch = useAppDispatch()

  const refreshMovieList = (movieType = MovieCategory.NOW_PLAYING, page = 1, id: string = '') => {
    let promise
    switch (movieType) {
        case MovieCategory.TOP_RATED:
            promise = dispatch(getMovieTopRatedList({ page, responseCallBack: callBack }))
            break;
        case MovieCategory.SEARCH:
            promise = dispatch(getMovieSearchList({ searchValue, page, responseCallBack: callBack }))
            break;
        case MovieCategory.DETAIL:
            promise = dispatch(getMovieDetail({ id }))
            break;
        case MovieCategory.NOW_PLAYING:
        default:
            promise = dispatch(getMovieNowPlayingList({ page, responseCallBack: callBack }))
            break;
    }
    promise?.unwrap().catch((error) => {
        console.log('rejected', error)
        handleShowMessage()
      })
    return promise
  }

  const { renderErrorMessage, handleShowMessage } = useShowErrorMessage({ refreshCallback: refreshMovieList })
  return { refreshMovieList, renderErrorMessage }
}
