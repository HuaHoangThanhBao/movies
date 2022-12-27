import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { useFetchMovies } from './useFetchMovies'

interface usePullToReuqestProps {
  refreshCont: React.RefObject<HTMLDivElement>
}

export const usePullToReuqest = ({ refreshCont }: usePullToReuqestProps) => {
  const location = useLocation();
  const onMouseDown = useRef(false)
  const startPoint = useRef(0)
  const allowToRefresh = useRef(false)
  const [pullChange, setPullChange] = useState(0)
  const [isShowLoadingEffect, setIsShowLoadingEffect] = useState(false)
  const categorySelection = useSelector((state: RootState) => state.movie.categorySelection)

  const pullStart = (e: MouseEvent) => {
    const { pageY } = e
    onMouseDown.current = true
    startPoint.current = pageY
  }

  const pull = (e: MouseEvent) => {
    if (!onMouseDown.current) return
    if (location.pathname.includes('detail')) return
    const touch = e
    const { pageY } = touch
    let pullLength = startPoint.current < pageY ? Math.abs(pageY - startPoint.current) : 0
    setPullChange(pullLength)
    // console.log({ pageY, startPoint, pullLength, pullChange })
    if (pullChange > 200) {
      allowToRefresh.current = true
      setIsShowLoadingEffect(true)
    }
  }

  const reset = () => {
    allowToRefresh.current = false
    onMouseDown.current = false
    startPoint.current = 0
    setPullChange(0)
  }

  const endPull = () => {
    if(!onMouseDown.current) return
    if(pullChange <= 200 && !allowToRefresh.current) {
      reset()
      return
    }
    if (onMouseDown && !allowToRefresh.current) return
    reset()
    initLoading()
  }

  const disableLoading = () => {
    console.log('end loading effect...')
    setIsShowLoadingEffect(false)
  }

  const initLoading = () => {
    if (!refreshCont.current) return
    setTimeout(() => {
      console.log('start loading effect....')
      refreshMovieList(categorySelection)
    }, 1000)
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
