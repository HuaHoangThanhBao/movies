import { NavLink, useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../app/store'
import { useFetchMovies } from '../../hooks/useFetchMovies'
import { MovieCategory } from '../../types/movie'
import { setCategorySelection } from '../MovieItem/Movie.slice'
import { Search } from '../Search'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import Logo from '../../dist/images/logo.png'
import './header.scss'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { refreshMovieList, renderErrorMessage } = useFetchMovies({ callBack: () => {} })

  const loadTopPlayingList = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate('/')
    dispatch(setCategorySelection(MovieCategory.NOW_PLAYING))
    refreshMovieList(MovieCategory.NOW_PLAYING)
  }

  const loadTopRatedList = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate('/')
    dispatch(setCategorySelection(MovieCategory.TOP_RATED))
    refreshMovieList(MovieCategory.TOP_RATED)
  }

  return (
    <div id='header'>
      <NavLink to='/' end>
        <h1 id='logo'>
          <LazyLoadImage src={Logo} alt='' delayTime={1000} />
        </h1>
      </NavLink>
      <div id='navigation'>
        <ul>
          <li>
            <NavLink className='active' to={'/'} end>
              HOME
            </NavLink>
          </li>
        </ul>
      </div>
      <div id='sub-navigation'>
        <ul>
          <li>
            <a onClick={loadTopPlayingList} href='!#'>
              NOW PLAYING
            </a>
          </li>
          <li>
            <a onClick={loadTopRatedList} href='!#'>
              TOP RATED
            </a>
          </li>
        </ul>
        <Search />
      </div>
      {renderErrorMessage()}
    </div>
  )
}

export default Header
