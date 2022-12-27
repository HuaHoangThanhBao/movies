import { configureStore, ThunkAction, Action, combineReducers, PreloadedState } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import movieReducer from '../components/MovieItem/Movie.slice';

export const store = configureStore({
  reducer: {
    movie: movieReducer,
  },
});

/*Set up for uni test*/
const rootReducer = combineReducers({
  movie: movieReducer,
})

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState
  })
}
/*Set up for uni test*/

export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type RootState = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
