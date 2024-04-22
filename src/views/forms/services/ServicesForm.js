import {Controller} from 'react-hook-form'
import { Grid, FormControl, TextField, InputAdornment, InputLabel, Select, MenuItem} from '@mui/material'
import {LoadingSelect} from 'src/utils/inputs'
import {MAINTENANCES, COMMON} from 'src/utils/constants'
import MultimediaUploader from 'src/components/multimediaUploader/MultimediaUploader'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import {useSelector, useDispatch} from 'react-redux'
import { getServicesCat } from 'src/store/catalogs/services/actions'
import { getSuppliers } from 'src/store/catalogs/suppliers/actions'
import {getMaterialsCat} from 'src/store/catalogs/materials/actions'
import {getDimensionsCat} from 'src/store/catalogs/dimensions/actions'
import {getVariablesCat} from 'src/store/catalogs/variables/actions'
import {getConceptsCat} from 'src/store/catalogs/concepts/actions'
import { useEffect, useMemo } from 'react';
import {t} from 'i18next'

export const ServicesForm = ({
control,
handleArea,
areaIdContent,
loadingArea,
setLoadingArea
}) => {
  const dispatch = useDispatch()
  //serviceCat
  const { serviceCat } = useSelector(state => state.serviceCat)
  //supplier
  const { suppliers } = useSelector(state => state.suppliers)
  const status = [
    { name: 'Planeación'},
    { name: 'Desarrollo'},
    { name: 'Finalizado'},
    { name: 'Cancelado' },
]
  const areas = useMemo(
    () => [
      { name: 'Materiales', value: 'Material', getList: getMaterialsCat },
      { name: 'Dimensiones', value: 'Dimensión', getList: getDimensionsCat },
      { name: 'Variables', value: 'Variable', getList: getVariablesCat },
      { name: 'Concepto', value: 'Concepto', getList: getConceptsCat },
    ],
    []
  );

  useEffect(() => {
    dispatch(getServicesCat())
    dispatch(getSuppliers())
    dispatch(getMaterialsCat())
    dispatch(getDimensionsCat())
    dispatch(getVariablesCat())
    dispatch(getConceptsCat())
  }, [dispatch])

  return (
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
                            onChange={(e) => handleArea(e, onChange)}
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
                        content={areaIdContent}
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
  )
}