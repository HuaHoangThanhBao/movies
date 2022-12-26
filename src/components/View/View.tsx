import GridViewIcon from '@mui/icons-material/GridView'
import ListIcon from '@mui/icons-material/List'
import { MovieView } from '../../types/movie'
import './view.scss'

interface ViewProps {
  viewType: MovieView
  setViewType: (viewType: MovieView) => void
}

export const View = ({ viewType, setViewType }: ViewProps) => {
  return (
    <div className='view'>
      <button
        className={`view-btn ${viewType === MovieView.LIST ? 'active' : ''}`}
        onClick={() => setViewType(MovieView.LIST)}
      >
        <ListIcon /> List
      </button>
      <button
        className={`view-btn ${viewType === MovieView.GRID ? 'active' : ''}`}
        onClick={() => setViewType(MovieView.GRID)}
      >
        <GridViewIcon /> Grid
      </button>
    </div>
  )
}
