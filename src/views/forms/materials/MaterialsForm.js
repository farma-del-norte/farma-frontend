import {Controller} from 'react-hook-form'
import { Grid, FormControl, TextField, InputAdornment, InputLabel, Select, MenuItem} from '@mui/material'
import { getMaterialsCat } from 'src/store/catalogs/materials/actions'
import {useSelector, useDispatch} from 'react-redux'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useEffect } from 'react';
import {t} from 'i18next'

export const MaterialsForm = ({control, handleSubmit}) => {

  const dispatch = useDispatch()
  //materialsCat
  const { materialsCat } = useSelector(state => state.materialsCat)
  const { units } = useSelector(state => state.materials)
  const MATERIAL_UNITS = [
    {name:'Kilómetro'}, 
    {name:'Metro'}, 
    {name:'Centímetro'}, 
    {name:'Milímetro'}, 
    {name:'Pulgada'}, 
    {name:'Kilogramo'}, 
    {name:'Gramo'}, 
    {name:'Miligramo'}, 
    {name:'Litro'}, 
    {name:'Mililitro'}, 
    {name:'Metro cúbico'}, 
    {name:'Centímetro cúbico'}, 
    {name:'Metro cuadrado'}, 
    {name:'Centímetro cuadrado'}, 
    {name:'NA'}
  ];

  useEffect(() => {
    dispatch(getMaterialsCat())
  }, [dispatch])

  return (
    <form onSubmit={handleSubmit()}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <Grid item xs={12} sx={{marginBottom: '10px', marginTop: '10px'}}>
          <FormControl fullWidth>
            <Controller
                name='materialCatID'
                control={control}
                render={({field: {value, onChange}}) => (
                  <>
                    <InputLabel>{t('materials.columns.materialCat', {ns: 'maintenances'})}</InputLabel>
                    <Select
                      value={value || ''}
                      label={t('materials.columns.materialCat', {ns: 'maintenances'})}
                      onChange={onChange}
                    >
                      {materialsCat.map((material, i) =>
                        <MenuItem key={i} value={material.id}>{material.name}</MenuItem>
                      )}
                    </Select>
                  </>)}
            />       
          </FormControl>
          </Grid>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} sx={{marginTop: '10px'}}>
              <FormControl fullWidth>
                <Controller
                  name='unitCost'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField 
                      label={t('materials.columns.unitCost', {ns: 'maintenances'})}
                      value={value} 
                      onChange={onChange} 
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoneyIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '10px'}}>
              <FormControl fullWidth>
                <Controller
                  name='quantity'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField type='number' label={t('materials.columns.quantity', {ns: 'maintenances'})} value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '10px'}}>
              <FormControl fullWidth>
                <Controller
                  name='units'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <>
                      <InputLabel>{t('materials.columns.units', {ns: 'maintenances'})}</InputLabel>
                      <Select
                        value={value || ''}
                        label={t('materials.columns.units', {ns: 'maintenances'})}
                        onChange={onChange}
                      >
                        {MATERIAL_UNITS.map((unit, i) =>
                          <MenuItem key={i} value={unit.name}>{unit.name}</MenuItem>
                        )}
                      </Select>
                    </>)}
              />       
            </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '10px'}}>
              <FormControl fullWidth>
                <Controller
                  name='totalCost'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField 
                      label={t('materials.columns.totalCost', {ns: 'maintenances'})}
                      value={value} 
                      onChange={onChange}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <AttachMoneyIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '10px'}}>
              <FormControl fullWidth>
                <Controller
                  name='notes'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField 
                      multiline
                      rows={4}
                      label={t('services.columns.notes', {ns: 'maintenances'})}
                      value={value} 
                      onChange={onChange} 
                    />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </form>
  )
}