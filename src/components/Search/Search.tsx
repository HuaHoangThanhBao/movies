import { useRef } from 'react'
import { useAppDispatch } from '../../app/store'
import { MovieCategory } from '../../types/movie'
import { getMovieSearchList, setCategorySelection, setMovieSearchValue } from '../MovieItem/Movie.slice'
import './search.scss'

export const Search = () => {
  const searchValue = useRef('')
  const dispatch = useAppDispatch()

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchValue.current = e.target.value
    dispatch(setMovieSearchValue(searchValue.current))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(setCategorySelection(MovieCategory.SEARCH))
    dispatch(getMovieSearchList({ searchValue: searchValue.current, page: 1, responseCallBack: () => {} }))
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
    </div>
  )
}
