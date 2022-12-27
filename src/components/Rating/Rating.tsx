import { Movie } from '../../types/movie'
import './rating.scss'

interface MovieItemProps {
  movie: Movie
}

export const Rating = ({ movie }: MovieItemProps) => {
  const calculateStar = () => {
    const max = 10
    const range = max - movie.vote_average
    if (range <= 2) {
      return Array.from(Array(5).keys()).map((item) => <div key={item} className='star'></div>)
    } else if (range > 2 && range <= 4) {
      return Array.from(Array(4).keys()).map((item) => <div key={item} className='star'></div>)
    } else if (range > 4 && range <= 6) {
      return Array.from(Array(3).keys()).map((item) => <div key={item} className='star'></div>)
    } else if (range > 6 && range <= 8) {
      return Array.from(Array(2).keys()).map((item) => <div key={item} className='star'></div>)
    } else return <div className='star'></div>
  }
  return <div className='stars'>{calculateStar()}</div>
}
