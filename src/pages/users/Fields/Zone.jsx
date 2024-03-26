import {useEffect} from 'react'
import {Grid, FormControl} from '@mui/material'
import {Controller, useFormContext} from 'react-hook-form'
import {Select, MenuItem, InputLabel} from '@mui/material'
import {getZones} from 'src/store/catalogs/zones/actions'
import {useSelector, useDispatch} from 'react-redux'

const Zone = props => {
  const hasId = props.zoneID,
    zoneID = hasId ? props.zoneID : '',
    dispatch = useDispatch(),
    {zones} = useSelector(state => state.zones),
    handleZone = (e, onChange) => {
      onChange(e.target.value)
    },
    { setValue } = useFormContext();

    if(zoneID) {
      setValue('zoneID', zoneID)
    }

  useEffect(() => {
    dispatch(getZones())
  }, [dispatch])

  return (
    <Grid item xs={12} md={3} sx={{marginTop: '6px'}}>
      <FormControl fullWidth>
        <Controller
          name='zoneID'
          render={({field: {value, onChange}}) => (
            <>
              <InputLabel>Zona</InputLabel>
              <Select
                defaultValue={zoneID || ''}
                value={value || ''}
                label='Tipo de Area'
                onChange={e => handleZone(e, onChange)}
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
      </FormControl>
    </Grid>
  )
}

export default Zone
