import {Fragment, useEffect, useState, useMemo} from 'react'
import {useForm, Controller} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {Typography, Grid, FormControl, TextField, Box, Select, MenuItem, InputLabel, InputAdornment} from '@mui/material'
import CardTable from 'src/components/cardTable'
import ReusableDialog from 'src/components/modal'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {Pencil, Delete, TextBoxSearch } from 'mdi-material-ui'
import {toggleModal, setModalItem, setDeleteItem, toggleDeleteModal} from 'src/store/maintenances/services/reducer'
import {toggleMaterialModal, setIsEditing} from 'src/store/maintenances/materials/reducer'
import {createServices, deleteServices, editServices, getServices} from 'src/store/maintenances/services/actions'
import {createMediaService, getMediaByOwnerId, editMediaService} from 'src/store/media/actions'
import { getServicesCat } from 'src/store/catalogs/services/actions'
import { getSuppliers } from 'src/store/catalogs/suppliers/actions'
import {getMaterialsCat} from 'src/store/catalogs/materials/actions'
import {getDimensionsCat} from 'src/store/catalogs/dimensions/actions'
import {getVariablesCat} from 'src/store/catalogs/variables/actions'
import {getConceptsCat} from 'src/store/catalogs/concepts/actions'
import {MAINTENANCES, COMMON} from 'src/utils/constants'
import CustomSnackbar from 'src/components/snackbar/CustomSnackbar'
import {closeSnackBar} from 'src/store/notifications'
import FallbackSpinner from 'src/@core/components/spinner'
import {LoadingSelect} from 'src/utils/inputs'
import MultimediaUploader from 'src/components/multimediaUploader/MultimediaUploader'
import MaterialsModal from 'src/views/details-modals/MaterialsModal'
import { getBranches } from 'src/store/catalogs/branches/actions'
import {ExpandedContent} from 'src/components/expandedContent/ExpandedContent'
import DetailTextFieldForm from 'src/components/form/DetailTextFieldForm'
import ClipLoader from 'react-spinners/ClipLoader'
import {t} from 'i18next'

const columns = [
    {
      flex: 0.25,
      minWidth: 200,
      field: 'serviceCatName',
      headerName: t('services.columns.serviceCat', {ns: 'maintenances'})
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'date',
      headerName: t('services.columns.date', {ns: 'maintenances'})
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'area',
      headerName: t('services.columns.area_type', {ns: 'maintenances'})
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'supplierID',
      headerName: t('services.columns.supplier', {ns: 'maintenances'})
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'cost',
      headerName: t('services.columns.cost', {ns: 'maintenances'})
    },
    {
        flex: 0.25,
        minWidth: 200,
        field: 'status',
        headerName: t('services.columns.status', {ns: 'maintenances'})
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'notes',
      headerName: t('services.columns.notes', {ns: 'maintenances'})
    }
  ]

const defaultValuesServices = {
  area: undefined, 
  areaID: undefined, 
  branchID: undefined,
  cost: undefined, 
  description: undefined, 
  evidence: undefined, 
  materials: undefined, 
  motive: undefined, 
  notes: undefined, 
  provider: undefined, 
  services: undefined
}

const defaultMaterialValues = {
  materialCatID: undefined,
  quantity: undefined,
  unitCost: undefined,
  units: undefined,
  totalCost: undefined,
  service: {
    area: undefined, 
    areaID: undefined, 
    branchID: undefined,
    cost: undefined, 
    description: undefined, 
    evidence: undefined, 
    materials: undefined, 
    motive: undefined, 
    notes: undefined, 
    provider: undefined, 
    services: undefined
  }
}

const Services = () => {
    const dispatch = useDispatch()

    const {isOpen, modalItem, isDeleteOpen, createdService, services, isLoading, modalDeleteItem} = useSelector(state => state.services)
    //media
    const {media} = useSelector(state => state.media)
    //materials
    const {isEditing, isModalOpen} = useSelector(state => state.materials)
    //serviceCat
    const { serviceCat } = useSelector(state => state.serviceCat)
    //supplier
    const { suppliers } = useSelector(state => state.suppliers)
    //areas
    const {materials} = useSelector(state => state.materialsCat)
    const {dimensionsCat} = useSelector(state => state.dimensionsCat)
    const {variablesCat} = useSelector(state => state.variablesCat)
    const {conceptsCat} = useSelector(state => state.conceptsCat)
    const {open, message, severity} = useSelector(state => state.notifications)
    const [areaType, setAreaType] = useState('')
    const [areaContent, setAreaContent] = useState([{name: t('empty_select', {ns: 'maintenances'}), id: "", disabled: true}])
    const [loadingArea, setLoadingArea] = useState(false)
    const [typeModal, setTypeModal] = useState('service')
    const [serviceRow, setServiceRow] = useState({})
    const areas = useMemo(
      () => [
        { name: 'Materiales', value: 'Material', getList: getMaterialsCat },
        { name: 'Dimensiones', value: 'Dimensión', getList: getDimensionsCat },
        { name: 'Variables', value: 'Variable', getList: getVariablesCat },
        { name: 'Concepto', value: 'Concepto', getList: getConceptsCat },
      ],
      []
    );
    const status = [
        { name: 'Planeación'},
        { name: 'Desarrollo'},
        { name: 'Finalizado'},
        { name: 'Cancelado' },
    ]

    const getDefaultValues = useMemo(() => {
      if(typeModal === 'services'){
        return defaultValuesServices
      }
      return defaultMaterialValues
    }, [typeModal])

    const {control, handleSubmit, resetField, reset, setValue, getValues} = useForm({
      defaultValues: {
        getDefaultValues
      }
    })

    const [mediaObject, setMediaObject] = useState({
      bucketName: "services",
      partKey: undefined,
      evidence: []
    })

    const handleChangeAreaType = (e, onChange) => {
      setLoadingArea(true)
      resetField("areaID")
      setAreaType(e.target.value)
      onChange(e.target.value)
    }
  
    useEffect(() => {
      dispatch(getServices())
      dispatch(getBranches())
    }, [dispatch])

    // al editar obtiene la media
    useEffect(() => {
      setValue('evidence', media)
    },[media, setValue])

    // al crear service asigna el id del service para owner de media
    useEffect(() => {
      if(Object.keys(createdService).length > 0){
        mediaObject.partKey = createdService.id
        if(mediaObject.evidence.length > 0 && !Boolean(modalItem))
          dispatch(createMediaService(mediaObject))
      }
    }, [createdService, mediaObject, dispatch, modalItem])

    useEffect(() =>{
      if(areaType !== ''){
        //llamar a la api del area seleccionada
        const areaId = areas.findIndex((area) => area.value === areaType);
        dispatch(areas[areaId]?.getList())
      }
    }, [areaType, dispatch, areas])

    useEffect(() => {
      switch(areaType){
        case "Material":
          setAreaContent(materials)
          break;
        case "Dimensión":
          setAreaContent(dimensionsCat)
          break;
        case "Variable":
          setAreaContent(variablesCat)
          break;
        case "Concepto":
          setAreaContent(conceptsCat)
          break;
      }
    }, [materials, dimensionsCat, variablesCat, conceptsCat, areaType])
  
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
      setAreaContent([{name: t('empty_select', {ns: 'maintenances'}), id: "", disabled: true}])
      reset(row)
      //AL editar
      setValue("date", row.date.split("T")[0])
      setAreaType(row.area)
      dispatch(getMediaByOwnerId({id: row.id}))
      dispatch(getServicesCat())
      dispatch(getSuppliers())
      dispatch(toggleModal(open))
      dispatch(setModalItem(row))
    }

    const handleOpenMaterialsServiceModal = params => {
      setAreaContent([])
      //get suppliers
      dispatch(getSuppliers())
      //Assign area from areaType of the row
      const {row, open} = params
      const area = areas.find((area) => area.value === row.area)
      setAreaType(area.value)
      //assign all service info into an object
      reset({service: row})
      setServiceRow(getValues())
      dispatch(toggleMaterialModal(open))
      dispatch(setIsEditing(false))
    }

    const getValueFromID = (array, id, keyToReturn) => {
      return array.find((object) => object.id === id)[keyToReturn]
    }
  
    const handleAddItem = () => {
      setAreaContent([{name: t('empty_select', {ns: 'maintenances'}), id: "", disabled: true}])
      reset({})
      dispatch(toggleModal(true))
      dispatch(getServicesCat())
      dispatch(getSuppliers())
      dispatch(setModalItem(null))
    }
  
    const handleDeleteModal = params => {
      const {row, open} = params
      dispatch(toggleDeleteModal(open))
      dispatch(setDeleteItem(row))
    }
  
    const handleDeleteConfirm = () => {
      dispatch(deleteServices(modalDeleteItem))
      handleCloseDeleteModal()
    }
  
    const onSubmit = values => {
      setMediaObject(prevState => ({
        ...prevState,
        evidence: values.evidence
      }));
      mediaObject.evidence = values.evidence
      delete values.evidence
      if (Boolean(modalItem)) {
        mediaObject.partKey = values.id
        dispatch(editServices(values))
        dispatch(editMediaService(mediaObject))
      } else {
        dispatch(createServices(values))
      }
      handleCloseModal()
    }
  
    const actionableColumns = [
      ...columns,
      {
        flex: 0.125,
        minWidth: 115,
        field: 'actions',
        headerName: t('actions', {ns: 'maintenances'}),
        renderCell: params => {
          const row = params?.row
          return (
            <Typography variant='body2' sx={{color: '#6495ED', cursor: 'pointer'}}>
              <TextBoxSearch sx={{margin: '2px'}} onClick={() => handleOpenMaterialsServiceModal({row, open: true})} />
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
            rows={services}
            pageSize={MAINTENANCES.TABLE_PAGE_SIZE}
            label={t('services_title', {ns: 'maintenances'})}
            onAddItem={handleAddItem}
          />
        )}
        <ReusableDialog
          open={isOpen}
          onClose={handleCloseModal}
          title={Boolean(modalItem) ? t('services.edit_modal', {ns: 'maintenances'}) : t('services.add_modal', {ns: 'maintenances'})}
          actions={[
            {label: t('back_button'), onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
            {label: t('save_button'), onClick: handleSubmit(onSubmit), color: 'primary', variant: 'contained'}
          ]}
        >
          <form>
            <Grid container spacing={5}>
              <Grid item xs={MAINTENANCES.MAINTENANCES_FIELD_FLEX_SIZE} md={6} sx={{marginTop: COMMON.FORM_MARGIN_TOP}}>
                  <FormControl fullWidth>
                    <Controller
                      name='serviceCatID'
                      control={control}
                      render={({field: {value, onChange}}) => (
                        <>
                          <InputLabel>{t('services.columns.serviceCat', {ns: 'maintenances'})}</InputLabel>
                          <Select
                            defaultValue=""
                            value={value || ''}
                            label={t('services.columns.serviceCat', {ns: 'maintenances'})}
                            onChange={onChange}
                          >
                            {serviceCat?.map((servCat, id) => 
                              <MenuItem key={id} value={servCat.id}>{servCat.name}</MenuItem>
                            )}
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
                <Grid item xs={12} md={3} sx={{marginTop: '6px'}}>
                  <FormControl fullWidth>
                    <Controller
                        name='area'
                        control={control}
                        render={({field: {value, onChange}}) => (
                          <>
                            <InputLabel>{t('services.columns.area_type', {ns: 'maintenances'})}</InputLabel>
                            <Select
                              defaultValue=""
                              value={value || ''}
                              label={t('services.columns.area_type', {ns: 'maintenances'})}
                              onChange={(e) => handleChangeAreaType(e, onChange)}
                            >
                              {areas.map((area, i) =>
                                <MenuItem key={i} value={area.value}>{area.name}</MenuItem>
                              )}
                            </Select>
                          </>)}
                   />       
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={5} sx={{marginTop: '6px'}}>
                  <FormControl fullWidth>
                    <Controller
                      name='areaID'
                      control={control}
                      render={({field: {value, onChange}}) => (
                        <LoadingSelect 
                          label={t('services.columns.area', {ns: 'maintenances'})}
                          disabled={loadingArea}
                          content={areaContent}
                          onChange={onChange}
                          value={value || ''}
                          loading={loadingArea}
                          setLoading={setLoadingArea}
                          loadingLabel={"Cargando..."}
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={MAINTENANCES.MAINTENANCES_FIELD_FLEX_SIZE} md={4} sx={{marginTop: COMMON.FORM_MARGIN_TOP}}>
                  <FormControl fullWidth>
                    <Controller
                      name='supplierID'
                      control={control}
                      render={({field: {value, onChange}}) => (
                        <>
                          <InputLabel>{t('services.columns.supplier', {ns: 'maintenances'})}</InputLabel>
                          <Select
                            defaultValue=""
                            value={value || ''}
                            label={t('services.columns.supplier', {ns: 'maintenances'})}
                            onChange={onChange}
                          >
                            {suppliers?.map((supplier, id) => 
                              <MenuItem key={id} value={supplier.id}>{`${supplier.firstname} ${supplier.lastname}`}</MenuItem>
                            )}
                          </Select>
                        </>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={MAINTENANCES.MAINTENANCES_FIELD_FLEX_SIZE} md={6} sx={{marginTop: COMMON.FORM_MARGIN_TOP}}>
                  <FormControl fullWidth>
                    <Controller
                      name='status'
                      control={control}
                      render={({field: {value, onChange}}) => (
                        <>
                          <InputLabel>{t('services.columns.status', {ns: 'maintenances'})}</InputLabel>
                          <Select
                            defaultValue=""
                            value={value || ''}
                            label={t('services.columns.status', {ns: 'maintenances'})}
                            onChange={onChange}
                          >
                            {status?.map((statu, id) => 
                              <MenuItem key={id} value={statu.name}>{statu.name}</MenuItem>
                            )}
                          </Select>
                        </>
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
                  <FormControl fullWidth>
                    <Controller
                      name='cost'
                      control={control}
                      render={({field: {value, onChange}}) => 
                        <TextField label={t('services.columns.cost', {ns: 'maintenances'})} 
                          value={value} 
                          onChange={onChange} 
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <AttachMoneyIcon />
                              </InputAdornment>
                            ),
                          }}
                        />}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
                  <FormControl fullWidth>
                    <Controller
                      name='evidence'
                      control={control}
                      render={({field: {value = [], onChange}}) => 
                      <>
                        <MultimediaUploader
                          field={t('services.columns.evidence', {ns: 'maintenances'})}
                          base64Images={value} 
                          handleImages={onChange} 
                        />
                      </>
                    }/>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
                  <FormControl fullWidth>
                    <Controller
                      name='notes'
                      control={control}
                      render={({field: {value, onChange}}) => 
                        <TextField 
                          multiline
                          rows={4}
                          label={t('services.columns.notes', {ns: 'maintenances'})}
                          value={value} 
                          onChange={onChange} 
                        />}
                    />
                  </FormControl>
                </Grid>
            </Grid>
          </form>
        </ReusableDialog>
        <ReusableDialog
          open={isDeleteOpen}
          onClose={handleCloseDeleteModal}
          title={t('services.delete_modal', {ns: 'maintenances'})}
          actions={[
            {label: t('back_button'), onClick: handleCloseDeleteModal, color: 'primary', variant: 'outlined'},
            {label: t('save_button'), onClick: handleDeleteConfirm, color: 'primary', variant: 'contained'}
          ]}
        >
          <Box>
            <Typography variant='body2'>{t('services_delete_confirm_message', {ns: 'maintenances'})}</Typography>
          </Box>
        </ReusableDialog>
        <MaterialsModal
          isOpen={isModalOpen}
          control={control}
          handleSubmit={handleSubmit}
        >
          <ExpandedContent label={t('services.expanded_title', {ns: 'maintenances'})}>
            {isModalOpen &&
              <Grid container>
                <DetailTextFieldForm labelText={t('services.columns.serviceCat', {ns: 'maintenances'})} value={serviceRow.service.serviceCatName} />
                <DetailTextFieldForm labelText={t('services.columns.area_type', {ns: 'maintenances'})} value={serviceRow.service.area} />
                {areaContent.length > 0 ?
                  <DetailTextFieldForm md={6} labelText={t('services.columns.area', {ns: 'maintenances'})} value={getValueFromID(areaContent, serviceRow.service.areaID, "name")} />
                :
                  <ClipLoader />
                }
                <DetailTextFieldForm labelText={t('services.columns.cost', {ns: 'maintenances'})} value={serviceRow.service.cost} />
                <DetailTextFieldForm labelText={t('services.columns.status', {ns: 'maintenances'})} value={serviceRow.service.status} />
                {suppliers.length > 0 ?
                  <DetailTextFieldForm
                    md={6}
                    labelText={t('services.columns.supplier', {ns: 'maintenances'})}
                    value={getValueFromID(suppliers, serviceRow.service.supplierID, "firstname")} 
                  />
                :
                  <ClipLoader />
                }
                <DetailTextFieldForm md={6} multiline={true} labelText={t('services.columns.notes', {ns: 'maintenances'})} value={serviceRow.service.notes} />
              </Grid>
            }
          </ExpandedContent>
        </MaterialsModal>
        <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
      </Fragment>
    )
}

export default Services