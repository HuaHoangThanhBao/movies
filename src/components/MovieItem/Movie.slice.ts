import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Movie, MovieCategory } from '../../types/movie'
import { FulfilledAction, PendingAction, RejectedAction } from '../../types/thunk'
import { http } from '../../utils/http'

export interface MovieState {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

interface MovieRequestState {
  searchValue: string
  categorySelection: MovieCategory
  loading: boolean
  currentRequestId: undefined | string
}

const initialState: MovieState & MovieRequestState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
  loading: false,
  currentRequestId: '',
  categorySelection: MovieCategory.NOW_PLAYING,
  searchValue: ''
}

export const getMovieNowPlayingList = createAsyncThunk(
  'movie/getMovieNowPlayingList',
  async ({ page = 1, responseCallBack }: { page: number, responseCallBack: () => void }, thunkAPI) => {
    const response = await http.get<MovieState>(`movie/now_playing?page=${page}`, {
      signal: thunkAPI.signal
    })
    console.log('response.data:', response.data)
    responseCallBack()
    return response.data
  }
)

export const getMovieTopRatedList = createAsyncThunk(
  'movie/getMovieTopRatedList',
  async ({ page = 1, responseCallBack }: { page: number, responseCallBack: () => void }, thunkAPI) => {
    const response = await http.get<MovieState>(`movie/top_rated?page=${page}`, {
      signal: thunkAPI.signal
    })
    responseCallBack()
    return response.data
  }
)

export const getMovieSearchList = createAsyncThunk(
  'movie/getMovieSearchList',
  async ({ searchValue, page = 1, responseCallBack }: { searchValue: string; page: number, responseCallBack: () => void }, thunkAPI) => {
    const response = await http.get<MovieState>(`/search/movie?query=${searchValue}&page=${page}`, {
      signal: thunkAPI.signal
    })
    responseCallBack()
    return response.data
  }
)

const movieSlice = createSlice({
  name: 'drag',
  initialState,
  reducers: {
    setCategorySelection: (state, action: PayloadAction<MovieCategory>) => {
      state.categorySelection = action.payload
    },
    setMovieSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload
    }
  },
  extraReducers(builder) {
    builder
      .addCase(getMovieNowPlayingList.fulfilled, (state, action) => {
        state.page = action.payload.page
        state.total_pages = action.payload.total_pages
        state.total_results = action.payload.total_results
        state.results = action.payload.results
      })
      .addCase(getMovieTopRatedList.fulfilled, (state, action) => {
        state.page = action.payload.page
        state.total_pages = action.payload.total_pages
        state.total_results = action.payload.total_results
        state.results = action.payload.results
      })
      .addCase(getMovieSearchList.fulfilled, (state, action) => {
        state.page = action.payload.page
        state.total_pages = action.payload.total_pages
        state.total_results = action.payload.total_results
        state.results = action.payload.results
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith('/pending'),
        (state, action) => {
          state.loading = true
          state.currentRequestId = action.meta.requestId
        }
      )
      .addMatcher<RejectedAction | FulfilledAction>(
        (action) => action.type.endsWith('/rejected') || action.type.endsWith('/fulfilled'),
        (state, action) => {
          if (state.loading && state.currentRequestId === action.meta.requestId) {
            state.loading = false
            state.currentRequestId = undefined
          }
        }
      )
  }
})

export const { setCategorySelection, setMovieSearchValue } = movieSlice.actions
const movieReducer = movieSlice.reducer

export default movieReducer
