import {Fragment, useEffect, useReducer, useState} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {Typography, Grid, FormControl, TextField, Box, InputLabel, Select, MenuItem, Divider, FormHelperText} from '@mui/material'
import {Pencil, Delete, EyeOffOutline, EyeOutline} from 'mdi-material-ui'
import {setModalItem, toggleModal, toggleDeleteModal, setDeleteItem} from 'src/store/catalogs/users/reducer'
import {getUsers, editUser, createUser, deleteUser} from 'src/store/catalogs/users/actions'
import {getBranches} from 'src/store/catalogs/branches/actions'
import {getZones} from 'src/store/catalogs/zones/actions'
import ReusableDialog from 'src/components/modal'
import CardTable from 'src/components/cardTable'
import FallbackSpinner from 'src/@core/components/spinner'
import CustomSnackbar from 'src/components/snackbar/CustomSnackbar'
import {closeSnackBar} from 'src/store/notifications'
import CATALOGS_LOCALE from 'src/utils/locales/catalogs'
import USERS_LOCALE from 'src/utils/locales/users'
import { PasswordField } from 'src/utils/inputs'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

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
    flex: 0.4,
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
  }
]

const defaultValuesUsers = {
  firstname: '',
  lastname: '',
  email: '',
  phone: '',
  position: '',
  zoneID: '',
  branchID: ''
}

const usersReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USERS':
      return action.payload
    case 'DELETE_USER':
      return state.filter(user => user.id !== action.payload.id)
    default:
      throw new Error('Unhandled action type')
  }
}

function Users() {
  const dispatch = useDispatch()
  const positions = [
    {id: 1, name: 'Gerente de zona'},
    {id: 2, name: 'Gerente de Sucursal'},
    {id: 3, name: 'Usuario sucursal'},
    {id: 4, name: 'Administrador'}
  ]
  const {isOpen, modalItem, isDeleteOpen, isLoading, users, modalDeleteItem} = useSelector(state => state.users)
  const {branches} = useSelector(state => state.branches)
  const {zones} = useSelector(state => state.zones)
  const {open, message, severity} = useSelector(state => state.notifications)

  const isEdit = Boolean(modalItem)

  const userInfoSchema = yup.object().shape({
    firstname: yup.string().max(50, USERS_LOCALE.FIRSTNAME_MAX_LENGTH).required(USERS_LOCALE.FIRSTNAME_REQUIRED),
    lastname: yup.string().max(50, USERS_LOCALE.LASTNAME_MAX_LENGTH).required(USERS_LOCALE.LASTNAME_REQUIRED),
    email: yup.string().email(USERS_LOCALE.EMAIL_NOT_CORRECT).required(USERS_LOCALE.EMAIL_REQUIRED),
    phone: yup.string().matches(/^[0-9]+$/, USERS_LOCALE.PHONE_NOT_CORRECT).required(USERS_LOCALE.PHONE_REQUIRED),
    password: yup.string().min(6, USERS_LOCALE.PASSWORD_MIN_LENGTH).max(100, USERS_LOCALE.PASSWORD_MAX_LENGTH).required(USERS_LOCALE.PASSWORD_REQUIRED),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], USERS_LOCALE.CONFIRM_PASSWORD_NOT_CORRECT).required(USERS_LOCALE.CONFIRM_PASSWORD_REQUIRED),
    position: yup.string().required(USERS_LOCALE.SELECT_REQUIRED),
    zoneID: yup.string().required(USERS_LOCALE.SELECT_REQUIRED),
    branchID: yup.string().required(USERS_LOCALE.SELECT_REQUIRED)
  })

  const userInfoEditSchema = yup.object().shape({
    firstname: yup.string().max(50, USERS_LOCALE.FIRSTNAME_MAX_LENGTH).required(USERS_LOCALE.FIRSTNAME_REQUIRED),
    lastname: yup.string().max(50, USERS_LOCALE.LASTNAME_MAX_LENGTH).required(USERS_LOCALE.LASTNAME_REQUIRED),
    email: yup.string().email(USERS_LOCALE.EMAIL_NOT_CORRECT).required(USERS_LOCALE.EMAIL_REQUIRED),
    phone: yup.string().matches(/^[0-9]+$/, USERS_LOCALE.PHONE_NOT_CORRECT).required(USERS_LOCALE.PHONE_REQUIRED),
    position: yup.string().required(USERS_LOCALE.SELECT_REQUIRED),
    zoneID: yup.string().required(USERS_LOCALE.SELECT_REQUIRED),
    branchID: yup.string().required(USERS_LOCALE.SELECT_REQUIRED)
  })

  const {control, handleSubmit, reset, formState: {errors: userErrors}} = useForm({
    defaultValues: defaultValuesUsers,
    resolver: yupResolver(isEdit ? userInfoEditSchema : userInfoSchema)
  })

  useEffect(() => {
    dispatch(getUsers())
    dispatch(getBranches())
    dispatch(getZones())
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
  }

  const handleDeleteModal = params => {
    const {row, open} = params
    dispatch(toggleDeleteModal(open))
    dispatch(setDeleteItem(row))
  }

  const handleDeleteConfirm = () => {
    dispatch(deleteMaintenance(modalDeleteItem))
    handleCloseDeleteModal()
  }

  const onSubmit = values => {
    delete values.confirmPassword;
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
          rows={users}
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
              <FormControl fullWidth error={!!userErrors.firstname} variant="outlined">
                <Controller
                  name='firstname'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField 
                      label='Nombre' 
                      value={value || ''} 
                      onChange={onChange} 
                      color={userErrors.firstname ? "error" : ""}
                      focused={userErrors.firstname}  
                    />
                  )}
                />
                {userErrors.firstname && <FormHelperText error>{userErrors.firstname.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='lastname'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField 
                      label='Apellido' 
                      value={value || ''} 
                      onChange={onChange} 
                      color={userErrors.lastname ? "error" : ""}
                      focused={userErrors.lastname}
                    />
                  )}
                />
                {userErrors.lastname && <FormHelperText error>{userErrors.lastname.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='email'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField 
                      label='Correo' 
                      value={value || ''} 
                      onChange={onChange} 
                      color={userErrors.email ? "error" : ""}
                      focused={userErrors.email}
                    />
                  )}
                />
                {userErrors.email && <FormHelperText error>{userErrors.email.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='phone'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField 
                      label='Teléfono' 
                      value={value || ''} 
                      onChange={onChange} 
                      color={userErrors.phone ? "error" : ""}
                      focused={userErrors.phone}
                    />
                  )}
                />
                {userErrors.phone && <FormHelperText error>{userErrors.phone.message}</FormHelperText>}
              </FormControl>
            </Grid>
            {!isEdit &&
              <>
                <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
                  <FormControl fullWidth>
                    <Controller
                      name='password'
                      control={control}
                      render={({field: {value, onChange}}) => (
                        <PasswordField
                          value={value || ''}
                          onChange={onChange}
                          color={userErrors.password ? "error" : ""}
                          focused={userErrors.password}
                        />
                      )}
                    />
                    {userErrors.password && <FormHelperText error>{userErrors.password.message}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
                  <FormControl fullWidth>
                    <Controller
                      name='confirmPassword'
                      control={control}
                      render={({field: {value, onChange}}) => (
                        <PasswordField
                          label={"Confirmar Contraseña"}
                          value={value || ''}
                          onChange={onChange}
                          color={userErrors.confirmPassword ? "error" : ""}
                          focused={userErrors.confirmPassword}
                        />
                      )}
                    />
                    {userErrors.confirmPassword && <FormHelperText error>{userErrors.confirmPassword.message}</FormHelperText>}
                  </FormControl>
                </Grid>
              </>
            }
            <Grid item xs={12} md={12} sx={{marginTop: '6px'}}>
              <Divider />
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth error={userErrors.position} focused={userErrors.position}>
                <Controller
                  name='position'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <>
                      <InputLabel>Posición</InputLabel>
                      <Select
                        defaultValue=""
                        value={value || ''}
                        label="position"
                        onChange={onChange}
                      >
                        {positions.map((pos, i) =>
                          <MenuItem key={i} value={pos.id}>{pos.name}</MenuItem>
                        )}
                      </Select>
                    </>)}
                />
                {userErrors.position && <FormHelperText error>{userErrors.position.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} sx={{marginTop: '6px'}}>
              <FormControl fullWidth error={userErrors.zoneID} focused={userErrors.zoneID}>
                <Controller
                  name='zoneID'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <>
                      <InputLabel>Zona</InputLabel>
                      <Select
                        defaultValue=""
                        value={value || ''}
                        label="Zona"
                        onChange={onChange}
                      >
                        {zones.map((zone, i) =>
                          <MenuItem key={i} value={zone.id}>{zone.name}</MenuItem>
                        )}
                      </Select>
                    </>)}
                />
                {userErrors.zoneID && <FormHelperText error>{userErrors.zoneID.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} sx={{marginTop: '6px'}}>
              <FormControl fullWidth error={userErrors.branchID} focused={userErrors.branchID}>
                <Controller
                  name='branchID'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <>
                      <InputLabel>Sucursal</InputLabel>
                      <Select
                        defaultValue=""
                        value={value || ''}
                        label="Sucursal"
                        onChange={onChange}
                      >
                        {branches.map((branch, i) =>
                          <MenuItem key={i} value={branch.id}>{branch.name}</MenuItem>
                        )}
                      </Select>
                    </>)}
                />
                {userErrors.branchID && <FormHelperText error>{userErrors.branchID.message}</FormHelperText>}
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
