import React from 'react'
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, useMediaQuery} from '@mui/material'

const ReusableDialog = ({open = false, onClose = () => {}, title = '', children, actions = [], size = false}) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={size}
      fullWidth={!isMobile}
      fullScreen={isMobile}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {actions.length
          ? actions.map((action, index) => (
              <Button key={index} onClick={action.onClick} color={action.color} variant={action.variant}>
                {action.label}
              </Button>
            ))
          : null}
      </DialogActions>
    </Dialog>
  )
}

export default ReusableDialog
