import {Fragment} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {Typography, Grid, FormControl, TextField, Box} from '@mui/material'
import CardTable from 'src/pages/components/cardTable'
import ReusableDialog from 'src/pages/components/modal'
import {Pencil, Delete} from 'mdi-material-ui'
import {toggleModal, setModalItem, setDeleteItem, toggleDeleteModal} from 'src/store/catalogs/zones'

const columns = [
  {
    flex: 0.25,
    minWidth: 200,
    field: 'name',
    headerName: 'Zona'
  }
]

const fakeRows = [
  {
    id: 1,
    name: 'dato de prueba',
    claim: 'dato de prueba',
    active: 'Activado'
  },
  {
    id: 2,
    name: 'dato de prueba 2',
    claim: 'dato de prueba 2',
    active: 'Activado'
  },
  {
    id: 3,
    name: 'dato de prueba 3',
    claim: 'dato de prueba 3',
    active: 'Activado'
  },
  {
    id: 4,
    name: 'dato de prueba 3',
    claim: 'dato de prueba 3',
    active: 'Activado'
  }
]

const defaultValuesClaims = {
  id: '',
  name: '',
  claim: '',
  active: ''
}

function Zones() {
  const dispatch = useDispatch()

  const {isOpen, modalItem, isDeleteOpen} = useSelector(state => state.zones)
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
      <CardTable showAddButton columns={actionableColumns} rows={fakeRows} label='Zonas' onAddItem={handleAddItem} />
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
                  render={({field: {value, onChange}}) => <TextField label='Zona' value={value} onChange={onChange} />}
                />
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </ReusableDialog>
      <ReusableDialog
        open={isDeleteOpen}
        onClose={handleCloseDeleteModal}
        title={'Eliminar Zona'}
        actions={[
          {label: 'Regresar', onClick: handleCloseDeleteModal, color: 'primary', variant: 'outlined'},
          {label: 'Guardar', onClick: handleCloseDeleteModal, color: 'primary', variant: 'contained'}
        ]}
      >
        <Box>
          <Typography variant='body2'>Seguro de eliminar la zona seleccionada?</Typography>
        </Box>
      </ReusableDialog>
    </Fragment>
  )
}

export default Zones
