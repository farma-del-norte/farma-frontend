import {columns} from './columns'
import { MAINTENANCES, MAINTENANCES_LOCALE } from 'src/utils/constants'

const DataTable = () => {
  const actionableColumns = [
    ...columns,
    {
      flex: 0.125,
      minWidth: 100,
      field: 'actions',
      headerName: 'Acciones',
      renderCell: params => {
        const row = params?.row
        return (
          <Typography variant='body2' sx={{color: '#6495ED', cursor: 'pointer'}}>
            <Pencil sx={{margin: '5px'}} onClick={() => handleOpenModal({row, open: true})} />
            <Delete sx={{margin: '5px'}} onClick={() => handleDeleteModal({row, open: true})} />
          </Typography>
        )
      }
    }
  ],
  handleAddItem = () => {
    reset({})
    dispatch(toggleModal(true))
    dispatch(getBranches())
    dispatch(setModalItem(null))
  },
  handleOpenModal = params => {
    const {row, open} = params
    reset(row)
    //AL editar
    setAreaType(row.area)
    dispatch(getBranches())
    dispatch(toggleModal(open))
    dispatch(setModalItem(row))
  };

  return (
    {isLoading ? (
      <FallbackSpinner />
    ) : (
      <CardTable
        showAddButton
        columns={actionableColumns}
        rows={maintenances}
        pageSize={MAINTENANCES.TABLE_PAGE_SIZE}
        label={MAINTENANCES_LOCALE.MAINTENANCES_FIELD_NAME}
        onAddItem={handleAddItem}
      />
    )}
  )
}

export default DataTable;