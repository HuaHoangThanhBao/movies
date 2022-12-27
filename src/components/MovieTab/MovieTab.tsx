import CircularProgress from '@mui/material/CircularProgress'
import { MovieView } from '../../types/movie'
import { MovieList } from '../MovieList'
import { View } from '../View'

interface MovieTabProps {
  viewType: MovieView
  setViewType: (viewType: MovieView) => void
  refreshCont: React.RefObject<HTMLDivElement>
  pullChange: number
  isShowLoadingEffect: boolean
}

const MovieTab = ({ viewType, setViewType, refreshCont, pullChange, isShowLoadingEffect }: MovieTabProps) => {
  return (
    <>
      <View viewType={viewType} setViewType={setViewType} />
      <div className='content' ref={refreshCont} style={{ marginTop: pullChange / 3.118 || '' }}>
        {/* <MovieHead /> */}
        {isShowLoadingEffect && <CircularProgress style={{ display: 'block', margin: '0 auto', marginTop: '15px' }} />}
        <MovieList viewType={viewType} />
      </div>
    </>
  )
}

export default MovieTab
