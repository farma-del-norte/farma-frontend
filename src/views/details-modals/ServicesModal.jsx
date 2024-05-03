import ReusableDialog from 'src/components/modal'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { ServicesForm } from '../forms/services/ServicesForm'
import {Pencil, Delete } from 'mdi-material-ui'
import CardTable from 'src/components/cardTable'
import {useForm} from 'react-hook-form'
import {MAINTENANCES} from 'src/utils/constants'
import {Typography, Box} from '@mui/material'
import {createServices, deleteServices, editServices, getServicesByMaintenancesId} from 'src/store/maintenances/services/actions'
import {toggleModal, setModalItem, setDeleteItem, toggleDeleteModal} from 'src/store/maintenances/services/reducer'
import {createMediaService, getMediaByOwnerId, editMediaService} from 'src/store/media/actions'
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
      field: 'supplierName',
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

const ServicesModal = ({cardTitle, maintenance}) => {
  const dispatch = useDispatch()
  const {isOpen, modalItem, isDeleteOpen, createdService, services, isLoading, modalDeleteItem} = useSelector(state => state.services)
  //media
  const {media} = useSelector(state => state.media)
  const [areaContent, setAreaContent] = useState([{name: t('empty_select', {ns: 'maintenances'}), id: "", disabled: true}])
  const [loadingArea, setLoadingArea] = useState(false)
  const [areaType, setAreaType] = useState('')
  const {materials} = useSelector(state => state.materialsCat)
  const {dimensionsCat} = useSelector(state => state.dimensionsCat)
  const {variablesCat} = useSelector(state => state.variablesCat)
  const {conceptsCat} = useSelector(state => state.conceptsCat)
  const [mediaObject, setMediaObject] = useState({
    bucketName: "services",
    partKey: undefined,
    evidence: []
  })
  const {control, handleSubmit, resetField, reset, setValue, getValues} = useForm({
    defaultValues: {
      defaultValuesServices
    }
  })

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

  useEffect(() => {
    if(Object.keys(maintenance).length > 0) {
      dispatch(getServicesByMaintenancesId(maintenance.id))
    }
  }, [dispatch, maintenance])

  // al crear service asigna el id del service para owner de media
  useEffect(() => {
    if(Object.keys(createdService).length > 0){
      mediaObject.partKey = createdService.id
      if(mediaObject.evidence.length > 0 && !Boolean(modalItem))
        dispatch(createMediaService(mediaObject))
    }
  }, [createdService, mediaObject, dispatch, modalItem])

  const handleChangeAreaType = (e, onChange) => {
    setLoadingArea(true)
    resetField("areaID")
    setAreaType(e.target.value)
    onChange(e.target.value)
  }

  const handleCloseModal = () => {
    reset()
    const cleanModal = null
    dispatch(toggleModal(false))
    dispatch(setModalItem(cleanModal))
  }

  const handleAddItem = () => {
    setAreaContent([{name: t('empty_select', {ns: 'maintenances'}), id: "", disabled: true}])
    reset({})
    dispatch(toggleModal(true))
    dispatch(setModalItem(null))
  }

  const handleOpenModal = params => {
    const {row, open} = params
    setAreaContent([{name: t('empty_select', {ns: 'maintenances'}), id: "", disabled: true}])
    reset(row)
    //AL editar
    console.log('editar', row)
    if(row.date)
      setValue("date", row.date.split("T")[0])
    setAreaType(row.area)
    dispatch(getMediaByOwnerId({id: row.id}))
    dispatch(toggleModal(open))
    dispatch(setModalItem(row))
  }

  const handleDeleteModal = params => {
    const {row, open} = params
    dispatch(toggleDeleteModal(open))
    dispatch(setDeleteItem(row))
  }

  const handleCloseDeleteModal = () => {
    const cleanModal = null
    dispatch(toggleDeleteModal(false))
    dispatch(setDeleteItem(cleanModal))
  }

  const handleDeleteConfirm = () => {
    dispatch(deleteServices(modalDeleteItem))
    handleCloseDeleteModal()
  }

  // al editar obtiene la media
  useEffect(() => {
    setValue('evidence', media)
  },[media, setValue])

  const onSubmit = values => {
    setMediaObject(prevState => ({
      ...prevState,
      evidence: values.evidence
    }));
    mediaObject.evidence = values.evidence
    values.maintenanceID = maintenance.id
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
            <Pencil sx={{margin: '5px'}} onClick={() => handleOpenModal({row, open: true})} />
            <Delete sx={{margin: '5px'}} onClick={() => handleDeleteModal({row, open: true})} />
          </Typography>
        )
      }
    }
  ]

  return (
    <div>
        <CardTable
          showAddButton
          columns={actionableColumns}
          rows={services}
          pageSize={MAINTENANCES.TABLE_PAGE_SIZE}
          label={cardTitle}
          onAddItem={handleAddItem}
        />
        <ReusableDialog
          open={isOpen}
          size={"lg"}
          onClose={handleCloseModal}
          title={
            Boolean(modalItem)
              ? t('services.edit_modal', {ns: 'maintenances'})
              : t('services.add_modal', {ns: 'maintenances'})
          }
          actions={[
            {label: t('back_button'), onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
              Boolean(modalItem)
                ? {
                    label: t('save_button'),
                    onClick: handleSubmit(onSubmit),
                    color: 'primary',
                    variant: 'contained'
                  }
                : {label: t('add'), onClick: handleSubmit(onSubmit), color: 'primary', variant: 'contained'}
            ]}
        >
          <ServicesForm
              control={control}
              handleArea={handleChangeAreaType}
              loadingArea={loadingArea}
              areaIdContent={areaContent}
              setLoadingArea={setLoadingArea}
          />
        </ReusableDialog>
        <ReusableDialog
          open={isDeleteOpen}
          onClose={handleCloseDeleteModal}
          size={"xs"}
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
    </div>
  )
}

export default ServicesModal