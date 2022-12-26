export interface Movie {
  id: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  vote_average: number
}

export enum MovieCategory {
  NOW_PLAYING = 'NOW_PLAYING',
  TOP_RATED = 'TOP_RATED',
  SEARCH = 'SEARCH'
}

export enum MovieView {
    LIST = 'LIST',
    GRID = 'GRID'
  }
