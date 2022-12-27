import { renderHook, act, render, screen, fireEvent } from '@testing-library/react'
import { Wrapper } from '../utils/test'
import { useShowErrorMessage } from './useShowErrorMessage'

describe('useShowErrorMessage', () => {
  const refreshCallback = jest.fn()
  test('should render hook', () => {
    const { result } = renderHook(useShowErrorMessage, {
      initialProps: {
        refreshCallback
      },
      wrapper: Wrapper
    })
    expect(result).toBeDefined()
  })
  test('show message', () => {
    const { result } = renderHook(useShowErrorMessage, {
      initialProps: {
        refreshCallback
      },
      wrapper: Wrapper
    })
    act(() => result.current.handleShowMessage())
    expect(result.current.open).toBe(true)
  })
  test('close message', () => {
    const { result } = renderHook(useShowErrorMessage, {
      initialProps: {
        refreshCallback
      },
      wrapper: Wrapper
    })
    act(() => result.current.handleClose())
    expect(result.current.open).toBe(false)
    expect(refreshCallback).not.toBeCalled()
  })
  test('refresh on close', () => {
    const { result } = renderHook(useShowErrorMessage, {
      initialProps: {
        refreshCallback
      },
      wrapper: Wrapper
    })
    act(() => result.current.handleRefresh())
    expect(result.current.open).toBe(false)
    expect(refreshCallback).toBeCalled()
  })
  test('message UI & event', () => {
    const { result } = renderHook(useShowErrorMessage, {
      initialProps: {
        refreshCallback
      },
      wrapper: Wrapper
    })
    act(() => result.current.handleShowMessage())
    const TestComponent = () => {
      return result.current.renderErrorMessage()
    }
    render(
      <Wrapper>
        <TestComponent />
      </Wrapper>
    )
    expect(screen.getByTestId('alert-dialog-title')).toHaveTextContent('Network Error')
    expect(screen.getByTestId('alert-dialog-description')).toHaveTextContent(
      `Something is temporarily wrong with your connection. Please make sure you are connected to the internet and then refresh your movie list by pulling down or just hit the refresh button.`
    )
    expect(screen.getByTestId('button-close')).toBeInTheDocument()
    expect(screen.getByTestId('button-refresh')).toBeInTheDocument()

    fireEvent.click(screen.getByTestId('button-close'))
    expect(result.current.open).toBe(false)

    fireEvent.click(screen.getByTestId('button-refresh'))
    expect(result.current.open).toBe(false)
    expect(refreshCallback).toBeCalled()
  })
})
