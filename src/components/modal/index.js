import {
  Dialog, 
  DialogTitle, 
  DialogActions, 
  Button, 
  useMediaQuery,
  Box,
} 
from '@mui/material'

const Actions = ({actions, toIndex = undefined}) => {

  const limit = toIndex ?? actions.length

  return(
    <DialogActions>
      {actions.length
        ? actions.slice(0, limit).map((action, index) => (
            <Button key={index} onClick={action.onClick} color={action.color} variant={action.variant}>
              {action.label}
            </Button>
          ))
        : null}
    </DialogActions>
  )
}

const ReusableDialog = ({open = false, onClose = () => {}, title = '', children, actions = [], size = false, footerButtons}) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={size}
      fullWidth={!isMobile}
      fullScreen={isMobile}
    >
      <Box>
        <DialogTitle>{title}</DialogTitle>
        {children}
        <Actions actions={actions} toIndex={footerButtons} />
      </Box>
    </Dialog>
  )
}

export default ReusableDialog
