import { NavLink } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { imagePrefixUrl } from '../../constants/url'
import { Movie } from '../../types/movie'
import './movieImage.scss'

interface MovieImageProps {
  movie: Movie
}

const MovieImage = ({ movie }: MovieImageProps) => {
  return (
    <NavLink to={`/detail/${movie.id}`} end>
      <div className='movie-image'>
        {' '}
        <span className='play'>
          <span className='name'>{movie.original_title}</span>
        </span>{' '}
        <LazyLoadImage src={`${imagePrefixUrl}${movie.poster_path}`} alt='No image found' delayTime={1000} />
      </div>
    </NavLink>
  )
}

export default MovieImage
