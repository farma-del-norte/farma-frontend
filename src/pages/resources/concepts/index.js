import {Fragment, useEffect} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {Typography, Grid, FormControl, TextField, Box, InputLabel, Select, MenuItem} from '@mui/material'
import CardTable from 'src/components/cardTable'
import ReusableDialog from 'src/components/modal'
import {Pencil, Delete} from 'mdi-material-ui'
import {setDeleteItem, setModalItem, toggleDeleteModal, toggleModal} from 'src/store/catalogs/concepts/reducer'
import {CATALOGS, COMMON} from 'src/utils/constants'
import {createConceptCat, deleteConceptCat, editConceptCat, getConceptsCat} from 'src/store/catalogs/concepts/actions'
import FallbackSpinner from 'src/@core/components/spinner'
import {getVariablesCat} from 'src/store/catalogs/variables/actions'
import CustomSnackbar from 'src/components/snackbar/CustomSnackbar'
import {closeSnackBar} from 'src/store/notifications'
import {t} from 'i18next'

const columns = [
  {
    flex: COMMON.COLUMN_FLEX,
    minWidth: COMMON.COLUMN_MIN_WIDTH,
    field: CATALOGS.CONCEPTS_FIELD_NAME,
    headerName: t('concepts_cat_field_name', {ns: 'catalogs'})
  },
  {
    flex: COMMON.COLUMN_FLEX,
    minWidth: COMMON.COLUMN_MIN_WIDTH,
    field: CATALOGS.CONCEPTS_FIELD_TYPE,
    headerName: t('concepts_cat_field_type', {ns: 'catalogs'})
  },
  {
    flex: COMMON.COLUMN_FLEX,
    minWidth: COMMON.COLUMN_MIN_WIDTH,
    field: CATALOGS.CONCEPTS_FIELD_DEFINITION,
    headerName: t('concepts_cat_field_definition', {ns: 'catalogs'})
  },
  {
    flex: COMMON.COLUMN_FLEX_SMALL,
    minWidth: COMMON.COLUMN_MIN_WIDTH_SMALL,
    field: CATALOGS.CONCEPTS_FIELD_OBSERVATIONS,
    headerName: t('concepts_cat_field_observations', {ns: 'catalogs'})
  },
  {
    flex: COMMON.COLUMN_FLEX,
    minWidth: COMMON.COLUMN_MIN_WIDTH,
    field: CATALOGS.CONCEPTS_FIELD_VARIABLE_NAME,
    headerName: t('concepts_cat_field_variable_name', {ns: 'catalogs'})
  }
]

function ConceptCats() {
  const dispatch = useDispatch()
  const {conceptsCat, isOpen, modalItem, isDeleteOpen, isLoading, modalDeleteItem} = useSelector(
    state => state.conceptsCat
  )
  const {variablesCat} = useSelector(state => state.variablesCat)
  const {open, message, severity} = useSelector(state => state.notifications)
  const {control, handleSubmit, reset} = useForm({
    defaultValues: {}
  })

  useEffect(() => {
    dispatch(getConceptsCat())
    if (variablesCat.length == 0) {
      dispatch(getVariablesCat())
    }
  }, [dispatch, variablesCat])

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
    dispatch(deleteConceptCat(modalDeleteItem))
    handleCloseDeleteModal()
  }

  const onSubmit = values => {
    if (Boolean(modalItem)) {
      dispatch(editConceptCat(values))
    } else {
      dispatch(createConceptCat(values))
    }
    handleCloseModal()
  }

  const actionableColumns = [
    ...columns,
    {
      flex: COMMON.COLUMN_ACTION_FLEX,
      minWidth: COMMON.COLUMN_ACTION_MIN_WIDTH,
      field: COMMON.ACTIONS_FIELD,
      headerName: t('actions'),
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
          rows={conceptsCat}
          label={t('concepts_cat_field_name', {ns: 'catalogs'})}
          onAddItem={handleAddItem}
        />
      )}
      <ReusableDialog
        open={isOpen}
        onClose={handleCloseModal}
        title={
          Boolean(modalItem)
            ? t('concepts_cat_edit_modal', {ns: 'catalogs'})
            : t('concepts_cat_add_modal', {ns: 'catalogs'})
        }
        actions={[
          {
            label: t('back_button'),
            onClick: handleCloseModal,
            color: COMMON.BUTTON_PRIMARY_COLOR,
            variant: COMMON.BACK_BUTTON_VARIANT
          },
          {
            label: t('save_button'),
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
                    <TextField
                      label={t('concepts_cat_field_name', {ns: 'catalogs'})}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: COMMON.FORM_MARGIN_TOP}}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>
                  {t('concepts_cat_field_variable_name', {ns: 'catalogs'})}
                </InputLabel>
                <Controller
                  name={CATALOGS.CONCEPTS_FIELD_VARIABLE_ID}
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={value}
                      label={t('concepts_cat_field_variable_name', {ns: 'catalogs'})} /*  */
                      onChange={onChange}
                    >
                      {variablesCat.map(variable => (
                        <MenuItem key={variable.id} value={variable.id}>
                          {variable.name}
                        </MenuItem>
                      ))}
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
                      label={t('concepts_cat_field_type', {ns: 'catalogs'})}
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
                    <TextField
                      label={t('concepts_cat_field_definition', {ns: 'catalogs'})}
                      value={value}
                      onChange={onChange}
                    />
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
                    <TextField
                      label={t('concepts_cat_field_observations', {ns: 'catalogs'})}
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
        title={t('concepts_cat_delete_modal', {ns: 'catalogs'})}
        actions={[
          {
            label: t('back_button'),
            onClick: handleCloseDeleteModal,
            color: COMMON.BUTTON_PRIMARY_COLOR,
            variant: COMMON.BACK_BUTTON_VARIANT
          },
          {
            label: t('delete_button'),
            onClick: handleDeleteConfirm,
            color: COMMON.BUTTON_PRIMARY_COLOR,
            variant: COMMON.DELETE_BUTTON_VARIANT
          }
        ]}
      >
        <Box>
          <Typography variant={COMMON.MODAL_DELETE_TEXT_VARIANT}>
            {t('concepts_cat_delete_confirm_message', {ns: 'catalogs'})}
          </Typography>
        </Box>
      </ReusableDialog>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </Fragment>
  )
}

export default ConceptCats
