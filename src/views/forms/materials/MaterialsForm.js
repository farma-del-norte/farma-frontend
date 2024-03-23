import {Controller} from 'react-hook-form'
import { Grid, FormControl, TextField, InputAdornment, InputLabel, Select, MenuItem} from '@mui/material'
import {MAINTENANCES_LOCALE} from 'src/utils/constants'
import { getMaterialsCat } from 'src/store/catalogs/materials/actions'
import {useSelector, useDispatch} from 'react-redux'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useEffect } from 'react';

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
                    <InputLabel>{MAINTENANCES_LOCALE.COLUMN_MATERIAL_CAT}</InputLabel>
                    <Select
                      value={value || ''}
                      label={MAINTENANCES_LOCALE.COLUMN_MATERIAL_CAT}
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
                      label={MAINTENANCES_LOCALE.COLUMN_UNIT_COST}
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
                    <TextField type='number' label={MAINTENANCES_LOCALE.COLUMN_QUANTITY} value={value} onChange={onChange} />
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
                      <InputLabel>{MAINTENANCES_LOCALE.COLUMN_UNITS}</InputLabel>
                      <Select
                        value={value || ''}
                        label={MAINTENANCES_LOCALE.COLUMN_UNITS}
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
                      label={MAINTENANCES_LOCALE.COLUMN_TOTAL_COST}
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
                      label={MAINTENANCES_LOCALE.COLUMN_NOTES}
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