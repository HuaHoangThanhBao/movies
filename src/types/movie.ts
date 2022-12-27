export interface Genre {
  id: string,
  name: string
}

export interface Movie {
  id: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  backdrop_path: string
  release_date: string
  vote_average: number
  vote_count: number
  genres: Genre[]
  belongs_to_collection: {
    poster_path: string
  }
}

export enum MovieCategory {
  NOW_PLAYING = 'NOW_PLAYING',
  TOP_RATED = 'TOP_RATED',
  SEARCH = 'SEARCH',
  DETAIL = 'DETAIL'
}

export enum MovieView {
    LIST = 'LIST',
    GRID = 'GRID'
  }
