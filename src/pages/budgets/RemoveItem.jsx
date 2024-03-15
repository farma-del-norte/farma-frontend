import ReusableDialog from 'src/components/modal'
import { Typography, Box } from '@mui/material'
import { toggleDeleteModal } from 'src/store/budgets/reducer'
import { deleteBudget } from 'src/store/budgets/actions'
import { useSelector, useDispatch } from 'react-redux'

const RemoveItem = ({ isOpen }) => {
  const dispatch = useDispatch(),
  { currentRow } = useSelector(state => state.budgets),
  handleDeleteConfirm = () => {
    dispatch(deleteBudget(currentRow))
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
        <Typography variant='body2'>Seguro de eliminar el presupuest seleccionado?</Typography>
      </Box>
    </ReusableDialog>
  )
}

export default RemoveItem
