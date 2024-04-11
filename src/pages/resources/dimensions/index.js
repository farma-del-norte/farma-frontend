import {useEffect} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {Typography, Grid, FormControl, TextField, Box} from '@mui/material'
import {Pencil, Delete} from 'mdi-material-ui'
import {setModalItem, toggleModal, toggleDeleteModal, setDeleteItem} from 'src/store/catalogs/dimensions/reducer'
import {
  getDimensionsCat,
  editDimensionCat,
  createDimensionCat,
  deleteDimensionCat
} from 'src/store/catalogs/dimensions/actions'
import ReusableDialog from 'src/components/modal'
import CardTable from 'src/components/cardTable'
import {Fragment} from 'react'
import FallbackSpinner from 'src/@core/components/spinner'
import {closeSnackBar} from 'src/store/notifications'
import {CATALOGS, COMMON} from 'src/utils/constants'
import {t} from 'i18next'

function DimensionsCat() {
  const dispatch = useDispatch()
  const {isOpen, modalItem, isDeleteOpen, isLoading, dimensionsCat, modalDeleteItem} = useSelector(
    state => state.dimensionsCat
  )
  const {open, message, severity} = useSelector(state => state.notifications)
  const defaultValuesDimensions = {
    id: '',
    name: '',
    dimension: '',
    active: ''
  }
  const {control, handleSubmit, reset} = useForm({
    defaultValues: defaultValuesDimensions
  })

  useEffect(() => {
    dispatch(getDimensionsCat())
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
    dispatch(deleteDimensionCat(modalDeleteItem))
    handleCloseDeleteModal()
  }

  const onSubmit = values => {
    if (Boolean(modalItem)) {
      dispatch(editDimensionCat(values))
    } else {
      dispatch(createDimensionCat(values))
    }
    handleCloseModal()
  }

  const columns = [
    {
      flex: COMMON.COLUMN_FLEX,
      minWidth: COMMON.COLUMN_MIN_WIDTH,
      field: CATALOGS.DIMENSIONS_FIELD_NAME,
      headerName: t('dimensions_cat_column_name', {ns: 'catalogs'})
    }
  ]

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
          rows={dimensionsCat ?? []}
          label={t('dimensions_cat_column_name', {ns: 'catalogs'})}
          onAddItem={handleAddItem}
          pageSize={CATALOGS.TABLE_PAGE_SIZE}
          rowsPerPageOptions={CATALOGS.TABLE_PAGE_ROWS_OPTIONS}
        />
      )}

      <ReusableDialog
        open={isOpen}
        onClose={handleCloseModal}
        title={
          Boolean(modalItem)
            ? t('dimensions_cat_edit_modal', {ns: 'catalogs'})
            : t('dimensions_cat_add_modal', {ns: 'catalogs'})
        }
        actions={[
          {label: t('back_button'), onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
          {label: t('save_button'), onClick: handleSubmit(onSubmit), color: 'primary', variant: 'contained'}
        ]}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={CATALOGS.DIMENSIONS_FIELD_FLEX_SIZE} sx={{marginTop: COMMON.FORM_MARGIN_TOP}}>
              <FormControl fullWidth>
                <Controller
                  name={CATALOGS.DIMENSIONS_FIELD_NAME}
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      label={t('dimensions_cat_column_name', {ns: 'catalogs'})}
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
        onClose={handleCloseModal}
        title={t('dimensions_cat_delete_modal', {ns: 'catalogs'})}
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
            {t('dimensions_cat_delete_confirm_message', {ns: 'catalogs'})}
          </Typography>
        </Box>
      </ReusableDialog>
    </Fragment>
  )
}

export default DimensionsCat
