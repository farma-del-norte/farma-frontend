import {Fragment, useEffect, useState} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {Typography, Grid, FormControl, TextField, Box, InputLabel, Select, MenuItem, FormHelperText} from '@mui/material'
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
import i18n from 'src/configs/i18n'
import { getZones } from 'src/store/catalogs/zones/actions'
import CustomSnackbar from 'src/components/snackbar/CustomSnackbar'
import {closeSnackBar} from 'src/store/notifications'
import COMMON_LOCALE from 'src/utils/locales/common'
import CATALOGS_LOCALE from 'src/utils/locales/catalogs'
import FallbackSpinner from 'src/@core/components/spinner'
import {DetailTypography} from 'src/components/styledComponents/typography'
import BranchDetailsModel from 'src/views/details-modals/BranchDetailsModal'
import BranchDetailsFormModal from 'src/views/details-modals/BranchDetailsFormModal'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { onZipCodeChange } from 'src/utils/functions'
import { ExpandedContent } from 'src/components/expandedContent/ExpandedContent'
import { DetailsForm } from 'src/views/forms/branch-details/DetailsForm'
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
  name: '',
  street: '',
  neighborhood: '',
  zipCode: '',
  city: '',
  federalEntity: '',
  zoneID: '',
  details: {}
}

function Branches() {
  const {isOpen, isDetailsModalOpen, modalItem, isDeleteOpen, isLoading, branches} = useSelector(
    state => state.branches
  )
  const {zones} = useSelector(state => state.zones)
  const {open, message, severity} = useSelector(state => state.notifications)
  const [colonies, setColonies] = useState({})

  const branchesInfoSchema = yup.object().shape({
    name: yup.string().max(60, CATALOGS_LOCALE.BRANCHES_NAME_MAX_LENGTH).required(CATALOGS_LOCALE.BRANCHES_NAME_REQUIRED),
    street: yup.string().max(100, CATALOGS_LOCALE.BRANCHES_STREET_MAX_LENGTH).required(CATALOGS_LOCALE.BRANCHES_STREET_REQUIRED),
    neighborhood: yup.string().max(100, CATALOGS_LOCALE.BRANCHES_NEIGHBOR_MAX_LENGTH).required(CATALOGS_LOCALE.BRANCHES_NEIGHBOR_REQUIRED),
    zipCode: yup.number().integer().positive(CATALOGS_LOCALE.BRANCHES_ZIPCODE_ISNUMERIC).min(1000, CATALOGS_LOCALE.BRANCHES_ZIPCODE_MIN_LENGTH).max(99999, CATALOGS_LOCALE.BRANCHES_ZIPCODE_MAX_LENGTH).required(CATALOGS_LOCALE.BRANCHES_ZIPCODE_REQUIRED),
    city: yup.string().max(60, CATALOGS_LOCALE.BRANCHES_CITY_MAX_LENGTH).required(CATALOGS_LOCALE.BRANCHES_CITY_REQUIRED),
    federalEntity: yup.string().max(60, CATALOGS_LOCALE.BRANCHES_FEDERAL_ENTITY_MAX_LENGTH).required(CATALOGS_LOCALE.BRANCHES_FEDERAL_ENTITY_REQUIRED),
    zoneID: yup.string().required(CATALOGS_LOCALE.BRANCHES_SELECT_REQUIRED),
  })

  const {control, handleSubmit, reset, setValue, formState: {errors: branchErrors}} = useForm({
    defaultValues: defaultValuesBranches,
    resolver: yupResolver(branchesInfoSchema)
  })
  const dispatch = useDispatch()
  const [pharmacyImages, setPharmacyImages] = useState([])
  const [bluePrintImages, setBlueprintImages] = useState([])

  useEffect(() => {
    dispatch(setBranchDetails(null))
    if ((branches == undefined || branches.length) == 0 && !isLoading) {
      dispatch(getBranches())
      dispatch(getZones())
    }
  }, [dispatch, branches, isLoading])

  useEffect(() => {
    if(colonies.hasOwnProperty("zipCode")) {
      setValue("neighborhood", colonies.colony)
      setValue("city", colonies.city)
      setValue("federalEntity", colonies.federalEntity)
    }
  },[colonies, setValue])

  const onSubmit = values => {
    //Si es true elimina details del objeto
    if(Object.values(values.details).every(value => value === undefined || value === "")){
      delete values.details
    }
    if (modalItem) {
      dispatch(editBranch(values))
    } else {
      dispatch(createBranch(values))
    }
    handleCloseModal()
  }

  const handleConfirmDelete = async () => {
    dispatch(deleteBranch(modalItem))
    handleCloseDeleteModal()
  }

  const handleAddItem = () => {
    reset({})
    setColonies({})
    dispatch(toggleModal(true))
  }

  const handleOpenModal = params => {
    const {row, open} = params
    console.log(row)
    reset(row)
    dispatch(toggleModal(open))
    dispatch(setModalItem(row))
  }

  const handleCloseModal = () => {
    setExpanded(false)
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
        title={Boolean(modalItem) ? CATALOGS_LOCALE.BRANCHES_EDIT_MODAL : CATALOGS_LOCALE.BRANCHES_ADD_MODAL}
        actions={[
          {label: COMMON_LOCALE.BACK_BUTTON, onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
          Boolean(modalItem)
            ? {
                label: COMMON_LOCALE.UPDATE_BUTTON,
                onClick: handleSubmit(onSubmit),
                color: 'primary',
                variant: 'contained'
              }
            : {
                label: COMMON_LOCALE.SAVE_BUTTON,
                onClick: handleSubmit(onSubmit),
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
                    <TextField 
                      label='Sucursal' 
                      value={value} 
                      onChange={onChange} 
                      color={branchErrors.name ? "error" : ""}
                      focused={branchErrors.name}  
                    />
                  )}
                />
                {branchErrors.name && <FormHelperText error>{branchErrors.name.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='street'
                  control={control}
                  render={({field: {value, onChange}}) => <TextField label='Calle' value={value} color={branchErrors.street ? "error" : ""} focused={branchErrors.street}   onChange={onChange} />}
                />
                {branchErrors.street && <FormHelperText error>{branchErrors.street.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='neighborhood'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField 
                      label='Colonia' 
                      value={colonies.colony || ''} 
                      color={branchErrors.neighborhood ? "error" : ""} 
                      focused={branchErrors.neighborhood} 
                      InputLabelProps={{
                        shrink: colonies.hasOwnProperty("colony"),
                      }} 
                      onChange={onChange} 
                      disabled/>
                  )}
                />
                {branchErrors.neighborhood && <FormHelperText error>{branchErrors.neighborhood.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name='zipCode'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Código Postal' value={value} color={branchErrors.zipCode ? "error" : ""} focused={branchErrors.zipCode} onChange={(e) => onZipCodeChange(e, onChange, setColonies)} />
                  )}
                />
                {branchErrors.zipCode && <FormHelperText error>{branchErrors.zipCode.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='city'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField 
                      label='Ciudad' 
                      value={colonies.city || ''} 
                      color={branchErrors.city ? "error" : ""} 
                      focused={branchErrors.city} 
                      InputLabelProps={{
                        shrink: colonies.hasOwnProperty("city"),
                      }}
                      onChange={onChange} 
                      disabled/>
                  )}
                />
                {branchErrors.city && <FormHelperText error>{branchErrors.city.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='federalEntity'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField 
                      label='Estado' 
                      value={colonies.federalEntity || ''} 
                      color={branchErrors.city ? "error" : ""} 
                      focused={branchErrors.federalEntity} 
                      onChange={onChange} 
                      InputLabelProps={{
                        shrink: colonies.hasOwnProperty("federalEntity"),
                      }}
                      disabled/>
                  )}
                />
                {branchErrors.federalEntity && <FormHelperText error>{branchErrors.federalEntity.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} sx={{marginTop: '6px'}}>
              <FormControl fullWidth error={branchErrors.zoneID} focused={branchErrors.zoneID}>
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
                {branchErrors.zoneID && <FormHelperText error>{branchErrors.zoneID.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} sx={{marginTop: '6px'}}>
              <ExpandedContent
                label={CATALOGS_LOCALE.BRANCHES_DETAILS_EXPANDABLE_TITLE}
              >
                <DetailsForm
                  control={control}
                  handleSubmit={handleSubmit}
                  handlePharmacyImageUpdate={handlePharmacyImageUpdate}
                  handleBlueprintImageUpdate={handleBlueprintImageUpdate}
                />
              </ExpandedContent>
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
