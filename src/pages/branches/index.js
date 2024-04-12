import {Fragment, useEffect, useState} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {
  Typography,
  Grid,
  FormControl,
  TextField,
  Box,
  FormHelperText,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material'
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
import {t} from 'i18next'
import {getZones} from 'src/store/catalogs/zones/actions'
import {closeSnackBar} from 'src/store/notifications'
import FallbackSpinner from 'src/@core/components/spinner'
import BranchDetailsModel from 'src/views/details-modals/BranchDetailsModal'
import BranchDetailsFormModal from 'src/views/details-modals/BranchDetailsFormModal'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {onZipCodeChange} from 'src/utils/functions'
import {ExpandedContent} from 'src/components/expandedContent/ExpandedContent'
import {DetailsForm} from 'src/views/forms/branch-details/DetailsForm'
// import DetailsModal from './detailsmodal'

const columns = [
  {
    flex: 0.25,
    minWidth: 200,
    field: 'name',
    headerName: t('branch', {ns: 'branches'})
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'street',
    headerName: t('zipcode', {ns: 'branches'})
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'neighborhood',
    headerName: t('colony', {ns: 'branches'})
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'zipCode',
    headerName: t('zipcode', {ns: 'branches'})
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'city',
    headerName: t('city', {ns: 'branches'})
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'federalEntity',
    headerName: t('state', {ns: 'branches'})
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'zoneName',
    headerName: t('zone', {ns: 'branches'})
  }
]

const defaultValuesBranches = {
  name: null,
  street: null,
  neighborhood: null,
  zipCode: null,
  city: null,
  federalEntity: null,
  zoneID: null,
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
    name: yup
      .string()
      .max(60, t('branch_name_max_length', {ns: 'branches'}))
      .required(t('branch_name_required', {ns: 'branches'})),
    street: yup
      .string()
      .max(100, t('branch_street_max_length', {ns: 'branches'}))
      .required(t('branch_street_required', {ns: 'branches'})),
    neighborhood: yup
      .string()
      .max(100, t('branch_colony_required', {ns: 'branches'}))
      .required(t('branch_colony_max_length', {ns: 'branches'})),
    zipCode: yup
      .number()
      .integer()
      .positive(t('branch_zipode_positive_number_required', {ns: 'branches'}))
      .min(1000, t('branch_zipcode_min_length', {ns: 'branches'}))
      .max(99999, t('branch_zipcode_max_length', {ns: 'branches'}))
      .required(t('branch_zipcode_required', {ns: 'branches'})),
    city: yup
      .string()
      .max(60, t('branch_city_max_length', {ns: 'branches'}))
      .required(t('branch_city_required', {ns: 'branches'})),
    federalEntity: yup
      .string()
      .max(60, t('branch_state_max_length', {ns: 'branches'}))
      .required(t('branch_state_required', {ns: 'branches'})),
    zoneID: yup.string().required(t('branch_select_required', {ns: 'branches'}))
  })

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {errors: branchErrors}
  } = useForm({
    defaultValues: defaultValuesBranches,
    resolver: yupResolver(branchesInfoSchema)
  })
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setBranchDetails(null))
    if ((branches == undefined || branches.length) == 0 && !isLoading) {
      dispatch(getBranches())
      dispatch(getZones())
    }
  }, [dispatch, branches, isLoading])

  useEffect(() => {
    if (colonies.hasOwnProperty('zipCode')) {
      setValue('neighborhood', colonies.colony)
      setValue('city', colonies.city)
      setValue('federalEntity', colonies.federalEntity)
    }
  }, [colonies, setValue])

  const onSubmit = values => {
    //Si es true elimina details del objeto
    if (Object.values(values.details).every(value => value === undefined || value === '')) {
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
    reset(row)
    dispatch(toggleModal(open))
    dispatch(setModalItem(row))
  }

  const handleCloseModal = () => {
    // setExpanded(false)
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
      headerName: t('actions'),
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
        label={t('branches', {ns: 'branches'})}
        onAddItem={handleAddItem}
      />
      {isDetailsModalOpen ? <BranchDetailsModel reset={reset} /> : null}
      <ReusableDialog
        open={isOpen}
        onClose={handleCloseModal}
        title={Boolean(modalItem) ? t('edit_branch', {ns: 'branches'}) : t('add_branch', {ns: 'branches'})}
        actions={[
          {label: t('back_button'), onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
          Boolean(modalItem)
            ? {
                label: t('update_button'),
                onClick: handleSubmit(onSubmit),
                color: 'primary',
                variant: 'contained'
              }
            : {
                label: t('save_button'),
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
                      error={branchErrors.name}
                      label={t('branch', {ns: 'branches'})}
                      value={value}
                      onChange={onChange}
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
                  render={({field: {value, onChange}}) => (
                    <TextField
                      label={t('street', {ns: 'branches'})}
                      value={value}
                      error={branchErrors.street}
                      focused={branchErrors.street}
                      onChange={onChange}
                    />
                  )}
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
                      label={t('colony', {ns: 'branches'})}
                      value={colonies.colony || ''}
                      error={branchErrors.neighborhood}
                      focused={branchErrors.neighborhood}
                      InputLabelProps={{
                        shrink: colonies.hasOwnProperty('colony')
                      }}
                      onChange={onChange}
                      disabled
                    />
                  )}
                />
                {branchErrors.neighborhood && (
                  <FormHelperText error>{branchErrors.neighborhood.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <Controller
                  name='zipCode'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      label={t('zipcode', {ns: 'branches'})}
                      value={value}
                      error={branchErrors.zipCode}
                      focused={branchErrors.zipCode}
                      onChange={e => onZipCodeChange(e, onChange, setColonies)}
                    />
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
                      label={t('city', {ns: 'branches'})}
                      value={colonies.city || ''}
                      error={branchErrors.city}
                      focused={branchErrors.city}
                      InputLabelProps={{
                        shrink: colonies.hasOwnProperty('city')
                      }}
                      onChange={onChange}
                      disabled
                    />
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
                      label={t('state', {ns: 'branches'})}
                      value={colonies.federalEntity || ''}
                      error={branchErrors.city}
                      focused={branchErrors.federalEntity}
                      onChange={onChange}
                      InputLabelProps={{
                        shrink: colonies.hasOwnProperty('federalEntity')
                      }}
                      disabled
                    />
                  )}
                />
                {branchErrors.federalEntity && (
                  <FormHelperText error>{branchErrors.federalEntity.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} sx={{marginTop: '6px'}}>
              <FormControl fullWidth error={branchErrors.zoneID} focused={branchErrors.zoneID}>
                <Controller
                  name='zoneID'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <>
                      <InputLabel>{t('zone', {ns: 'branches'})}</InputLabel>
                      <Select
                        defaultValue={''}
                        value={value || ''}
                        label={t('zone', {ns: 'branches'})}
                        onChange={onChange}
                      >
                        {zones.map((zone, i) => (
                          <MenuItem key={i} value={zone.id}>
                            {zone.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  )}
                />
                {branchErrors.zoneID && <FormHelperText error>{branchErrors.zoneID.message}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12} sx={{marginTop: '6px'}}>
              <ExpandedContent label={t('add_details_optional', {ns: 'branches'})}>
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
        title={t('delete_branch', {ns: 'branches'})}
        actions={[
          {
            label: t('back_button'),
            onClick: handleCloseDeleteModal,
            color: 'primary',
            variant: 'outlined'
          },
          {label: t('delete_button'), onClick: handleConfirmDelete, color: 'primary', variant: 'contained'}
        ]}
      >
        <Box>
          <Typography variant='body2'>{t('delete_branch_question', {ns: 'branches'})}</Typography>
        </Box>
      </ReusableDialog>
    </Fragment>
  )
}

export default Branches
