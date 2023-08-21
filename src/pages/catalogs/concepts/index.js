import {Fragment, useEffect} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {Typography, Grid, FormControl, TextField, Box, InputLabel, Select, MenuItem} from '@mui/material'
import CardTable from 'src/components/cardTable'
import ReusableDialog from 'src/components/modal'
import {Pencil, Delete} from 'mdi-material-ui'
import {setDeleteItem, setModalItem, toggleDeleteModal, toggleModal} from 'src/store/catalogs/concepts/reducer'
import {CATALOGS, CATALOGS_LOCALE, COMMON, COMMON_LOCALE} from 'src/utils/constants'
import {createConcept, deleteConcept, editConcept, getConcepts} from 'src/store/catalogs/concepts/actions'
import FallbackSpinner from 'src/@core/components/spinner'
import {getVariables} from 'src/store/catalogs/variables/actions'
import CustomSnackbar from 'src/components/snackbar/CustomSnackbar'
import {closeSnackBar} from 'src/store/notifications'
const columns = [
  {
    flex: COMMON.COLUMN_FLEX,
    minWidth: COMMON.COLUMN_MIN_WIDTH,
    field: CATALOGS.CONCEPTS_FIELD_NAME,
    headerName: CATALOGS_LOCALE.CONCEPTS_FIELD_NAME
  },
  {
    flex: COMMON.COLUMN_FLEX,
    minWidth: COMMON.COLUMN_MIN_WIDTH,
    field: CATALOGS.CONCEPTS_FIELD_TYPE,
    headerName: CATALOGS_LOCALE.CONCEPTS_FIELD_TYPE
  },
  {
    flex: COMMON.COLUMN_FLEX,
    minWidth: COMMON.COLUMN_MIN_WIDTH,
    field: CATALOGS.CONCEPTS_FIELD_DEFINITION,
    headerName: CATALOGS_LOCALE.CONCEPTS_FIELD_DEFINITION
  },
  {
    flex: COMMON.COLUMN_FLEX_SMALL,
    minWidth: COMMON.COLUMN_MIN_WIDTH_SMALL,
    field: CATALOGS.CONCEPTS_FIELD_OBSERVATIONS,
    headerName: CATALOGS_LOCALE.CONCEPTS_FIELD_OBSERVATIONS
  },
  {
    flex: COMMON.COLUMN_FLEX,
    minWidth: COMMON.COLUMN_MIN_WIDTH,
    field: CATALOGS.CONCEPTS_FIELD_VARIABLE_NAME,
    headerName: CATALOGS_LOCALE.CONCEPTS_FIELD_VARIABLE_NAME
  }
]

function Concepts() {
  const dispatch = useDispatch()
  const {concepts, isOpen, modalItem, isDeleteOpen, isLoading, modalDeleteItem} = useSelector(state => state.concepts)
  const {variables} = useSelector(state => state.variables)
  const {open, message, severity} = useSelector(state => state.notifications)
  const {control, handleSubmit, reset} = useForm({
    defaultValues: {}
  })

  useEffect(() => {
    dispatch(getConcepts())
    if (variables.length > 0) {
      dispatch(getVariables)
    }
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
    dispatch(deleteConcept(modalDeleteItem))
    handleCloseDeleteModal()
  }

  const onSubmit = values => {
    if (Boolean(modalItem)) {
      dispatch(editConcept(values))
    } else {
      dispatch(createConcept(values))
    }
    handleCloseModal()
  }

  const actionableColumns = [
    ...columns,
    {
      flex: COMMON.COLUMN_ACTION_FLEX,
      minWidth: COMMON.COLUMN_ACTION_MIN_WIDTH,
      field: COMMON.ACTIONS_FIELD,
      headerName: COMMON_LOCALE.ACTIONS,
      renderCell: params => {
        const row = params?.row
        return (
          <Typography
            variant={COMMON.ACTIONS_TEXT_VARIANT}
            sx={{color: COMMON.ACTIONS_TEXT_COLOR, cursor: COMMON.ACTIONS_TEXT_CURSOR}}
          >
            <Pencil sx={{margin: COMMON.ACTION_ICON_MARGIN}} onClick={() => handleOpenModal({row, open: true})} />
            <Delete sx={{margin: COMMON.ACTION_ICON_MARGIN}} onClick={() => handleDeleteModal({row, open: true})} />
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
          rows={concepts}
          label={CATALOGS_LOCALE.CONCEPTS_FIELD_NAME}
          onAddItem={handleAddItem}
        />
      )}
      <ReusableDialog
        open={isOpen}
        onClose={handleCloseModal}
        title={Boolean(modalItem) ? CATALOGS_LOCALE.CONCEPTS_EDIT_MODAL : CATALOGS_LOCALE.CONCEPTS_ADD_MODAL}
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
            <Grid item xs={12} md={6} sx={{marginTop: COMMON.FORM_MARGIN_TOP}}>
              <FormControl fullWidth>
                <Controller
                  name={CATALOGS.CONCEPTS_FIELD_NAME}
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label={CATALOGS_LOCALE.CONCEPTS_FIELD_NAME} value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: COMMON.FORM_MARGIN_TOP}}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>{CATALOGS_LOCALE.CONCEPTS_FIELD_VARIABLE_NAME}</InputLabel>
                <Controller
                  name={CATALOGS.CONCEPTS_FIELD_VARIABLE_ID}
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={value}
                      label={CATALOGS_LOCALE.CONCEPTS_FIELD_VARIABLE_NAME} /*  */
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
            <Grid item xs={12} md={6} sx={{marginTop: COMMON.FORM_MARGIN_TOP}}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Tipo</InputLabel>
                <Controller
                  name={CATALOGS.CONCEPTS_FIELD_TYPE}
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={value}
                      label={CATALOGS_LOCALE.CONCEPTS_FIELD_TYPE}
                      onChange={onChange}
                    >
                      <MenuItem value={10}>Concepto</MenuItem>
                      <MenuItem value={20}>Elemento</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: COMMON.FORM_MARGIN_TOP}}>
              <FormControl fullWidth>
                <Controller
                  name={CATALOGS.CONCEPTS_FIELD_DEFINITION}
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label={CATALOGS_LOCALE.CONCEPTS_FIELD_DEFINITION} value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: COMMON.FORM_MARGIN_TOP}}>
              <FormControl fullWidth>
                <Controller
                  name={CATALOGS.CONCEPTS_FIELD_OBSERVATIONS}
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label={CATALOGS_LOCALE.CONCEPTS_FIELD_OBSERVATIONS} value={value} onChange={onChange} />
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
        title={CATALOGS_LOCALE.CONCEPTS_DELETE_MODAL}
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
          <Typography variant={COMMON.MODAL_DELETE_TEXT_VARIANT}>
            {CATALOGS_LOCALE.CONCEPTS_CONFIRM_DELETE_MODAL}
          </Typography>
        </Box>
      </ReusableDialog>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </Fragment>
  )
}

export default Concepts
