import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { useAppDispatch } from '../../app/store'
import { MovieCategory } from '../../types/movie'
import { setCategorySelection, setMovieSearchValue } from '../MovieItem/Movie.slice'
import { useFetchMovies } from '../../hooks/useFetchMovies'
import './search.scss'

export const Search = () => {
  const searchValue = useRef('')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { refreshMovieList, renderErrorMessage } = useFetchMovies({ callBack: () => {} })

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchValue.current = e.target.value
    dispatch(setMovieSearchValue(searchValue.current))
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    navigate('/')
    dispatch(setCategorySelection(MovieCategory.SEARCH))
    refreshMovieList(MovieCategory.SEARCH, 1)
    searchValue.current = ''
  }

  return (
    <div id='search' className='search'>
      <form onSubmit={onSubmit} method='get' acceptCharset='utf-8'>
        <label htmlFor='search-field'>SEARCH</label>
        <input
          type='text'
          name='search field'
          placeholder='Enter search here'
          id='search-field'
          className='blink search-field'
          value={searchValue.current}
          onChange={onchange}
        />
        <input type='submit' value='GO!' className='search-button' />
      </form>
      {renderErrorMessage()}
    </div>
  )
}
