import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { useFetchMovies } from './useFetchMovies'

interface usePullToReuqestProps {
  refreshCont: React.RefObject<HTMLDivElement>
}

export const usePullToReuqest = ({ refreshCont }: usePullToReuqestProps) => {
  const [onMouseDown, setOnMouseDown] = useState(false)
  const [startPoint, setStartPoint] = useState(0)
  const [pullChange, setPullChange] = useState(0)
  const [isShowLoadingEffect, setIsShowLoadingEffect] = useState(false)
  const categorySelection = useSelector((state: RootState) => state.movie.categorySelection)

  const pullStart = (e) => {
    const { pageY } = e
    setOnMouseDown(true)
    setStartPoint(pageY)
  }

  const pull = (e) => {
    if (!onMouseDown) return
    const touch = e
    const { pageY } = touch
    let pullLength = startPoint < pageY ? Math.abs(pageY - startPoint) : 0
    setPullChange(pullLength)
    // console.log({ pageY, startPoint, pullLength, pullChange })
    if (pullChange > 200) {
      setIsShowLoadingEffect(true)
    }
  }

  const endPull = (e) => {
    setOnMouseDown(false)
    setStartPoint(0)
    setPullChange(0)
    if(!onMouseDown || pullChange <= 0) {
        return
    }
    initLoading()
  }

  const disableLoading = () => {
    console.log('end loading effect...')
    setIsShowLoadingEffect(false)
  }

  const initLoading = () => {
    if (refreshCont.current) {
      setTimeout(() => {
        console.log('start loading effect....')
        refreshMovieList(categorySelection)
      }, 1000)
    }
  }

  useEffect(() => {
    window.addEventListener('mousedown', pullStart)
    window.addEventListener('mousemove', pull)
    window.addEventListener('mouseup', endPull)
    return () => {
      window.removeEventListener('mousedown', pullStart)
      window.removeEventListener('mousemove', pull)
      window.removeEventListener('mouseup', endPull)
    }
  })

  const { refreshMovieList, renderErrorMessage } = useFetchMovies({ callBack: disableLoading })
  return { pullChange, isShowLoadingEffect, renderErrorMessage }
}
