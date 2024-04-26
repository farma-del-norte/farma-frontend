import {Fragment, useEffect, useState, useMemo} from 'react'
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
  InputAdornment
} from '@mui/material'
import CardTable from 'src/components/cardTable'
import ReusableDialog from 'src/components/modal'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'
import {Pencil, Delete} from 'mdi-material-ui'
import {toggleModal, setModalItem, setDeleteItem, toggleDeleteModal} from 'src/store/maintenances/maintenances/reducer'
import {
  createMaintenance,
  deleteMaintenance,
  editMaintenance,
  getMaintenances
} from 'src/store/maintenances/maintenances/actions'
import {getBranches} from 'src/store/catalogs/branches/actions'
import {getMaterialsCat} from 'src/store/catalogs/materials/actions'
import {getDimensionsCat} from 'src/store/catalogs/dimensions/actions'
import {getVariablesCat} from 'src/store/catalogs/variables/actions'
import {getConceptsCat} from 'src/store/catalogs/concepts/actions'
import {MAINTENANCES, COMMON} from 'src/utils/constants'

import FallbackSpinner from 'src/@core/components/spinner'
import {LoadingSelect} from 'src/utils/inputs'
import {t} from 'i18next'

const columns = [
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
    field: 'area',
    headerName: 'Tipo de Area'
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'areaName',
    headerName: 'Area'
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
    field: 'notes',
    headerName: 'Notas'
  }
]

const Maintenances = () => {
  const dispatch = useDispatch()

  const {isOpen, modalItem, isDeleteOpen, maintenances, isLoading, modalDeleteItem} = useSelector(
    state => state.maintenances
  )
  //branches
  const {branches} = useSelector(state => state.branches)
  //areas
  const {materials} = useSelector(state => state.materialsCat)
  const {dimensionsCat} = useSelector(state => state.dimensionsCat)
  const {variablesCat} = useSelector(state => state.variablesCat)
  const {conceptsCat} = useSelector(state => state.conceptsCat)

  const [areaType, setAreaType] = useState('')
  const [areaContent, setAreaContent] = useState([
    {name: 'Selecciona un tipo de area para ver resultados', id: '', disabled: true}
  ])
  const [loadingArea, setLoadingArea] = useState(false)
  const areas = useMemo(
    () => [
      {name: 'Materiales', value: 'Material', getList: getMaterialsCat},
      {name: 'Dimensiones', value: 'Dimensión', getList: getDimensionsCat},
      {name: 'Variables', value: 'Variable', getList: getVariablesCat},
      {name: 'Concepto', value: 'Concepto', getList: getConceptsCat}
    ],
    []
  )

  const {control, handleSubmit, resetField, reset, setValue} = useForm({
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

  const handleChangeAreaType = (e, onChange) => {
    setLoadingArea(true)
    resetField('areaID')
    setAreaType(e.target.value)
    onChange(e.target.value)
  }

  useEffect(() => {
    dispatch(getMaintenances())
  }, [dispatch])

  useEffect(() => {
    if (areaType !== '') {
      //llamar a la api del area seleccionada
      const areaId = areas.findIndex(area => area.value === areaType)
      dispatch(areas[areaId]?.getList())
    }
  }, [areaType, dispatch, areas])

  useEffect(() => {
    switch (areaType) {
      case 'Material':
        setAreaContent(materials)
        break
      case 'Dimensión':
        setAreaContent(dimensionsCat)
        break
      case 'Variable':
        setAreaContent(variablesCat)
        break
      case 'Concepto':
        setAreaContent(conceptsCat)
        break
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

  const handleOpenModal = row => {
    reset(row)
    //AL editar
    setAreaType(row.area ?? '')
    dispatch(getBranches())
    dispatch(toggleModal(true))
    dispatch(setModalItem(row))
  }

  const handleAddItem = () => {
    reset({})
    dispatch(toggleModal(true))
    dispatch(getBranches())
    dispatch(setModalItem(null))
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
            <Pencil sx={{margin: '5px'}} onClick={() => handleOpenModal(row)} />
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
        onClose={handleCloseModal}
        title={Boolean(modalItem) ? t('maintenances_edit', {ns: 'maintenances'}) : 'Reportar Mantenimiento'}
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
                  name='description'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Descripcion de mantenimiento' value={value} onChange={onChange} />
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
                      <InputLabel>Tipo de Area</InputLabel>
                      <Select
                        defaultValue=''
                        value={value || ''}
                        label='Tipo de Area'
                        onChange={e => handleChangeAreaType(e, onChange)}
                      >
                        {areas.map((area, i) => (
                          <MenuItem key={i} value={area.value}>
                            {area.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  )}
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
                      label={'Area'}
                      disabled={loadingArea}
                      content={areaContent}
                      onChange={onChange}
                      value={value || ''}
                      loading={loadingArea}
                      setLoading={setLoadingArea}
                      loadingLabel={'Cargando...'}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='services'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Servicios' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='motive'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Motivo' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='provider'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Proveedor' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='materials'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Materiales' value={value} onChange={onChange} />
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
    </Fragment>
  )
}

export default Maintenances
