import {Fragment, useEffect, useReducer} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {Typography, Grid, FormControl, TextField, Box} from '@mui/material'
import CardTable from 'src/components/cardTable'
import ReusableDialog from 'src/components/modal'
import {Pencil, Delete} from 'mdi-material-ui'
import {toggleModal, setModalItem, setDeleteItem, toggleDeleteModal} from 'src/store/catalogs/suppliers/reducer'
import {getSuppliers, createSupplier, editSupplier, deleteSupplier} from 'src/store/catalogs/suppliers/actions'
import CustomSnackbar from 'src/components/snackbar/CustomSnackbar'
import FallbackSpinner from 'src/@core/components/spinner'
import {closeSnackBar} from 'src/store/notifications'
import CATALOGS_LOCALE from 'src/utils/locales/catalogs'

const columns = [
  {
    flex: 0.11,
    minWidth: 130,
    field: 'firstname',
    headerName: 'Nombre'
  },
  {
    flex: 0.2,
    minWidth: 130,
    field: 'lastname',
    headerName: 'Apellido'
  },
  {
    flex: 0.28,
    minWidth: 130,
    field: 'email',
    headerName: 'Correo'
  },
  {
    flex: 0.1,
    minWidth: 130,
    field: 'phone',
    headerName: 'Teléfono'
  },
  {
    flex: 0.3,
    minWidth: 130,
    field: 'address',
    headerName: 'Dirección'
  },
  {
    flex: 0.35,
    minWidth: 160,
    field: 'services',
    headerName: 'Servicios'
  }
]

function Suppliers() {
  const dispatch = useDispatch()
  const {isOpen, modalItem, isDeleteOpen, isLoading, suppliers, modalDeleteItem} = useSelector(state => state.suppliers)
  const {open, message, severity} = useSelector(state => state.notifications)
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset
  } = useForm({
    defaultValues: {}
  })

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
    dispatch(deleteSupplier(modalDeleteItem))
    dispatch(getSuppliers())
    handleCloseDeleteModal()
  }

  const onSubmit = values => {
    if (Boolean(modalItem)) {
      dispatch(editSupplier(values))
    } else {
      dispatch(createSupplier(values))
    }
    handleCloseModal()
  }

  useEffect(() => {
    dispatch(getSuppliers())
  }, [dispatch])

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
          rows={suppliers}
          label='Proveedores'
          onAddItem={handleAddItem}
        />
      )}
      <ReusableDialog
        open={isOpen}
        onClose={handleCloseModal}
        title={Boolean(modalItem) ? CATALOGS_LOCALE.SUPPLIERS_EDIT_MODAL : CATALOGS_LOCALE.SUPPLIERS_ADD_MODAL}
        actions={[
          {label: 'Regresar', onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
          {label: 'Guardar', onClick: handleSubmit(onSubmit), color: 'primary', variant: 'contained'}
        ]}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container>
            <Grid item m={12} container spacing={2} sx={{marginTop: '6px'}} width={1000}>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <Controller
                    name='firstname'
                    control={control}
                    rules={{required: 'El nombre es requerido'}}
                    render={({field: {value, onChange}}) => (
                      <TextField
                        label='Nombre'
                        error={Boolean(errors.firstname)}
                        helperText={errors.firstname ? errors.firstname.message : ''}
                        value={value}
                        onChange={onChange}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth>
                  <Controller
                    name='lastname'
                    control={control}
                    rules={{required: 'El Apellido es requerido'}}
                    render={({field: {value, onChange}}) => (
                      <TextField
                        label='Apellido'
                        value={value}
                        error={Boolean(errors.lastname)}
                        helperText={errors.lastname ? errors.lastname.message : ''}
                        onChange={onChange}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <Controller
                    name='email'
                    control={control}
                    rules={{required: 'El Correo es requerido'}}
                    render={({field: {value, onChange}}) => (
                      <TextField
                        label='Correo'
                        value={value}
                        error={Boolean(errors.email)}
                        helperText={errors.email ? errors.email.message : ''}
                        onChange={onChange}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <Controller
                    name='phone'
                    rules={{required: 'El teléfono  es requerido'}}
                    control={control}
                    render={({field: {value, onChange}}) => (
                      <TextField
                        label='Teléfono '
                        value={value}
                        error={Boolean(errors.phone)}
                        helperText={errors.phone ? errors.phone.message : ''}
                        onChange={onChange}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={5}>
                <FormControl fullWidth>
                  <Controller
                    name='address'
                    control={control}
                    rules={{required: 'La dirección  es requerida'}}
                    render={({field: {value, onChange}}) => (
                      <TextField
                        label='Dirección'
                        value={value}
                        error={Boolean(errors.address)}
                        helperText={errors.address ? errors.address.message : ''}
                        onChange={onChange}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} md={5}>
                <FormControl fullWidth>
                  <Controller
                    name='services'
                    control={control}
                    rules={{required: 'Los servicios son requeridos'}}
                    render={({field: {value, onChange}}) => (
                      <TextField
                        label='Servicios'
                        value={value}
                        error={Boolean(errors.services)}
                        helperText={errors.services ? errors.services.message : ''}
                        onChange={onChange}
                      />
                    )}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </ReusableDialog>
      <ReusableDialog
        open={isDeleteOpen}
        onClose={handleCloseDeleteModal}
        title={CATALOGS_LOCALE.SUPPLIERS_DELETE_MODAL}
        actions={[
          {label: 'Regresar', onClick: handleCloseDeleteModal, color: 'primary', variant: 'outlined'},
          {label: 'Eliminar', onClick: handleDeleteConfirm, color: 'primary', variant: 'contained'}
        ]}
      >
        <Box>
          <Typography variant='body2'>Seguro de eliminar el proveedor seleccionado?</Typography>
        </Box>
      </ReusableDialog>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </Fragment>
  )
}

export default Suppliers
