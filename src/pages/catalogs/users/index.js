import {Fragment, useEffect, useReducer} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {Typography, Grid, FormControl, TextField, Box} from '@mui/material'
import {Pencil, Delete} from 'mdi-material-ui'
import {setModalItem, toggleModal, toggleDeleteModal, setDeleteItem} from 'src/store/catalogs/users/reducer'
import {getUsers, editUser, createUser, deleteUser} from 'src/store/catalogs/users/actions'
import ReusableDialog from 'src/components/modal'
import CardTable from 'src/components/cardTable'
import FallbackSpinner from 'src/@core/components/spinner'
import CustomSnackbar from 'src/components/snackbar/CustomSnackbar'
import {closeSnackBar} from 'src/store/notifications'
import {CATALOGS_LOCALE} from 'src/utils/constants'

const columns = [
  {
    flex: 0.25,
    field: 'firstname',
    minWidth: 80,
    headerName: 'Nombre'
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'lastname',
    headerName: 'Apellido'
  },
  {
    flex: 0.40,
    minWidth: 130,
    field: 'email',
    headerName: 'Correo'
  },
  {
    flex: 0.25,
    minWidth: 130,
    field: 'phone',
    headerName: 'Teléfono'
  },
  {
    flex: 0.25,
    minWidth: 130,
    field: 'position',
    headerName: 'Posición'
  },
  {
    flex: 0.25,
    minWidth: 130,
    field: 'zoneName',
    headerName: 'Zonas'
  },
  {
    flex: 0.25,
    minWidth: 130,
    field: 'branchName',
    headerName: 'Sucursales'
  },
]

const defaultValuesUsers = {
  id: '',
  name: '',
  user: '',
  active: ''
}

const usersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return action.payload;
    case 'DELETE_USER':
      return state.filter(user => user.id !== action.payload.id);
    default:
      throw new Error('Unhandled action type');
  }
};

function Users() {
  const dispatch = useDispatch()
  const [localUsers, dispatchLocal] = useReducer(usersReducer, []);
  const {isOpen, modalItem, isDeleteOpen, isLoading, users, modalDeleteItem} = useSelector(
    state => state.users
  )
  const {open, message, severity} = useSelector(state => state.notifications)

  const isEdit = Boolean(modalItem)

  const {control, handleSubmit, reset} = useForm({
    defaultValues: defaultValuesUsers
  })

  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  useEffect(() => {
    dispatchLocal({ type: 'SET_USERS', payload: users });
}, [users]);

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
  }

  const handleDeleteModal = params => {
    const {row, open} = params
    dispatch(toggleDeleteModal(open))
    dispatch(setDeleteItem(row))
  }

  const handleDeleteConfirm = () => {
    dispatch(deleteUser(modalDeleteItem))
    .then(() => {
      dispatchLocal({ type: 'DELETE_USER', payload: modalDeleteItem });
    })
    .catch(error => {
      console.log(error)
    });
    handleCloseDeleteModal();
};

  const onSubmit = values => {
    if (isEdit) {
      dispatch(editUser(values))
    } else {
      dispatch(createUser(values))
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
          rows={localUsers}
          label='Usuario'
          onAddItem={handleAddItem}
          pageSize={5}
          rowsPerPageOptions={[7, 10, 25, 50]}
      />
      )}

      <ReusableDialog
        open={isOpen}
        onClose={handleCloseModal}
        title={Boolean(modalItem) ? CATALOGS_LOCALE.USERS_EDIT_MODAL : CATALOGS_LOCALE.USERS_ADD_MODAL}
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
                  name='firstname'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Nombre' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='lastname'
                  control={control}
                  render={({field: {value, onChange}}) => <TextField label='Apellido' value={value} onChange={onChange} />}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='email'
                  control={control}
                  render={({field: {value, onChange}}) => <TextField label='Correo' value={value} onChange={onChange} />}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='phone'
                  control={control}
                  render={({field: {value, onChange}}) => <TextField label='Teléfono' value={value} onChange={onChange} />}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='position'
                  control={control}
                  render={({field: {value, onChange}}) => <TextField label='Posición' value={value} onChange={onChange} />}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='zoneID'
                  control={control}
                  render={({field: {value, onChange}}) => <TextField label='Zona ID' value={value} onChange={onChange} />}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='zoneName'
                  control={control}
                  render={({field: {value, onChange}}) => <TextField label='Zona' value={value} onChange={onChange} />}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='branchID'
                  control={control}
                  render={({field: {value, onChange}}) => <TextField label='Sucursal ID' value={value} onChange={onChange} />}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='branchName'
                  control={control}
                  render={({field: {value, onChange}}) => <TextField label='Sucursal' value={value} onChange={onChange} />}
                />
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </ReusableDialog>
      <ReusableDialog
        open={isDeleteOpen}
        onClose={handleCloseModal}
        title={CATALOGS_LOCALE.USERS_DELETE_MODAL}
        actions={[
          {label: 'Regresar', onClick: handleCloseDeleteModal, color: 'primary', variant: 'outlined'},
          {label: 'Eliminar', onClick: handleDeleteConfirm, color: 'primary', variant: 'contained'}
        ]}
      >
        <Box>
          <Typography variant='body2'>Seguro de eliminar el usuario seleccionada?</Typography>
        </Box>
      </ReusableDialog>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </Fragment>
  )
}

export default Users
