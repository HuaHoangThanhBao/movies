import './skeleton.scss'

interface SkeletonProps {
  height?: number | string
  width?: number | string
}

export const Skeleton = ({ height, width }: SkeletonProps) => {
  return <span className='skeleton' style={{ height, width }}></span>
}
