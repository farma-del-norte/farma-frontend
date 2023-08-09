import {Fragment} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {Typography, Grid, FormControl, TextField, Box, InputLabel, Select, MenuItem} from '@mui/material'
import CardTable from 'src/pages/components/cardTable'
import ReusableDialog from 'src/pages/components/modal'
import {getTitle} from 'src/utils/functions'
import {Pencil, Delete} from 'mdi-material-ui'
import {setDeleteItem, setModalItem, toggleDeleteModal, toggleModal} from 'src/store/catalogs/concepts'
const columns = [
  {
    flex: 0.25,
    minWidth: 200,
    field: 'concept',
    headerName: 'Concepto'
  },
  {
    flex: 0.25,
    minWidth: 230,
    field: 'type',
    headerName: 'Tipo'
  },
  {
    flex: 0.25,
    minWidth: 230,
    field: 'definition',
    headerName: 'Definición'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'observations',
    headerName: 'Observaciones'
  },
  {
    flex: 0.25,
    minWidth: 230,
    field: 'variableName',
    headerName: 'Variable'
  }
]

const fakeRows = [
  {
    id: 2,
    concept: 'dato de prueba',
    variableName: 'dato de prueba',
    type: 'Concepto',
    definition: 'dato de prueba',
    observations: 'dato de prueba'
  }
]

function Concepts() {
  const dispatch = useDispatch()
  const {isOpen, modalItem, isDeleteOpen} = useSelector(state => state.concepts)
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

  const onSubmit = () => {}

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

  const handleCloseModal = () => {
    reset()
    const cleanModal = null
    dispatch(toggleModal(false))
    dispatch(setModalItem(cleanModal))
  }

  const isEdit = Boolean(modalItem)

  return (
    <Fragment>
      <CardTable
        showAddButton
        columns={actionableColumns}
        rows={fakeRows}
        label='Conceptos'
        onAddItem={handleAddItem}
      />
      <ReusableDialog
        open={isOpen}
        onClose={handleCloseModal}
        title={isEdit ? 'Editar' : 'Agregar'}
        actions={[
          {label: 'Regresar', onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
          {label: 'Guardar', onClick: handleCloseModal, color: 'primary', variant: 'contained'}
        ]}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='concept'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Concepto' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Variable</InputLabel>
                <Controller
                  name='variable'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={value}
                      label='Variable' /*  */
                      onChange={onChange}
                    >
                      <MenuItem value={10}>Prueba</MenuItem>
                      <MenuItem value={20}>Prueba</MenuItem>
                      <MenuItem value={30}>Prueba</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Tipo</InputLabel>
                <Controller
                  name='type'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={value}
                      label='Tipo'
                      onChange={onChange}
                    >
                      <MenuItem value={10}>Concepto</MenuItem>
                      <MenuItem value={20}>Elemento</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='definition'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Definicion' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
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
        title={'Eliminar Concepto'}
        actions={[
          {label: 'Regresar', onClick: handleCloseDeleteModal, color: 'primary', variant: 'outlined'},
          {label: 'Guardar', onClick: handleCloseDeleteModal, color: 'primary', variant: 'contained'}
        ]}
      >
        <Box>
          <Typography variant='body2'>Seguro de eliminar el concepto seleccionado?</Typography>
        </Box>
      </ReusableDialog>
    </Fragment>
  )
}

export default Concepts
