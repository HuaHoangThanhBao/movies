import './App.scss'
import { Header } from './components/Header/Header'
// import { MovieHead } from './components/MovieHead'
import { MovieList } from './components/MovieList/MovieList'
import CircularProgress from '@mui/material/CircularProgress'
import { useRef, useState } from 'react'
import { usePullToReuqest } from './hooks/usePullToRequest'
import { MovieView } from './types/movie'
import { View } from './components/View'

function App() {
  const [viewType, setViewType] = useState(MovieView.GRID)
  const refreshCont = useRef<HTMLDivElement>(null)
  const { pullChange, isShowLoadingEffect, renderErrorMessage } = usePullToReuqest({ refreshCont })

  return (
    <div className='app'>
      <Header />
      <div id='main'>
        <View viewType={viewType} setViewType={setViewType} />
        <div className='content' ref={refreshCont} style={{ marginTop: pullChange / 3.118 || '' }}>
          {/* <MovieHead /> */}
          {isShowLoadingEffect && (
            <CircularProgress style={{ display: 'block', margin: '0 auto', marginTop: '15px' }} />
          )}
          <MovieList viewType={viewType} />
        </div>
      </div>
      {renderErrorMessage()}
    </div>
  )
}

export default App
