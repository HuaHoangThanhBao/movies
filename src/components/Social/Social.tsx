import './social.scss'

export const Social = () => {
  return (
    <div className='social'>
      {' '}
      <span>FOLLOW US ON:</span>
      <ul>
        <li>
          <a className='twitter' href='#'>
            twitter
          </a>
        </li>
        <li>
          <a className='facebook' href='#'>
            facebook
          </a>
        </li>
        <li>
          <a className='vimeo' href='#'>
            vimeo
          </a>
        </li>
        <li>
          <a className='rss' href='#'>
            rss
          </a>
        </li>
      </ul>
    </div>
  )
}
