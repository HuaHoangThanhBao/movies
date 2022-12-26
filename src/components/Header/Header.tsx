import { useAppDispatch } from '../../app/store'
import { useFetchMovies } from '../../hooks/useFetchMovies'
import { MovieCategory } from '../../types/movie'
import { setCategorySelection } from '../MovieItem/Movie.slice'
import { Search } from '../Search'
import { Social } from '../Social/Social'
import './header.scss'

export const Header = () => {
  const dispatch = useAppDispatch()
  const { refreshMovieList } = useFetchMovies({ callBack: () => {} })

  const loadTopPlayingList = () => {
    dispatch(setCategorySelection(MovieCategory.NOW_PLAYING))
    refreshMovieList(MovieCategory.NOW_PLAYING)
  }

  const loadTopRatedList = () => {
    dispatch(setCategorySelection(MovieCategory.TOP_RATED))
    refreshMovieList(MovieCategory.TOP_RATED)
  }

  return (
    <div id='header'>
      <h1 id='logo'>
        <a href='#'>MovieHunter</a>
      </h1>
      <Social />
      <div id='navigation'>
        <ul>
          <li>
            <a className='active' href='#'>
              HOME
            </a>
          </li>
        </ul>
      </div>
      <div id='sub-navigation'>
        <ul>
          <li>
            <a onClick={loadTopPlayingList}>NOW PLAYING</a>
          </li>
          <li>
            <a onClick={loadTopRatedList}>TOP RATED</a>
          </li>
        </ul>
        <Search />
      </div>
    </div>
  )
}
