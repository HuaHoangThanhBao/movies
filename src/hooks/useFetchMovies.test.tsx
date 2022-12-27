import { renderHook, waitFor } from '@testing-library/react'
import { MovieCategory } from '../types/movie'
import { Wrapper } from '../utils/test'
import { useFetchMovies } from './useFetchMovies'
import { store } from '../app/store'
import mockAxios from 'jest-mock-axios'

const data = {
  dates: {
    maximum: '2022-12-25',
    minimum: '2022-11-07'
  },
  page: 1,
  results: [
    {
      adult: false,
      backdrop_path: '/s16H6tpK2utvwDtzZ8Qy4qm5Emw.jpg',
      genre_ids: [878, 12, 28],
      id: 76600,
      original_language: 'en',
      original_title: 'Avatar: The Way of Water',
      overview:
        'Set more than a decade after the events of the first film, learn the story of the Sully family (Jake, Neytiri, and their kids), the trouble that follows them, the lengths they go to keep each other safe, the battles they fight to stay alive, and the tragedies they endure.',
      popularity: 15786.883,
      poster_path: '/t6HIqrRAclMCA60NsSmeqe9RmNV.jpg',
      release_date: '2022-12-14',
      title: 'Avatar: The Way of Water',
      video: false,
      vote_average: 8,
      vote_count: 1298
    }
  ],
  total_pages: 95,
  total_results: 1885
}

describe('useFetchMovie', () => {
  const callBack = jest.fn()
  afterEach(() => {
    jest.clearAllMocks()
  })
  test('should render hook', () => {
    const { result } = renderHook(useFetchMovies, {
      initialProps: {
        callBack
      },
      wrapper: Wrapper
    })
    expect(result).toBeDefined()
  })
  test('get movie now playing list', async () => {
    mockAxios.get.mockResolvedValue({
      data
    })
    const { result } = renderHook(useFetchMovies, {
      initialProps: {
        callBack
      },
      wrapper: Wrapper
    })
    await waitFor(async () => await result.current.refreshMovieList(MovieCategory.NOW_PLAYING, 1))
    expect(store.getState().movie.results).toEqual(data.results)
    expect(callBack).toHaveBeenCalled()
  })
  test('get movie top rated list', async () => {
    mockAxios.get.mockResolvedValue({
      data
    })
    const { result } = renderHook(useFetchMovies, {
      initialProps: {
        callBack
      },
      wrapper: Wrapper
    })
    await waitFor(async () => await result.current.refreshMovieList(MovieCategory.TOP_RATED, 1))
    expect(store.getState().movie.results).toEqual(data.results)
    expect(callBack).toHaveBeenCalled()
  })
  test('get movie search list', async () => {
    mockAxios.get.mockResolvedValue({
      data
    })
    const { result } = renderHook(useFetchMovies, {
      initialProps: {
        callBack
      },
      wrapper: Wrapper
    })
    await waitFor(async () => await result.current.refreshMovieList(MovieCategory.SEARCH))
    expect(store.getState().movie.results.length).toBeGreaterThan(0)
    expect(store.getState().movie.results).toEqual(data.results)
    expect(callBack).toHaveBeenCalled()
  })
  test('get movie detail', async () => {
    const detail = {
      data: { ...data.results[0] }
    }
    mockAxios.get.mockResolvedValue({
      ...detail
    })
    const { result } = renderHook(useFetchMovies, {
      initialProps: {
        callBack
      },
      wrapper: Wrapper
    })
    await waitFor(async () => await result.current.refreshMovieList(MovieCategory.DETAIL, 1, '1'))
    expect(store.getState().movie.movie).toEqual(detail.data)
    expect(callBack).not.toHaveBeenCalled()
  })
})
