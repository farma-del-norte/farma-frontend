import { useEffect } from 'react'
import { Typography } from '@mui/material'
import { getServicesCat } from 'src/store/catalogs/services/actions'
import { toggleModal, toggleDeleteModal, setRow } from 'src/store/catalogs/services/reducer'
import { useSelector, useDispatch } from 'react-redux'
import { Pencil, Delete } from 'mdi-material-ui'
import { servicesColumns } from 'src/views/tables/resources/services'
import FallbackSpinner from 'src/@core/components/spinner'
import CardTable from 'src/components/cardTable'

const DataTable = ({methods}) => {
  const dispatch = useDispatch(),
    { serviceCat,  isLoading } = useSelector(state => state.serviceCat),
    actionableColumns = [
      ...servicesColumns,
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
      methods.reset()
      methods.clearErrors()
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
    dispatch(getServicesCat())
  }, [dispatch])


  return (
    isLoading ? (
        <FallbackSpinner />
      ) : (
        <CardTable
          showAddButton
          columns={actionableColumns}
          rows={serviceCat}
          label='Servicios'
          onAddItem={handleAddItem}
        />
    )
  )
}

export default DataTable;