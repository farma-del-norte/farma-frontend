import {Fragment, useEffect} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {Typography, Grid, FormControl, TextField, Box} from '@mui/material'
import CardTable from 'src/components/cardTable'
import ReusableDialog from 'src/components/modal'
import {Pencil, Delete} from 'mdi-material-ui'
import {toggleModal, setModalItem, setDeleteItem, toggleDeleteModal} from 'src/store/catalogs/materials/reducer'
import CustomSnackbar from 'src/components/snackbar/CustomSnackbar'
import {closeSnackBar} from 'src/store/notifications'
import FallbackSpinner from 'src/@core/components/spinner'
import {createMaterialCat, editMaterialCat, getMaterialsCat} from 'src/store/catalogs/materials/actions'

const columns = [
  {
    flex: 0.25,
    minWidth: 200,
    field: 'name',
    headerName: 'Material'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'cost',
    headerName: 'Costo'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'units',
    headerName: 'Unidades'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'perfomance',
    headerName: 'Rendimiento'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'category',
    headerName: 'Categoría'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'obligation',
    headerName: 'Obligación'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'observations',
    headerName: 'Observaciones'
  }
]

const fakeRows = [
  {
    id: 1,
    name: 'dato de prueba',
    cost: '200',
    units: '5',
    perfomance: '100',
    category: 'category 1',
    obligation: 'obligacion',
    observations: 'observaciones'
  },
  {
    id: 2,
    name: 'dato de prueba',
    cost: '300',
    units: '4',
    perfomance: '100',
    category: 'category 1',
    obligation: 'obligacion',
    observations: 'observaciones'
  },
  {
    id: 3,
    name: 'dato de prueba',
    cost: '110',
    units: '20',
    perfomance: '100',
    category: 'category 1',
    obligation: 'obligacion',
    observations: 'observaciones'
  },
  {
    id: 4,
    name: 'dato de prueba',
    cost: '30',
    units: '1000',
    perfomance: '100',
    category: 'category 1',
    obligation: 'obligacion',
    observations: 'observaciones'
  }
]

const defaultValuesMaterials = {
  id: '',
  name: '',
  material: '',
  active: ''
}

function MaterialsCat() {
  const dispatch = useDispatch()

  const {materials, isOpen, modalItem, isDeleteOpen, isLoading, modalDeleteItem} = useSelector(state => state.materialsCat)
  const {open, message, severity} = useSelector(state => state.notifications)
  const {control, handleSubmit, reset} = useForm({
    defaultValues: {}
  })

  useEffect(() => {
    dispatch(getMaterialsCat())
  }, [dispatch])

  const handleCloseModal = () => {
    reset()
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
    reset(row)
    dispatch(toggleModal(open))
    dispatch(setModalItem(row))
  }

  const handleAddItem = () => {
    reset({})
    dispatch(toggleModal(true))
    dispatch(setModalItem(null))
  }

  const handleDeleteModal = params => {
    const {row, open} = params
    dispatch(toggleDeleteModal(open))
    dispatch(setDeleteItem(row))
  }

  const handleDeleteConfirm = () => {
    dispatch(deleteRequirementCat(modalDeleteItem))
    handleCloseDeleteModal()
  }

  const onSubmit = values => {
    if (Boolean(modalItem)) {
      dispatch(editMaterialCat(values))
    } else {
      dispatch(createMaterialCat(values))
    }
    handleCloseModal()
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
      {isLoading ? (
        <FallbackSpinner />
      ) : (
        <CardTable
          showAddButton
          columns={actionableColumns}
          rows={materials}
          label='Materiales'
          onAddItem={handleAddItem}
        />
      )}
      <ReusableDialog
        open={isOpen}
        onClose={handleCloseModal}
        title={Boolean(modalItem) ? 'Editar' : 'Agregar'}
        actions={[
          {label: 'Regresar', onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
          {label: 'Guardar', onClick: handleSubmit(onSubmit), color: 'primary', variant: 'contained'}
        ]}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='name'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Material' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='cost'
                  control={control}
                  render={({field: {value, onChange}}) => <TextField label='Costo' value={value} onChange={onChange} />}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='units'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Unidades' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name='perfomance'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Rendimiento' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
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
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='obligation'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Obligación' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='observations'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Observaciones' value={value} onChange={onChange} />
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
        title={'Eliminar Material'}
        actions={[
          {label: 'Regresar', onClick: handleCloseDeleteModal, color: 'primary', variant: 'outlined'},
          {label: 'Eliminar', onClick: handleDeleteConfirm, color: 'primary', variant: 'contained'}
        ]}
      >
        <Box>
          <Typography variant='body2'>Seguro de eliminar el material seleccionado?</Typography>
        </Box>
      </ReusableDialog>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </Fragment>
  )
}

export default MaterialsCat
