import {Fragment, useEffect, useReducer, useState} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {Typography, Grid, FormControl, TextField, Box} from '@mui/material'
import {styled} from '@mui/material/styles'
import CardTable from 'src/components/cardTable'
import ReusableDialog from 'src/components/modal'
import {Pencil, Delete, TextBoxSearch} from 'mdi-material-ui'
import {
  toggleModal,
  setModalItem,
  toggleDeleteModal,
  setActiveBranch,
  setIsDetailsModalOpen,
  setBranchDetails
} from 'src/store/catalogs/branches/reducer'
import {
  createBranch,
  deleteBranch,
  editBranch,
  getBranchDetails,
  getBranches
} from 'src/store/catalogs/branches/actions'
import CustomSnackbar from 'src/components/snackbar/CustomSnackbar'
import {closeSnackBar} from 'src/store/notifications'
import COMMON_LOCALE from 'src/utils/locales/common'
import FallbackSpinner from 'src/@core/components/spinner'
import {DetailTypography} from 'src/components/styledComponents/typography'
import BranchDetailsModel from 'src/views/details-modals/BranchDetailsModal'
import BranchDetailsFormModal from 'src/views/details-modals/BranchDetailsFormModal'
// import DetailsModal from './detailsmodal'

const columns = [
  {
    flex: 0.25,
    minWidth: 200,
    field: 'name',
    headerName: 'Sucursal'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'street',
    headerName: 'Calle'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'neighborhood',
    headerName: 'Colonia'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'zipCode',
    headerName: 'Código Postal'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'city',
    headerName: 'Ciudad'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'federalEntity',
    headerName: 'Estado'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'zoneName',
    headerName: 'Zona'
  }
]

const defaultValuesBranches = {
  id: '',
  name: '',
  sucursal: '',
  active: ''
}

function Branches() {
  const {isOpen, isDetailsModalOpen, modalItem, isDeleteOpen, isLoading, branches} = useSelector(
    state => state.branches
  )
  const {open, message, severity} = useSelector(state => state.notifications)
  const {control, handleSubmit, reset} = useForm({
    defaultValues: {}
  })
  const dispatch = useDispatch()
  const [pharmacyImages, setPharmacyImages] = useState([])
  const [bluePrintImages, setBlueprintImages] = useState([])

  useEffect(() => {
    dispatch(setBranchDetails(null))
    if ((branches == undefined || branches.length) == 0 && !isLoading) {
      dispatch(getBranches())
    }
  }, [dispatch, branches, isLoading])

  const onSubmit = async values => {
    if (modalItem) {
      handleUpdateBranch(values)
    } else {
      handleAddBranch(values)
    }
  }

  const handleAddBranch = async values => {
    dispatch(createBranch(values))
    handleCloseModal()
  }

  const handleUpdateBranch = async values => {
    dispatch(editBranch(values))
    handleCloseModal()
  }

  const handleConfirmDelete = async () => {
    dispatch(deleteBranch(modalItem))
    handleCloseDeleteModal()
  }

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

  const handleCloseModal = () => {
    dispatch(toggleModal(false))
    dispatch(setModalItem(null))
  }

  const handleDeleteModal = params => {
    const {row, open} = params
    reset(row)
    dispatch(toggleDeleteModal(open))
    dispatch(setModalItem(row))
  }

  const handleCloseDeleteModal = () => {
    dispatch(toggleDeleteModal(false))
    dispatch(setModalItem(null))
  }

  const handleOpenBranchDetailsModal = branch => {
    dispatch(setIsDetailsModalOpen(true))
    dispatch(setActiveBranch(branch))
    dispatch(getBranchDetails(branch.detailsID))
  }

  const handlePharmacyImageUpdate = images => {
    setPharmacyImages(images)
  }

  const handleBlueprintImageUpdate = images => {
    setBlueprintImages(images)
  }

  const handleCloseFormModal = () => {}

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
            <TextBoxSearch sx={{margin: '2px'}} onClick={() => handleOpenBranchDetailsModal(row)} />
            <Pencil sx={{margin: '2px'}} onClick={() => handleOpenModal({row, open: true})} />
            <Delete sx={{margin: '2px'}} onClick={() => handleDeleteModal({row, open: true})} />
          </Typography>
        )
      }
    }
  ]

  return isLoading ? (
    <FallbackSpinner />
  ) : (
    <Fragment>
      <CardTable
        showAddButton
        columns={actionableColumns}
        rows={branches}
        label='Sucursales'
        onAddItem={handleAddItem}
      />
      {isDetailsModalOpen ? <BranchDetailsModel reset={reset} /> : null}
      <ReusableDialog
        open={isOpen}
        onClose={handleCloseModal}
        title={Boolean(modalItem) ? 'Editar Sucursal' : 'Agregar Sucursal'}
        actions={[
          {label: COMMON_LOCALE.BACK_BUTTON, onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
          Boolean(modalItem)
            ? {
                label: COMMON_LOCALE.UPDATE_BUTTON,
                onClick: handleSubmit(handleUpdateBranch),
                color: 'primary',
                variant: 'contained'
              }
            : {
                label: COMMON_LOCALE.SAVE_BUTTON,
                onClick: handleSubmit(handleAddBranch),
                color: 'primary',
                variant: 'contained'
              }
        ]}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='name'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Sucursal' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='street'
                  control={control}
                  render={({field: {value, onChange}}) => <TextField label='Calle' value={value} onChange={onChange} />}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='neighborhood'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Colonia' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name='zipCode'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Código Postal' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='city'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Ciudad' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='federalEntity'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Estado' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='latitude'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Latitud' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='longitude'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Longitud' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='zoneName'
                  control={control}
                  render={({field: {value, onChange}}) => <TextField label='Zona' value={value} onChange={onChange} />}
                />
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </ReusableDialog>
      <BranchDetailsFormModal
        isOpen={isDetailsModalOpen}
        control={control}
        handleSubmit={handleSubmit}
        handlePharmacyImageUpdate={handlePharmacyImageUpdate}
        handleBlueprintImageUpdate={handleBlueprintImageUpdate}
      />
      <ReusableDialog
        open={isDeleteOpen}
        onClose={handleCloseDeleteModal}
        title={'Eliminar Sucursal'}
        actions={[
          {
            label: COMMON_LOCALE.BACK_BUTTON,
            onClick: handleCloseDeleteModal,
            color: 'primary',
            variant: 'outlined'
          },
          {label: COMMON_LOCALE.DELETE_BUTTON, onClick: handleConfirmDelete, color: 'primary', variant: 'contained'}
        ]}
      >
        <Box>
          <Typography variant='body2'>Seguro de eliminar el sucursal seleccionado?</Typography>
        </Box>
      </ReusableDialog>
      <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
    </Fragment>
  )
}

export default Branches