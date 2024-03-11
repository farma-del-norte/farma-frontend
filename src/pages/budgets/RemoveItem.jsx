import ReusableDialog from 'src/components/modal'

const RemoveItem = () => {
  const handleDeleteConfirm = () => {
    dispatch(deleteMaintenance(modalDeleteItem))
    handleCloseDeleteModal()
  },
  handleCloseDeleteModal = () => {
    const cleanModal = null
    dispatch(toggleDeleteModal(false))
    dispatch(setDeleteItem(cleanModal))
  };

  return (
    <ReusableDialog
      open={isDeleteOpen}
      onClose={handleCloseDeleteModal}
      title={'Borrar'}
      actions={[
        {label: 'Regresar', onClick: handleCloseDeleteModal, color: 'primary', variant: 'outlined'},
        {label: 'Eliminar', onClick: handleDeleteConfirm, color: 'primary', variant: 'contained'}
      ]}
    >
      <Box>
        <Typography variant='body2'>Seguro de eliminar el mantenimiento seleccionado?</Typography>
      </Box>
    </ReusableDialog>
  )
}

export default RemoveItem
