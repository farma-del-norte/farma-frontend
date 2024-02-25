import {Fragment, useEffect, useState, useMemo} from 'react'
import {v4 as uuidv4} from 'uuid'
import {useForm, Controller} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {Typography, Grid, FormControl, TextField, Box, Select, MenuItem, InputLabel, InputAdornment} from '@mui/material'
import CardTable from 'src/components/cardTable'
import ReusableDialog from 'src/components/modal'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {Pencil, Delete} from 'mdi-material-ui'
import {toggleModal, setModalItem, setDeleteItem, toggleDeleteModal} from 'src/store/maintenances/services/reducer'
import {createServices, deleteServices, editServices, getServices} from 'src/store/maintenances/services/actions'
import {createMediaService, editMediaService} from 'src/store/media/actions'
import { getServicesCat } from 'src/store/catalogs/services/actions'
import { getSuppliers } from 'src/store/catalogs/suppliers/actions'
import {getMaterialsCat} from 'src/store/catalogs/materials/actions'
import {getDimensionsCat} from 'src/store/catalogs/dimensions/actions'
import {getVariablesCat} from 'src/store/catalogs/variables/actions'
import {getConceptsCat} from 'src/store/catalogs/concepts/actions'
import {MAINTENANCES, MAINTENANCES_LOCALE, COMMON} from 'src/utils/constants'
import CustomSnackbar from 'src/components/snackbar/CustomSnackbar'
import {closeSnackBar} from 'src/store/notifications'
import FallbackSpinner from 'src/@core/components/spinner'
import {LoadingSelect} from 'src/utils/inputs'
import MultimediaUploader from 'src/components/multimediaUploader/MultimediaUploader'
import {getBranchesData, postBranchesData, patchBranchData, deleteBranchData} from '../../../services/catalogs/branches'

const columns = [
    {
      flex: 0.25,
      minWidth: 200,
      field: 'serviceCatName',
      headerName: 'Categoria del servicio'
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'date',
      headerName: 'Fecha'
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'area',
      headerName: 'Tipo de Area'
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'supplierID',
      headerName: 'Proveedor'
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'cost',
      headerName: 'Costo'
    },
    {
        flex: 0.25,
        minWidth: 200,
        field: 'status',
        headerName: 'Estatus'
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'notes',
      headerName: 'Notas'
    }
  ]

const Services = () => {
    const dispatch = useDispatch()

    const {isOpen, modalItem, isDeleteOpen, services, isLoading, modalDeleteItem} = useSelector(state => state.services)
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
    const [areaContent, setAreaContent] = useState([{name: "Selecciona un tipo de area para ver resultados", id: "", disabled: true}])
    const [loadingArea, setLoadingArea] = useState(false)
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

    const {control, handleSubmit, resetField, reset, setValue} = useForm({
      defaultValues: {
        area: undefined, areaID: undefined, branchID: undefined,
        cost: undefined, description: undefined, evidence: undefined, materials: undefined, 
        motive: undefined, notes: undefined, provider: undefined, services: undefined
      }
    })

    const handleChangeAreaType = (e, onChange) => {
      setLoadingArea(true)
      resetField("areaID")
      setAreaType(e.target.value)
      onChange(e.target.value)
    }
  
    useEffect(() => {
      dispatch(getServices())
    }, [dispatch])

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
      reset(row)
      //AL editar
      setAreaType(row.area)
      dispatch(getServicesCat())
      dispatch(getSuppliers())
      dispatch(toggleModal(open))
      dispatch(setModalItem(row))
    }
  
    const handleAddItem = () => {
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
      const serviceId = uuidv4()
      const mediaObject = {
        bucketName: "service",
        partKey: serviceId,
        evidence: values.evidence
      }
      values = {...values, id: serviceId}
      if (Boolean(modalItem)) {
        dispatch(editServices(values))
      } else {
        dispatch(createMediaService(mediaObject))
        //dispatch(createServices(values))
      }
      handleCloseModal()
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
              <Pencil sx={{margin: '5px'}} onClick={() => handleOpenModal({row, open: true})} />
              <Delete sx={{margin: '5px'}} onClick={() => handleDeleteModal({row, open: true})} />
            </Typography>
          )
        }
      }
    ]

    const handleBranch = (e, onChange) => {
      onChange(e.target.value)
      const zoneID = branches.filter(branch => branch.id === e.target.value)[0].zoneID
      setValue("zoneID", zoneID)
    }
  
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
            label={MAINTENANCES_LOCALE.SERVICES_TITLE}
            onAddItem={handleAddItem}
          />
        )}
        <ReusableDialog
          open={isOpen}
          onClose={handleCloseModal}
          title={Boolean(modalItem) ? MAINTENANCES_LOCALE.MAINTENANCES_EDIT_MODAL : MAINTENANCES_LOCALE.SERVICES_ADD_MODAL}
          actions={[
            {label: 'Regresar', onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
            {label: 'Reportar', onClick: handleSubmit(onSubmit), color: 'primary', variant: 'contained'}
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
                          <InputLabel>Categoria del servicio</InputLabel>
                          <Select
                            defaultValue=""
                            value={value || ''}
                            label="Categoria del servicio"
                            onChange={(e) => handleBranch(e, onChange)}
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
                      render={({field: {value, onChange}}) => <TextField label='Fecha' value={value} onChange={onChange} />}
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
                            <InputLabel>Tipo de Area</InputLabel>
                            <Select
                              defaultValue=""
                              value={value || ''}
                              label="Tipo de Area"
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
                          label={"Area"}
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
                          <InputLabel>Proveedor</InputLabel>
                          <Select
                            defaultValue=""
                            value={value || ''}
                            label="Proveedor"
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
                          <InputLabel>Estatus</InputLabel>
                          <Select
                            defaultValue=""
                            value={value || ''}
                            label="Estatus"
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
                        <TextField label='Costo' 
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
                          field={"Evidencia digital"}
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
                          label='Comentarios' 
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
          title={'Borrar'}
          actions={[
            {label: 'Regresar', onClick: handleCloseDeleteModal, color: 'primary', variant: 'outlined'},
            {label: 'Eliminar', onClick: handleDeleteConfirm, color: 'primary', variant: 'contained'}
          ]}
        >
          <Box>
            <Typography variant='body2'>{MAINTENANCES_LOCALE.SERVICES_CONFIRM_DELETE_MODAL}</Typography>
          </Box>
        </ReusableDialog>
        <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
      </Fragment>
    )
}

export default Services