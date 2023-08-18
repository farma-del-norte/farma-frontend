import {Fragment} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {Typography, Grid, FormControl, TextField, Box} from '@mui/material'
import CardTable from 'src/components/cardTable'
import ReusableDialog from 'src/components/modal'
import {Pencil, Delete} from 'mdi-material-ui'
import {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} from 'src/store/catalogs/maintenance'

const columns = [
  {
    flex: 0.25,
    minWidth: 200,
    field: 'name',
    headerName: 'Mantenimiento'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'category',
    headerName: 'Categoría'
  }
]

const fakeRows = [
  {
    id: 1,
    name: 'dato de prueba',
    category: 'categoria 1'
  },
  {
    id: 2,
    name: 'dato de prueba',
    category: 'categoria 1'
  },
  {
    id: 3,
    name: 'dato de prueba',
    category: 'categoria 1'
  },
  {
    id: 4,
    name: 'dato de prueba',
    category: 'categoria 1'
  }
]

const defaultValuesMaintenances = {
  id: '',
  name: '',
  category: ''
}

function Maintenances() {
  const dispatch = useDispatch()

  const {isOpen, modalItem, isDeleteOpen} = useSelector(state => state.maintenance)
  const {control, handleSubmit, reset} = useForm({
    defaultValues: {}
  })

  const handleAddItem = () => {
    reset({})
    dispatch(toggleModal(true))
  }

  const handleOpenModal = params => {
    const {row, open} = params
    reset(row)
    dispatch(toggleModal(open))
    dispatch(setModalItem(row))
  }

  const onSubmit = () => {}

  const handleCloseModal = () => {
    const cleanModal = null
    reset()
    dispatch(toggleModal(false))
    dispatch(setModalItem(cleanModal))
  }

  const handleDeleteModal = params => {
    const {row, open} = params
    dispatch(toggleDeleteModal(open))
    dispatch(setDeleteItem(row))
  }

  const handleCloseDeleteModal = () => {
    const cleanModal = null
    dispatch(toggleDeleteModal(false))
    dispatch(setDeleteItem(cleanModal))
  }

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
    <Fragment>
      <CardTable
        showAddButton
        columns={actionableColumns}
        rows={fakeRows}
        label='Mantenimientos'
        onAddItem={handleAddItem}
      />
      <ReusableDialog
        open={isOpen}
        onClose={handleCloseModal}
        title={Boolean(modalItem) ? 'Editar' : 'Agregar'}
        actions={[
          {label: 'Regresar', onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
          {label: 'Guardar', onClick: handleCloseModal, color: 'primary', variant: 'contained'}
        ]}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='name'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Mantenimiento' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='category'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Categoría' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </ReusableDialog>
      <ReusableDialog
        open={isDeleteOpen}
        onClose={handleCloseDeleteModal}
        title={'Eliminar Mantenimiento'}
        actions={[
          {label: 'Regresar', onClick: handleCloseDeleteModal, color: 'primary', variant: 'outlined'},
          {label: 'Guardar', onClick: handleCloseDeleteModal, color: 'primary', variant: 'contained'}
        ]}
      >
        <Box>
          <Typography variant='body2'>Seguro de eliminar el mantenimiento seleccionado?</Typography>
        </Box>
      </ReusableDialog>
    </Fragment>
  )
}

export default Maintenances
