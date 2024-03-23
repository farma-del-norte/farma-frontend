import { useEffect } from 'react'
import { MAINTENANCES } from 'src/utils/constants'
import { Typography } from '@mui/material'
import { getBudgets } from 'src/store/budgets/actions'
import { toggleModal, setRow, toggleDeleteModal } from 'src/store/budgets/reducer'
import { useSelector, useDispatch } from 'react-redux'
import { Pencil, Delete } from 'mdi-material-ui'
import { budgetsColumns } from 'src/views/tables/budgetsColumns'
import { t } from 'i18next'
import FallbackSpinner from 'src/@core/components/spinner'
import CardTable from 'src/components/cardTable'

const DataTable = () => {
  const dispatch = useDispatch(),
    { budgets, isLoading } = useSelector(state => state.budgets),
    actionableColumns = [
      ...budgetsColumns,
      {
        flex: 0.125,
        minWidth: 100,
        field: 'actions',
        headerName: 'Acciones',
        renderCell: params => {
          const row = params?.row
          return (
            <Typography variant='body2' sx={{ color: '#6495ED', cursor: 'pointer' }}>
              <Pencil sx={{ margin: '5px' }} onClick={() => handleOpenModal({ row, open: true })} />
              <Delete sx={{ margin: '5px' }} onClick={() => handleDeleteModal({ row, open: true })} />
            </Typography>
          )
        }
      }
    ],
    handleAddItem = () => {
      dispatch(toggleModal(true))
      dispatch(setRow([]))
    },
    handleOpenModal = params => {
      const { row } = params
      dispatch(toggleModal(true))
      dispatch(setRow(row))
    },
    handleDeleteModal = params => {
      const {row, open} = params
      dispatch(toggleDeleteModal(open))
      dispatch(setRow(row))
    };

  useEffect(() => {
    dispatch(getBudgets())
  }, [dispatch])


  return (

    isLoading ? (
      <FallbackSpinner />
    ) : (
      <CardTable
        showAddButton
        columns={actionableColumns}
        rows={budgets}
        pageSize={MAINTENANCES.TABLE_PAGE_SIZE}
        label={t('budgets_column_name', {ns: 'budgets'})}
        onAddItem={handleAddItem}
      />
    )
  )
}

export default DataTable;