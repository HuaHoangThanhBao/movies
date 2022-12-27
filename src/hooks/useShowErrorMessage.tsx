import { useState } from 'react'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Button from '@mui/material/Button'

interface useShowErrorMessageProps {
  refreshCallback: () => void
}

export const useShowErrorMessage = ({ refreshCallback }: useShowErrorMessageProps) => {
  const [open, setOpen] = useState(false)

  const handleShowMessage = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleRefresh = () => {
    refreshCallback()
    setOpen(false)
  }

  const renderErrorMessage = () => (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{'Network Error'}</DialogTitle>
      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          Something is temporarily wrong with your connection. Please make sure you are connected to the internet and
          then refresh your movie list by pulling down or just hit the refresh button.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Close</Button>
        <Button onClick={handleRefresh}>Refresh</Button>
      </DialogActions>
    </Dialog>
  )

  return { renderErrorMessage, handleShowMessage }
}
