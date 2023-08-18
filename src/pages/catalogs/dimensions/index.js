import {useEffect} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {Typography, Grid, FormControl, TextField, Box} from '@mui/material'
import {Pencil, Delete} from 'mdi-material-ui'

import {setModalItem, toggleModal, toggleDeleteModal, setDeleteItem} from 'src/store/catalogs/dimensions/reducer'

import {getDimensions, editDimension, createDimension, deleteDimension} from 'src/store/catalogs/dimensions/actions'

import ReusableDialog from 'src/pages/components/modal'
import CardTable from 'src/pages/components/cardTable'
import {dimensions_locale} from 'src/utils/localization'
import {Fragment} from 'react'
import FallbackSpinner from 'src/@core/components/spinner'
import CustomSnackbar from 'src/views/components/snackbar/CustomSnackbar'
import {closeSnackBar, openSnackBar} from 'src/store/notifications'

const columns = [
  {
    flex: 0.25,
    minWidth: 200,
    field: 'name',
    headerName: 'Nombre'
  }
]

const defaultValuesDimensions = {
  id: '',
  name: '',
  dimension: '',
  active: ''
}

function Dimensions() {
  const dispatch = useDispatch()
  const {isOpen, modalItem, isDeleteOpen, isLoading, dimensions, modalDeleteItem} = useSelector(
    state => state.dimensions
  )
  const {open, message, severity} = useSelector(state => state.notifications)

  const isEdit = Boolean(modalItem)

  const {control, handleSubmit, reset} = useForm({
    defaultValues: defaultValuesDimensions
  })

  useEffect(() => {
    dispatch(getDimensions())
  }, [])

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
    dispatch(deleteDimension(modalDeleteItem))
    handleCloseDeleteModal()
  }

  const onSubmit = values => {
    if (isEdit) {
      dispatch(editDimension(values))
    } else {
      dispatch(createDimension(values))
    }
    handleCloseModal()
  }

  const editTitle = dimensions_locale.edit // Returns 'Editar dimension seleccionada'
  const addTitle = dimensions_locale.add // Returns 'Agregar dimension'
  const deleteTitle = dimensions_locale.delete // Returns 'Eliminar dimension'

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
          rows={dimensions}
          label='Dimension'
          onAddItem={handleAddItem}
          pageSize={5}
          rowsPerPageOptions={[7, 10, 25, 50]}
        />
      )}

      <ReusableDialog
        open={isOpen}
        onClose={handleCloseModal}
        title={isEdit ? editTitle : addTitle}
        actions={[
          {label: 'Regresar', onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
          {label: 'Guardar', onClick: handleSubmit(onSubmit), color: 'primary', variant: 'contained'}
        ]}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={12} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='name'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Nombre' value={value} onChange={onChange} />
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
        title={deleteTitle}
        actions={[
          {label: 'Regresar', onClick: handleCloseDeleteModal, color: 'primary', variant: 'outlined'},
          {label: 'Guardar', onClick: handleDeleteConfirm, color: 'primary', variant: 'contained'}
        ]}
      >
        <Box>
          <Typography variant='body2'>Seguro de eliminar la dimension seleccionada?</Typography>
        </Box>
      </ReusableDialog>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </Fragment>
  )
}

export default Dimensions
