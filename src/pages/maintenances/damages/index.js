import {Fragment, useEffect} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {Typography, Grid, FormControl, TextField, Box, InputLabel, MenuItem, Select} from '@mui/material'
import CardTable from 'src/components/cardTable'
import ReusableDialog from 'src/components/modal'
import {Pencil, Delete} from 'mdi-material-ui'
import {toggleModal, setModalItem, setDeleteItem, toggleDeleteModal} from 'src/store/maintenances/damages/reducer'
import {createDamage, deleteDamage, editDamage, getDamages} from 'src/store/maintenances/damages/actions'
import {getDamagesCat} from 'src/store/catalogs/damages/actions'
import {getMaintenances} from 'src/store/maintenances/maintenances/actions'
import CustomSnackbar from 'src/components/snackbar/CustomSnackbar'
import {closeSnackBar} from 'src/store/notifications'
import FallbackSpinner from 'src/@core/components/spinner'
import {DAMAGES_LOCALE} from 'src/utils/constants'

const columns = [
  {
    flex: 0.25,
    minWidth: 200,
    field: 'damageCategory',
    headerName: DAMAGES_LOCALE.DAMAGES_COLUMN_DAMAGE_CAT
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'MaintenancesDescription',
    headerName: DAMAGES_LOCALE.DAMAGES_COLUMN_MAINTENANCE
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'description',
    headerName: DAMAGES_LOCALE.DAMAGES_COLUMN_DESCRIPTION
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'notes',
    headerName: DAMAGES_LOCALE.DAMAGES_COLUMN_NOTES
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'date',
    headerName: DAMAGES_LOCALE.DAMAGES_COLUMN_DATE
  }
]

const defaultValuesDamages = {
  id: '',
  damageCatID: '',
  maintenanceID: '',
  description: '',
  notes: '',
  date: ''
}

function Damages() {
  const dispatch = useDispatch()
  const {isOpen, modalItem, isDeleteOpen, damages, isLoading, modalDeleteItem} = useSelector(state => state.damages)
  const {maintenances} = useSelector(state => state.maintenances)
  const {damagesCat} = useSelector(state => state.damagesCat)
  const {open, message, severity} = useSelector(state => state.notifications)
  const {control, handleSubmit, reset} = useForm({
    defaultValues: {}
  })

  useEffect(() => {
    dispatch(getDamages())
    dispatch(getDamagesCat())
    dispatch(getMaintenances())
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
    dispatch(deleteDamage(modalDeleteItem))
    handleCloseDeleteModal()
  }

  const onSubmit = values => {
    if (Boolean(modalItem)) {
      dispatch(editDamage(values))
    } else {
      dispatch(createDamage(values))
    }
    handleCloseModal()
  }

  const actionableColumns = [
    ...columns,
    {
      flex: 0.125,
      minWidth: 100,
      field: 'actions',
      headerName: DAMAGES_LOCALE.DAMAGES_COLUMN_ACTIONS,
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
          rows={damages}
          label={DAMAGES_LOCALE.DAMAGES_TITLE}
          onAddItem={handleAddItem}
        />
      )}
      <ReusableDialog
        open={isOpen}
        onClose={handleCloseModal}
        title={Boolean(modalItem) ? 'editar' : 'agregar'}
        actions={[
          {label: 'Regresar', onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
          {label: 'Guardar', onClick: handleSubmit(onSubmit), color: 'primary', variant: 'contained'}
        ]}
      >
        <form>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <InputLabel>{DAMAGES_LOCALE.DAMAGES_COLUMN_DAMAGE_CAT}</InputLabel>
                <Controller
                  name='damageCatID'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <Select value={value} onChange={onChange} label={DAMAGES_LOCALE.DAMAGES_COLUMN_DAMAGE_CAT}>
                      {damagesCat.map(damage => (
                        <MenuItem key={damage.id} value={damage.id}>
                          {damage.name}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <InputLabel>{DAMAGES_LOCALE.DAMAGES_COLUMN_MAINTENANCE}</InputLabel>
                <Controller
                  name='maintenanceID'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <Select value={value} onChange={onChange} label={DAMAGES_LOCALE.DAMAGES_COLUMN_MAINTENANCE}>
                      {maintenances.map(maintenance => (
                        <MenuItem key={maintenance.id} value={maintenance.id}>
                          {maintenance.description}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='description'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label={DAMAGES_LOCALE.DAMAGES_COLUMN_DESCRIPTION} value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='notes'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label={DAMAGES_LOCALE.DAMAGES_COLUMN_NOTES} value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='date'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      type='date'
                      label={DAMAGES_LOCALE.DAMAGES_COLUMN_DATE}
                      InputLabelProps={{shrink: true}}
                      value={value}
                      onChange={onChange}
                    />
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
        title={'borrar'}
        actions={[
          {label: 'Regresar', onClick: handleCloseDeleteModal, color: 'primary', variant: 'outlined'},
          {label: 'Eliminar', onClick: handleDeleteConfirm, color: 'primary', variant: 'contained'}
        ]}
      >
        <Box>
          <Typography variant='body2'>{DAMAGES_LOCALE.DAMAGES_CONFIRM_DELETE_MODAL}</Typography>
        </Box>
      </ReusableDialog>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </Fragment>
  )
}

export default Damages
