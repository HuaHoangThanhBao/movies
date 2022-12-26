import { LazyLoadImage } from 'react-lazy-load-image-component'
import { imagePrefixUrl } from '../../constants/url'
import { Movie } from '../../types/movie'
import './movieImage.scss'

interface MovieImageProps {
  movie: Movie
}

const MovieImage = ({ movie }: MovieImageProps) => {
  return (
    <div className='movie-image'>
      {' '}
      <span className='play'>
        <span className='name'>{movie.original_title}</span>
      </span>{' '}
      <a>
        <LazyLoadImage src={`${imagePrefixUrl}${movie.poster_path}`} alt='' />
      </a>{' '}
    </div>
  )
}

export default MovieImage
