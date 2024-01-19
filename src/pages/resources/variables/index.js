import {Fragment, useEffect} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {Typography, Grid, FormControl, TextField, Box, Select, MenuItem, InputLabel} from '@mui/material'
import CardTable from 'src/components/cardTable'
import ReusableDialog from 'src/components/modal'
import {Pencil, Delete} from 'mdi-material-ui'
import {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} from 'src/store/catalogs/variables/reducer'
import {CATALOGS, COMMON} from 'src/utils/constants'
import {
  createVariableCat,
  deleteVariableCat,
  editVariableCat,
  getVariablesCat
} from 'src/store/catalogs/variables/actions'
import CustomSnackbar from 'src/components/snackbar/CustomSnackbar'
import {closeSnackBar} from 'src/store/notifications'
import FallbackSpinner from 'src/@core/components/spinner'
import CATALOGS_LOCALE from 'src/utils/locales/catalogs'
import COMMON_LOCALE from 'src/utils/locales/common'

const columns = [
  {
    flex: COMMON.COLUMN_FLEX,
    minWidth: COMMON.COLUMN_MIN_WIDTH,
    field: CATALOGS.VARIABLES_FIELD_NAME,
    headerName: CATALOGS_LOCALE.VARIABLES_FIELD_NAME
  },
  {
    flex: COMMON.COLUMN_FLEX,
    minWidth: COMMON.COLUMN_MIN_WIDTH,
    field: CATALOGS.VARIABLES_FIELD_OBLIGATION,
    headerName: CATALOGS_LOCALE.VARIABLES_FIELD_OBLIGATION
  },
  {
    flex: COMMON.COLUMN_FLEX_SMALL,
    minWidth: COMMON.COLUMN_MIN_WIDTH_SMALL,
    field: CATALOGS.VARIABLES_FIELD_SPECIFICATIONS,
    headerName: CATALOGS_LOCALE.VARIABLES_FIELD_SPECIFICATIONS
  },
  {
    flex: COMMON.COLUMN_FLEX_SMALL,
    minWidth: COMMON.COLUMN_MIN_WIDTH,
    field: CATALOGS.VARIABLES_FIELD_GUIDELINES,
    headerName: CATALOGS_LOCALE.VARIABLES_FIELD_GUIDELINES
  },
  {
    flex: COMMON.COLUMN_FLEX_SMALL,
    minWidth: COMMON.COLUMN_MIN_WIDTH_SMALL,
    field: CATALOGS.VARIABLES_FIELD_SERVICE,
    headerName: CATALOGS_LOCALE.VARIABLES_FIELD_SERVICE
  },
  {
    flex: COMMON.COLUMN_FLEX,
    minWidth: COMMON.COLUMN_MIN_WIDTH,
    field: CATALOGS.VARIABLES_FIELD_DIMENSIONS_NAME,
    headerName: CATALOGS_LOCALE.VARIABLES_FIELD_DIMENSIONS_NAME
  }
]

const defaultValuesVariablesCat = {
  id: 1,
  name: '',
  dimensionID: 10,
  obligation: '',
  specifications: '',
  guidelines: '',
  service: ''
}

function VariablesCat() {
  const dispatch = useDispatch()
  const {variablesCat, isOpen, modalItem, isDeleteOpen, isLoading, modalDeleteItem} = useSelector(
    state => state.variablesCat
  )
  const {open, message, severity} = useSelector(state => state.notifications)
  const {control, handleSubmit, reset} = useForm({
    defaultValues: defaultValuesVariablesCat
  })

  useEffect(() => {
    dispatch(getVariablesCat())
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
    dispatch(deleteVariableCat(modalDeleteItem))
    handleCloseDeleteModal()
  }

  const onSubmit = values => {
    if (Boolean(modalItem)) {
      dispatch(editVariableCat(values))
    } else {
      dispatch(createVariableCat(values))
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
          rows={variablesCat}
          label='Variables'
          onAddItem={handleAddItem}
        />
      )}
      <ReusableDialog
        open={isOpen}
        onClose={handleCloseModal}
        title={Boolean(modalItem) ? CATALOGS_LOCALE.VARIABLES_EDIT_MODAL : CATALOGS_LOCALE.VARIABLES_ADD_MODAL}
        actions={[
          {
            label: COMMON_LOCALE.BACK_BUTTON,
            onClick: handleCloseModal,
            color: COMMON.BUTTON_PRIMARY_COLOR,
            variant: COMMON.BACK_BUTTON_VARIANT
          },
          {
            label: COMMON_LOCALE.SAVE_BUTTON,
            onClick: handleSubmit(onSubmit),
            color: COMMON.BUTTON_PRIMARY_COLOR,
            variant: COMMON.SAVE_BUTTON_VARIANT
          }
        ]}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name={CATALOGS.VARIABLES_FIELD_NAME}
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label={CATALOGS_LOCALE.VARIABLES_FIELD_NAME} value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Dimension</InputLabel>
                <Controller
                  name={CATALOGS.VARIABLES_FIELD_DIMENSION_ID}
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={value}
                      label={CATALOGS_LOCALE.VARIABLES_FIELD_DIMENSIONS_NAME}
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
                <InputLabel id='demo-simple-select-label'>{CATALOGS_LOCALE.VARIABLES_FIELD_OBLIGATION}</InputLabel>
                <Controller
                  name={CATALOGS.VARIABLES_FIELD_OBLIGATION}
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={value}
                      label={CATALOGS_LOCALE.VARIABLES_FIELD_OBLIGATION}
                      onChange={onChange}
                    >
                      <MenuItem value={10}>Obligatorio</MenuItem>
                      <MenuItem value={20}>Obligatorio en sucursal nueva</MenuItem>
                      <MenuItem value={30}>Opcional</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name={CATALOGS.VARIABLES_FIELD_SPECIFICATIONS}
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      label={CATALOGS_LOCALE.VARIABLES_FIELD_SPECIFICATIONS}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name={CATALOGS.VARIABLES_FIELD_GUIDELINES}
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label={CATALOGS_LOCALE.VARIABLES_FIELD_GUIDELINES} value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name={CATALOGS.VARIABLES_FIELD_SERVICE}
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label={CATALOGS_LOCALE.VARIABLES_FIELD_SERVICE} value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </ReusableDialog>
      <ReusableDialog
        open={isDeleteOpen}
        onClose={handleCloseModal}
        title={CATALOGS_LOCALE.VARIABLES_DELETE_MODAL}
        actions={[
          {
            label: COMMON_LOCALE.BACK_BUTTON,
            onClick: handleCloseDeleteModal,
            color: COMMON.BUTTON_PRIMARY_COLOR,
            variant: COMMON.BACK_BUTTON_VARIANT
          },
          {
            label: COMMON_LOCALE.DELETE_BUTTON,
            onClick: handleDeleteConfirm,
            color: COMMON.BUTTON_PRIMARY_COLOR,
            variant: COMMON.DELETE_BUTTON_VARIANT
          }
        ]}
      >
        <Box>
          <Typography variant='body2'>{CATALOGS_LOCALE.VARIABLES_CONFIRM_DELETE_MODAL}</Typography>
        </Box>
      </ReusableDialog>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </Fragment>
  )
}

export default VariablesCat
