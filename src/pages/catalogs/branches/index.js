import {Fragment, useEffect, useReducer} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {Typography, Grid, FormControl, TextField, Box} from '@mui/material'
import CardTable from 'src/components/cardTable'
import ReusableDialog from 'src/components/modal'
import {Pencil, Delete} from 'mdi-material-ui'
import {toggleModal, setModalItem, toggleDeleteModal} from 'src/store/catalogs/branches'
import {getBranchesData, postBranchesData, patchBranchData, deleteBranchData} from '../../../services/catalogs/branches'

const columns = [
  {
    flex: 0.25,
    minWidth: 200,
    field: 'name',
    headerName: 'Sucursal'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'street',
    headerName: 'Calle'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'neighborhood',
    headerName: 'Colonia'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'zipCode',
    headerName: 'Código Postal'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'city',
    headerName: 'Ciudad'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'federalEntity',
    headerName: 'Estado'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'front',
    headerName: 'Enfrente'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'long',
    headerName: 'Largo'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'high',
    headerName: 'Alto'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'zoneName',
    headerName: 'Zona'
  }
]

const defaultValuesBranches = {
  id: '',
  name: '',
  sucursal: '',
  active: ''
}

const initialState = {
  data: [],
  reload: true
}

const actionTypes = {
  SET_DATA: 'SET_DATA',
  START_RELOAD: 'START_RELOAD',
  STOP_RELOAD: 'STOP_RELOAD'
}

function branchesReducer(state, action) {
  switch (action.type) {
    case actionTypes.SET_DATA:
      return {...state, data: action.payload}
    case actionTypes.START_RELOAD:
      return {...state, reload: true}
    case actionTypes.STOP_RELOAD:
      return {...state, reload: false}
    default:
      return state
  }
}

function Branches() {
  const dispatch = useDispatch()
  const [state, localDispatch] = useReducer(branchesReducer, initialState)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getBranchesData()
        const dataWithIds = result.map((item, index) => ({id: index, ...item}))
        localDispatch({type: actionTypes.SET_DATA, payload: dataWithIds})
        localDispatch({type: actionTypes.STOP_RELOAD})
      } catch (error) {
        console.error('Error fetching data:', error)
        localDispatch({type: actionTypes.STOP_RELOAD})
      }
    }

    if (state.reload) {
      fetchData()
    }
  }, [state.reload])

  const onSubmit = async values => {
    if (modalItem) {
      handleUpdateBranch(values)
    } else {
      handleAddBranch(values)
    }
  }

  const handleAddBranch = async values => {
    try {
      await postBranchesData(values)
      handleCloseModal()
    } catch (error) {
      console.error('Error adding branch:', error)
    }
    localDispatch({type: actionTypes.START_RELOAD})
  }

  const handleUpdateBranch = async values => {
    try {
      await patchBranchData(modalItem.id, values)
      handleCloseModal()
    } catch (error) {
      console.error('Error updating branch:', error)
    }
    localDispatch({type: actionTypes.START_RELOAD})
  }

  const handleConfirmDelete = async () => {
    try {
      await deleteBranchData(modalItem.id)
      handleCloseDeleteModal()
    } catch (error) {
      console.error('Error deleting branch:', error)
    }
    localDispatch({type: actionTypes.START_RELOAD})
  }

  const {isOpen, modalItem, isDeleteOpen} = useSelector(state => state.branches)
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

  const handleCloseModal = () => {
    dispatch(toggleModal(false))
    dispatch(setModalItem(null))
  }

  const handleDeleteModal = params => {
    const {row, open} = params
    reset(row)
    dispatch(toggleDeleteModal(open))
    dispatch(setModalItem(row))
  }

  const handleCloseDeleteModal = () => {
    dispatch(toggleDeleteModal(false))
    dispatch(setModalItem(null))
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
        rows={state.data}
        label='Sucursales'
        onAddItem={handleAddItem}
      />
      <ReusableDialog
        open={isOpen}
        onClose={handleCloseModal}
        title={Boolean(modalItem) ? 'Editar' : 'Agregar'}
        actions={[
          {label: 'Regresar', onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
          Boolean(modalItem)
            ? {label: 'Actualizar', onClick: handleSubmit(handleUpdateBranch), color: 'primary', variant: 'contained'}
            : {label: 'Agregar', onClick: handleSubmit(handleAddBranch), color: 'primary', variant: 'contained'}
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
                    <TextField label='Sucursal' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='street'
                  control={control}
                  render={({field: {value, onChange}}) => <TextField label='Calle' value={value} onChange={onChange} />}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='neighborhood'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Colonia' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name='zipCode'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Código Postal' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='city'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Ciudad' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='federalEntity'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Estado' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='front'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Enfrente' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='long'
                  control={control}
                  render={({field: {value, onChange}}) => <TextField label='Largo' value={value} onChange={onChange} />}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='high'
                  control={control}
                  render={({field: {value, onChange}}) => <TextField label='Alto' value={value} onChange={onChange} />}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='zoneName'
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
        title={'Eliminar Sucursal'}
        actions={[
          {label: 'Regresar', onClick: handleCloseDeleteModal, color: 'primary', variant: 'outlined'},
          {label: 'Guardar', onClick: handleConfirmDelete, color: 'primary', variant: 'contained'}
        ]}
      >
        <Box>
          <Typography variant='body2'>Seguro de eliminar el sucursal seleccionado?</Typography>
        </Box>
      </ReusableDialog>
    </Fragment>
  )
}

export default Branches
