import { Suspense, useRef, useState } from 'react'
import { usePullToReuqest } from './hooks/usePullToRequest'
import { MovieView } from './types/movie'
import { useRoutes } from 'react-router-dom'
import { useFetchMovies } from './hooks/useFetchMovies'
import { useEffectOnce } from './hooks/useEffectOnce'
import './App.scss'
import React from 'react'

const Header = React.lazy(() => import('./components/Header/Header'))
const MovieTab = React.lazy(() => import('./components/MovieTab/MovieTab'))
const MovieDetail = React.lazy(() => import('./components/MovieDetail'))

function App() {
  const [viewType, setViewType] = useState(MovieView.GRID)
  const refreshCont = useRef<HTMLDivElement>(null)
  const {
    pullChange,
    isShowLoadingEffect,
    renderErrorMessage: renderErrorMessageWhenPulling
  } = usePullToReuqest({ refreshCont })
  const { refreshMovieList, renderErrorMessage } = useFetchMovies({ callBack: () => {} })

  useEffectOnce(() => {
    const promise = refreshMovieList()
    return () => {
      promise.abort()
    }
  })

  const elements = useRoutes([
    {
      path: '/',
      element: (
        <Suspense fallback=''>
          <MovieTab
            viewType={viewType}
            setViewType={setViewType}
            pullChange={pullChange}
            isShowLoadingEffect={isShowLoadingEffect}
            refreshCont={refreshCont}
          />
        </Suspense>
      )
    },
    {
      path: '/detail/:id',
      element: (
        <Suspense fallback=''>
          <MovieDetail />
        </Suspense>
      )
    }
  ])

  return (
    <div className='app'>
      <Suspense fallback=''>
        <Header />
      </Suspense>
      <div id='main'>{elements}</div>
      {renderErrorMessage()}
      {renderErrorMessageWhenPulling()}
    </div>
  )
}

export default App
