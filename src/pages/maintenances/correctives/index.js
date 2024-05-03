import {Fragment, useEffect, useState} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {
  Typography,
  Grid,
  FormControl,
  TextField,
  Box,
  Select,
  MenuItem,
  InputLabel,
  InputAdornment,
  Divider
} from '@mui/material'
import CardTable from 'src/components/cardTable'
import ReusableDialog from 'src/components/modal'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import {Pencil, Delete, TextBoxSearch} from 'mdi-material-ui'
import {toggleModal, setModalItem, setDeleteItem, toggleDeleteModal, toggleDetailModal, setDetailItem} from 'src/store/maintenances/correctives/reducer'
import {createMaintenance, deleteMaintenance, editMaintenance, getMaintenances} from 'src/store/maintenances/correctives/actions'
import {toggleMaterialModal, toggleDeleteMaterialModal, setMaterialDeleteItem} from 'src/store/maintenances/materials/reducer'
import { getMaterialsByServices, deleteMaterial } from 'src/store/maintenances/materials/actions'
import {getBranches} from 'src/store/catalogs/branches/actions'
import {MAINTENANCES, COMMON} from 'src/utils/constants'

import FallbackSpinner from 'src/@core/components/spinner'
import MultimediaUploader from 'src/components/multimediaUploader/MultimediaUploader'
import {t} from 'i18next'
import ServicesModal from 'src/views/details-modals/ServicesModal'
import MaterialsModal from 'src/views/details-modals/MaterialsModal'

const columns = [
  {
    flex: 0.25,
    minWidth: 200,
    field: 'name',
    headerName: 'Mantenimiento'
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'branchName',
    headerName: 'Sucursal'
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'description',
    headerName: 'descripciòn'
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'date',
    headerName: 'fecha'
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'zoneName',
    headerName: 'Zona'
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'cost',
    headerName: 'Costo'
  },
]

const materialsColumns = [
  {
    flex: 0.25,
    minWidth: 100,
    field: 'serviceID',
    type: 'singleSelect',
    headerName: 'Servicio',
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: 'serviceCatName',
    headerName: 'Cat material',
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: 'quantity',
    type: 'number',
    headerName: 'Cantidad',
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: 'units',
    headerName: 'Unidad',
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: 'unitCost',
    headerName: 'costo unidad',
  },
  {
    flex: 0.25,
    minWidth: 100,
    field: 'totalCost',
    type: 'number',
    headerName: 'Costo total',
  },
]

//component for services details format

const DetailsForm = ({control, resetField, reset, setValue, getValues }) => {

  const row = getValues()
  const [multimedia, setMultimedia] = useState([])
  const columns = [...materialsColumns]
  columns.splice(1, 1)
  
  const handleImagesUpdate = images => {
    setMultimedia(images)
  }

  return (
    <form>
      <Grid container spacing={5}>
        <Grid item xs={MAINTENANCES.MAINTENANCES_FIELD_FLEX_SIZE} md={3} sx={{marginTop: COMMON.FORM_MARGIN_TOP}}>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
            Servicio
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 200, fontSize: '0.875rem' }}>
            {row.service}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
            Poveedor
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 200, fontSize: '0.875rem' }}>
            {row.provider}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
            Area
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 200, fontSize: '0.875rem' }}>
            {row.area}
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
            Estatus
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 200, fontSize: '0.875rem' }}>
            {row.status}
          </Typography>
          <Divider variant="middle" />
          <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
            Fecha de aplicación
          </Typography>
          <Typography variant="subtitle1" sx={{ fontWeight: 200, fontSize: '0.875rem', textAlign: 'center' }}>
            {new Date(row.date).toLocaleDateString("es-Mx", { "day": "numeric", "month": "numeric", "year": "numeric" })}
          </Typography>
        </Grid>
        <Grid item xs={9} md={9} sx={{marginTop: '6px'}}>
          <FormControl fullWidth>
            <Controller
              name='evidencia'
              control={control}
              render={({field: {value, onChange}}) => 
              <>
                <MultimediaUploader 
                  field={"Evidencia digital"}
                  base64Images={[]} 
                  handleImages={handleImagesUpdate} 
                />
              </>
            }/>
          </FormControl>
        </Grid>
        <Grid item xs={8} md={8} sx={{marginTop: '6px'}}>
          <FormControl fullWidth>
            <Controller
              name='evidencia'
              control={control}
              render={({field: {value = []}}) => 
                <CardTable
                    columns={columns}
                    rows={value}
                    pageSize={MAINTENANCES.TABLE_PAGE_SIZE}
                    label={t('maintenances_materials_column_name',{ns: 'maintenances'})}
                  />
              }/>
          </FormControl>
        </Grid>
        <Grid item md={4} sx={{marginTop: COMMON.FORM_MARGIN_TOP, padding: '1rem', textAlign: 'center'}}>
          <Typography variant="subtitle1" sx={{ fontWeight: 200, fontSize: '0.875rem' }}>
            Costo del servicio
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
            $ {row.serviceCost}
          </Typography>
          <Divider variant="middle" />
          <Typography variant="subtitle1" sx={{ fontWeight: 200, fontSize: '0.875rem' }}>
            Costo total de los materiales
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
            $ {row.materialCost}
          </Typography>
        </Grid>
      </Grid>
    </form>
  )
}

const Maintenances = () => {
  const dispatch = useDispatch()

  const {isOpen, modalItem, isDeleteOpen, isDetailsOpen, maintenances, isLoading, modalDeleteItem} = useSelector(
    state => state.maintenances
  )
  const { services } = useSelector(state => state.services)
  const { isModalOpen, materials, isMaterialDeleteOpen, modalDeleteMaterial } = useSelector(state => state.materials)
  const [selectedMaint, setSelectedMaint] = useState([])
  //branches
  const {branches} = useSelector(state => state.branches)
  //motivo
  const motivos = [
    { name: 'Preventivos', value: 'Preventivos'},
    { name: 'Siniestros', value: 'Siniestros'}
  ]

  const {control, handleSubmit, resetField, reset, setValue, getValues} = useForm({
    defaultValues: {
      area: undefined,
      areaID: undefined,
      branchID: undefined,
      cost: undefined,
      description: undefined,
      evidencia: undefined,
      materials: undefined,
      motive: undefined,
      notes: undefined,
      provider: undefined,
      services: undefined
    }
  })

  useEffect(() => {
    dispatch(getMaintenances())
  }, [dispatch])

  // de un arreglo de ids de servicios, obtiene los materiales de esos servicios
  useEffect(() => {
    if(services.length > 0) {
      dispatch(getMaterialsByServices(services))
    }
  }, [services, dispatch])

  const handleCloseModal = () => {
    reset()
    const cleanModal = null
    dispatch(toggleModal(false))
    dispatch(setModalItem(cleanModal))
  }

  const handleCloseDetailsModal = () => {
    const cleanModal = null
    setSelectedMaint([])
    dispatch(toggleDetailModal(false))
    dispatch(setDetailItem(cleanModal))
  }

  const handleCloseDeleteModal = () => {
    const cleanModal = null
    dispatch(toggleDeleteModal(false))
    dispatch(setDeleteItem(cleanModal))
  }

  const handleOpenModal = row => {
    reset(row)
    //AL editar
    dispatch(getBranches())
    dispatch(toggleModal(true))
    dispatch(setModalItem(row))
  }

  const handleDetailModal = params => {
    const {row, open} = params
    reset(row)
    setSelectedMaint(row)
    dispatch(getBranches())
    dispatch(toggleDetailModal(open))
    dispatch(setDetailItem(row))
  }

  const handleAddItem = () => {
    reset({})
    dispatch(toggleModal(true))
    dispatch(getBranches())
    dispatch(setModalItem(null))
  }
  // materials
  const handleAddMaterial = () => {
    reset({})
    dispatch(toggleMaterialModal(true))
  }

  const handleDelMaterial = (row) => {
    dispatch(toggleDeleteMaterialModal(true))
    dispatch(setMaterialDeleteItem(row))
  }

  const handleCloseMaterialDeleteModal = () => {
    dispatch(toggleDeleteMaterialModal(false))
  }

  const handleMaterialDeleteConfirm = () => {
    const values = { ...modalDeleteMaterial, services}
    dispatch(deleteMaterial(values))
    handleCloseMaterialDeleteModal()
  }

  const handleEditMaterial = row => {
    reset(row)
    //AL editar
    dispatch(toggleMaterialModal(true))
  }

  const handleDeleteModal = row => {
    dispatch(toggleDeleteModal(true))
    dispatch(setDeleteItem(row))
  }

  const handleDeleteConfirm = () => {
    dispatch(deleteMaintenance(modalDeleteItem))
    handleCloseDeleteModal()
  }

  const onSubmit = values => {
    if (Boolean(modalItem)) {
      dispatch(editMaintenance(values))
    } else {
      dispatch(createMaintenance(values))
    }
    handleCloseModal()
  }

  const actionableMaterialColumns = [
    ...materialsColumns,
    {
      flex: 0.125,
      minWidth: 120,
      field: 'actions',
      headerName: 'Acciones',
      renderCell: params => {
        const row = params?.row
        return (
          <Typography variant='body2' sx={{color: '#6495ED', cursor: 'pointer'}}>
            <Pencil sx={{margin: '5px'}} onClick={() => handleEditMaterial(row)} />
            <Delete sx={{margin: '5px'}} onClick={() => handleDelMaterial(row)} />
          </Typography>
        )
      }
    }
  ]

  const actionableColumns = [
    ...columns,
    {
      flex: 0.125,
      minWidth: 120,
      field: 'actions',
      headerName: 'Acciones',
      renderCell: params => {
        const row = params?.row
        return (
          <Typography variant='body2' sx={{color: '#6495ED', cursor: 'pointer'}}>
            <Pencil sx={{margin: '5px'}} onClick={() => handleOpenModal(row)} />
            <TextBoxSearch sx={{margin: '5px'}} onClick={() => handleDetailModal({row, open: true})} />
            <Delete sx={{margin: '5px'}} onClick={() => handleDeleteModal(row)} />
          </Typography>
        )
      }
    }
  ]

  const handleBranch = (e, onChange) => {
    onChange(e.target.value)
    const zoneID = branches.filter(branch => branch.id === e.target.value)[0].zoneID
    setValue('zoneID', zoneID)
  }

  return (
    <Fragment>
      {isLoading ? (
        <FallbackSpinner />
      ) : (
        <CardTable
          showAddButton
          columns={actionableColumns}
          rows={maintenances}
          pageSize={MAINTENANCES.TABLE_PAGE_SIZE}
          label={t('maintenances_column_name', {ns: 'maintenances'})}
          onAddItem={handleAddItem}
        />
      )}
      <ReusableDialog
        open={isOpen}
        size={"xl"}
        onClose={handleCloseModal}
        title={Boolean(modalItem) ? 'editar' : 'Reportar Mantenimiento Correctivo'}
        actions={[
          {label: 'Regresar', onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
          {label: 'Reportar', onClick: handleSubmit(onSubmit), color: 'primary', variant: 'contained'}
        ]}
      >
        <form>
          <Grid container spacing={5}>
          <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='name'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Nombre del mantenimiento' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={MAINTENANCES.MAINTENANCES_FIELD_FLEX_SIZE} md={6} sx={{marginTop: COMMON.FORM_MARGIN_TOP}}>
              <FormControl fullWidth>
                <Controller
                  name='branchID'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <>
                      <InputLabel>Sucursal</InputLabel>
                      <Select
                        defaultValue=''
                        value={value || ''}
                        label='Sucursal'
                        onChange={e => handleBranch(e, onChange)}
                      >
                        {branches?.map((branch, id) => (
                          <MenuItem key={id} value={branch.id}>
                            {branch.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
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
                      label={t('services.columns.date', {ns: 'maintenances'})}
                      InputLabelProps={{shrink: true}}
                      value={value || ''}
                      onChange={onChange}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='description'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Descripcion de mantenimiento' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='cost'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField
                      label='Costo inicial'
                      value={value}
                      onChange={onChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <AttachMoneyIcon />
                          </InputAdornment>
                        )
                      }}
                    />
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
                    <TextField multiline rows={4} label='Comentarios' value={value} onChange={onChange} />
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
        title={'Borrar'}
        actions={[
          {label: 'Regresar', onClick: handleCloseDeleteModal, color: 'primary', variant: 'outlined'},
          {label: 'Eliminar', onClick: handleDeleteConfirm, color: 'primary', variant: 'contained'}
        ]}
      >
        <Box>
          <Typography variant='body2'>Seguro de eliminar el mantenimiento seleccionado?</Typography>
        </Box>
      </ReusableDialog>
      <ReusableDialog
          open={isDetailsOpen}
          onClose={handleCloseDetailsModal}
          size={"xl"}
          title={'Detalles del mantenimiento'}
          actions={[
            {label: 'Regresar', onClick: handleCloseDetailsModal, color: 'primary', variant: 'outlined'},
          ]}
        >
          <form>
            <Grid container spacing={5}>
              <Grid item xs={MAINTENANCES.MAINTENANCES_FIELD_FLEX_SIZE} md={3} sx={{marginTop: COMMON.FORM_MARGIN_TOP}}>
                  <FormControl fullWidth>
                    <Controller
                      name='branchID'
                      control={control}
                      render={({field: {value, onChange}}) => (
                        <>
                          <InputLabel>Sucursal</InputLabel>
                          <Select
                            defaultValue=""
                            value={value || ''}
                            label="Sucursal"
                            onChange={(e) => handleBranch(e, onChange)}
                          >
                            {branches?.map((branch, id) => 
                              <MenuItem key={id} value={branch.id}>{branch.name}</MenuItem>
                            )}
                          </Select>
                        </>
                      )}
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{marginTop: '12px'}}>
                    <Controller
                      name='description'
                      control={control}
                      render={({field: {value, onChange}}) => <TextField label='Descripcion de mantenimiento' value={value} onChange={onChange} />}
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{marginTop: '48px'}}>
                    <Controller
                      name='motive'
                      control={control}
                      render={({field: {value, onChange}}) => (
                        <>
                          <InputLabel>Motivo</InputLabel>
                          <Select
                            defaultValue=""
                            value={value || ''}
                            label="Motivo"
                            onChange={(e) => handleBranch(e, onChange)}
                          >
                            {motivos?.map((motive, id) => 
                              <MenuItem key={id} value={motive.id}>{motive.name}</MenuItem>
                            )}
                          </Select>
                        </>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={9} sx={{marginTop: '6px'}} >
                  <ServicesModal
                    cardTitle={t('maintenances_services_column_name', {ns: 'maintenances'})}
                    maintenance={selectedMaint}
                  />
                </Grid>
                <Grid item xs={7} md={7} sx={{marginTop: '6px'}}>
                  <CardTable
                    showAddButton
                    columns={actionableMaterialColumns}
                    rows={materials}
                    pageSize={MAINTENANCES.TABLE_PAGE_SIZE}
                    label={t('materials.title', {ns: 'maintenances'})}
                    onAddItem={handleAddMaterial}
                  />
                  <MaterialsModal
                    isOpen={isModalOpen}
                    control={control}
                    handleSubmit={handleSubmit}
                  />
                </Grid>
                <Grid item xs={5} md={5} sx={{marginTop: '6px'}}>
                  <FormControl fullWidth sx={{marginTop: '12px'}}>
                    <Controller
                      name='notes'
                      control={control}
                      render={({field: {value, onChange}}) => 
                        <TextField 
                          multiline
                          rows={8}
                          label='Comentarios' 
                          value={value} 
                          onChange={onChange} 
                        />}
                    />
                  </FormControl>
                </Grid>
            </Grid>
          </form>
          <ReusableDialog
            open={isMaterialDeleteOpen}
            size={"md"}
            onClose={handleCloseMaterialDeleteModal}
            title={'Borrar'}
            actions={[
              {label: 'Regresar', onClick: handleCloseMaterialDeleteModal, color: 'primary', variant: 'outlined'},
              {label: 'Eliminar', onClick: handleMaterialDeleteConfirm, color: 'primary', variant: 'contained'}
            ]}
          >
            <Box>
              <Typography variant='body2'>Seguro de eliminar el material seleccionado?</Typography>
            </Box>
          </ReusableDialog>
        </ReusableDialog>
    </Fragment>
  )
}

export default Maintenances
