import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { RootState } from '../../app/store'
import { imagePrefixUrl } from '../../constants/url'
import { useEffectOnce } from '../../hooks/useEffectOnce'
import { Genre, MovieCategory } from '../../types/movie'
import { Rating } from '../Rating'
import { Skeleton } from '../Skeleton'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import './movieDetail.scss'
import { useFetchMovies } from '../../hooks/useFetchMovies'

const MovieDetail = () => {
  const params = useParams()
  const { id } = params
  const { refreshMovieList, renderErrorMessage } = useFetchMovies({ callBack: () => {} })
  const movieDetail = useSelector((state: RootState) => state.movie.movie)

  useEffectOnce(() => {
    const promise = refreshMovieList(MovieCategory.DETAIL, 1, id)
    return () => {
      promise.abort()
    }
  })

  return (
    <div className='movie-detail'>
      <div className='movie-detail-image'>
        {!movieDetail.id && <Skeleton height={280} width={'100%'} />}
        {movieDetail.id && (
          <LazyLoadImage
            src={`${imagePrefixUrl}${movieDetail?.belongs_to_collection?.poster_path || movieDetail?.backdrop_path}`}
            alt='No image found'
            delayTime={1000}
          />
        )}
      </div>
      <div className='movie-detail-content'>
        <h3 className='movie-detail-title'>
          {!movieDetail.id && <Skeleton height={33} width={'100%'} />}
          {movieDetail.original_title && (
            <>
              {movieDetail.original_title}
              <span>({new Date(movieDetail.release_date).getFullYear()})</span>
            </>
          )}
        </h3>
        <div className='movie-detail-rating'>
          {!movieDetail.id && <Skeleton height={33} width={'100%'} />}
          {movieDetail.vote_average && movieDetail.vote_average !== -1 && (
            <>
              <Rating movie={movieDetail} />
              <span>{movieDetail.vote_average} /10</span>
            </>
          )}
          {!movieDetail.id && <Skeleton height={33} width={'100%'} />}
          {movieDetail.vote_count && movieDetail.vote_count !== -1 && <p>{movieDetail.vote_count} Reviews</p>}
        </div>
        <div className='movie-detail-description'>
          {!movieDetail.id && <Skeleton height={50} width={'100%'} />}
          {movieDetail.overview && <p>{movieDetail.overview}</p>}
        </div>
        <div className='movie-detail-info'>
          {!movieDetail.id && <Skeleton height={33} width={'100%'} />}
          {movieDetail.id && (
            <>
              <span>Genres:</span>
              {movieDetail.genres.map((genre: Genre, index: number) => (
                <span key={index}>
                  {genre.name}
                  {index !== movieDetail.genres.length - 1 ? ' - ' : ''}
                </span>
              ))}
            </>
          )}
        </div>
      </div>
      {renderErrorMessage()}
    </div>
  )
}

export default MovieDetail
