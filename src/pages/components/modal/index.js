import React from 'react'
import {Dialog, DialogTitle, DialogContent, DialogActions, Button, useMediaQuery} from '@mui/material'

const ReusableDialog = ({open = false, onClose = () => {}, title = '', children, actions = []}) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth={!isMobile}
      sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {actions.length &&
          actions.map((action, index) => (
            <Button key={index} onClick={action.onClick} color={action.color} variant={action.variant}>
              {action.label}
            </Button>
          ))}
      </DialogActions>
    </Dialog>
  )
}

export default ReusableDialog
