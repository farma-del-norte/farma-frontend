import { useEffect } from 'react'
import { Typography } from '@mui/material'
import { toggleModal, toggleDeleteModal, setRow } from 'src/store/catalogs/materials/reducer'
import { getMaterialsCat } from 'src/store/catalogs/materials/actions'
import { useSelector, useDispatch } from 'react-redux'
import { Pencil, Delete } from 'mdi-material-ui'
import { materialsColumns } from 'src/views/tables/resources/materials'
import FallbackSpinner from 'src/@core/components/spinner'
import CardTable from 'src/components/cardTable'

const DataTable = ({methods}) => {
  const dispatch = useDispatch(),
    { materialsCat,  isLoading } = useSelector(state => state.materialsCat),
    actionableColumns = [
      ...materialsColumns,
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
    dispatch(getMaterialsCat())
  }, [dispatch])


  return (
    isLoading ? (
        <FallbackSpinner />
      ) : (
        <CardTable
          showAddButton
          columns={actionableColumns}
          rows={materialsCat}
          label='Materiales'
          onAddItem={handleAddItem}
        />
    )
  )
}

export default DataTable;