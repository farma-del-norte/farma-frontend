import ReusableDialog from 'src/components/modal'
import { Typography, Box } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux'

const RemoveItem = ({ isOpen, deleteGeneric, dialogText, toggleDeleteModal, getRowFunction }) => {
  const dispatch = useDispatch(),
  { currentRow } = useSelector(getRowFunction),
  handleDeleteConfirm = () => {
    dispatch(deleteGeneric(currentRow))
    handleCloseDeleteModal()
  },
  handleCloseDeleteModal = () => {
    dispatch(toggleDeleteModal(false))
  };

  return (
    <ReusableDialog
      open={isOpen}
      onClose={handleCloseDeleteModal}
      title={'Borrar'}
      actions={[
        {label: 'Regresar', onClick: handleCloseDeleteModal, color: 'primary', variant: 'outlined'},
        {label: 'Eliminar', onClick: handleDeleteConfirm, color: 'primary', variant: 'contained'}
      ]}
    >
      <Box>
        <Typography variant='body2'>{dialogText}</Typography>
      </Box>
    </ReusableDialog>
  )
}

export default RemoveItem