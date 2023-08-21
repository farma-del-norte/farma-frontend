import {Fragment, useEffect} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {Typography, Grid, FormControl, TextField, Box} from '@mui/material'
import CardTable from 'src/components/cardTable'
import ReusableDialog from 'src/components/modal'
import {Pencil, Delete} from 'mdi-material-ui'
import {toggleModal, setModalItem, setDeleteItem, toggleDeleteModal} from 'src/store/catalogs/zones/reducer'
import {closeSnackBar} from 'src/store/notifications'
import {createZone, deleteZone, editZone, getZones} from 'src/store/catalogs/zones/actions'
import FallbackSpinner from 'src/@core/components/spinner'
import CustomSnackbar from 'src/components/snackbar/CustomSnackbar'
import {CATALOGS_LOCALE} from 'src/utils/constants'

const columns = [
  {
    flex: 0.25,
    minWidth: 200,
    field: 'name',
    headerName: 'Zona'
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

  const {zones, isOpen, modalItem, isDeleteOpen, isLoading, modalDeleteItem} = useSelector(state => state.zones)
  const {open, message, severity} = useSelector(state => state.notifications)
  const {control, handleSubmit, reset} = useForm({
    defaultValues: {}
  })

  useEffect(() => {
    dispatch(getZones())
  }, [dispatch])

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

  const onSubmit = values => {
    if (Boolean(modalItem)) {
      dispatch(editZone(values))
    } else {
      dispatch(createZone(values))
    }
    handleCloseModal()
  }

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

  const handleDeleteConfirm = () => {
    dispatch(deleteZone(modalDeleteItem))
    handleCloseDeleteModal()
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
        <CardTable showAddButton columns={actionableColumns} rows={zones} label='Zonas' onAddItem={handleAddItem} />
      )}
      <ReusableDialog
        open={isOpen}
        onClose={handleCloseModal}
        title={Boolean(modalItem) ? CATALOGS_LOCALE.ZONES_EDIT_MODAL : CATALOGS_LOCALE.ZONES_ADD_MODAL}
        actions={[
          {label: 'Regresar', onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
          {label: 'Guardar', onClick: handleSubmit(onSubmit), color: 'primary', variant: 'contained'}
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
        title={CATALOGS_LOCALE.ZONES_DELETE_MODAL}
        actions={[
          {label: 'Regresar', onClick: handleCloseDeleteModal, color: 'primary', variant: 'outlined'},
          {label: 'Eliminar', onClick: handleDeleteConfirm, color: 'primary', variant: 'contained'}
        ]}
      >
        <Box>
          <Typography variant='body2'>{CATALOGS_LOCALE.ZONES_CONFIRM_DELETE_MODAL}</Typography>
        </Box>
      </ReusableDialog>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </Fragment>
  )
}

export default Zones
