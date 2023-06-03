import * as React from 'react'
import {useForm, Controller} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {Typography, Grid, FormControl, TextField, Box} from '@mui/material'
import {Pencil, Delete} from 'mdi-material-ui'

import {setModalItem, toggleModal, toggleDeleteModal, setDeleteItem} from 'src/store/catalogs/dimensions'

import ReusableDialog from 'src/pages/components/modal'
import CardTable from 'src/pages/components/cardTable'
import {getTitle} from 'src/utils/functions'

const columns = [
  {
    flex: 0.1,
    field: 'id',
    minWidth: 80,
    headerName: 'ID'
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'name',
    headerName: 'Nombre'
  },
  {
    flex: 0.25,
    minWidth: 230,
    field: 'dimension',
    headerName: 'Dimension'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'active',
    headerName: 'Activo'
  }
]

const fakeRows = [
  {
    id: 1,
    name: 'dato de prueba',
    dimension: 'dato de prueba',
    active: 'Activado'
  },
  {
    id: 2,
    name: 'dato de prueba 2',
    dimension: 'dato de prueba 2',
    active: 'Activado'
  },
  {
    id: 3,
    name: 'dato de prueba 3',
    dimension: 'dato de prueba 3',
    active: 'Activado'
  },
  {
    id: 4,
    name: 'dato de prueba 3',
    dimension: 'dato de prueba 3',
    active: 'Activado'
  }
]

const defaultValuesDimensions = {
  id: '',
  name: '',
  dimension: '',
  active: ''
}

function Dimensions() {
  const dispatch = useDispatch()
  const {isOpen, modalItem, isDeleteOpen} = useSelector(state => state.dimensions)

  const isEdit = Boolean(modalItem) //TODO check this boolean title for modal

  const {control, handleSubmit} = useForm({
    defaultValues: defaultValuesDimensions
  })

  const handleCloseModal = () => {
    const cleanModal = null
    dispatch(toggleModal(false))
    dispatch(setModalItem(cleanModal))
  }

  const handleCloseDeleteModal = () => {
    const cleanModal = null
    dispatch(toggleDeleteModal(false))
    dispatch(setDeleteItem(cleanModal))
  }

  const handleOpenModal = params => {
    const {row, open} = params
    dispatch(toggleModal(open))
    dispatch(setModalItem(row))
  }

  const handleAddItem = () => {
    dispatch(toggleModal(true))
  }

  const handleConfirm = params => {
    console.log('here handling confirm')
  }

  const handleDeleteModal = params => {
    const {row, open} = params
    dispatch(toggleDeleteModal(open))
    dispatch(setDeleteItem(row))
  }

  const handleDeleteConfirm = params => {}

  const onSubmit = values => {
    console.log(values)
  }

  const editTitle = getTitle('edit') // Returns 'Editar dimension seleccionada'
  const addTitle = getTitle('add') // Returns 'Agregar dimension'
  const deleteTitle = getTitle('delete') // Returns 'Eliminar dimension'

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
  ]

  return (
    <React.Fragment>
      <CardTable
        showAddButton
        columns={actionableColumns}
        rows={fakeRows}
        label='Dimension'
        onAddItem={handleAddItem}
      />
      <ReusableDialog
        open={isOpen}
        onClose={handleCloseModal}
        title={isEdit ? editTitle : addTitle}
        actions={[
          {label: 'Regresar', onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
          {label: 'Guardar', onClick: handleConfirm, color: 'primary', variant: 'contained'}
        ]}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <Controller
                  name='name'
                  control={control}
                  render={({field: {value, onChange}}) => <TextField value={value} onChange={onChange} />}
                />
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </ReusableDialog>
      <ReusableDialog
        open={isDeleteOpen}
        onClose={handleCloseModal}
        title={deleteTitle}
        actions={[
          {label: 'Regresar', onClick: handleCloseDeleteModal, color: 'primary', variant: 'outlined'},
          {label: 'Guardar', onClick: handleDeleteConfirm, color: 'primary', variant: 'contained'}
        ]}
      >
        <Box>
          <Typography variant='body2'>Seguro de eliminar la dimension seleccionada?</Typography>
        </Box>
      </ReusableDialog>
    </React.Fragment>
  )
}

export default Dimensions
