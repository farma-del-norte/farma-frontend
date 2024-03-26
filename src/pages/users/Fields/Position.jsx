import {Grid, FormControl} from '@mui/material'
import {Controller, useFormContext} from 'react-hook-form'
import {Select, MenuItem, InputLabel} from '@mui/material'

const Position = props => {
  const hasPosition = props.position,
    position = hasPosition ? props.position : '',
    positions = ['Gerente de zona', 'Gerente de sucursal', 'Usuario de sucursal', 'Administrador'],
    handlePosition = (e, onChange) => {
      onChange(e.target.value)
    },
    { setValue } = useFormContext();

    if(position) {
      setValue('position', position)
    }

  return (
    <Grid item xs={12} md={3} sx={{marginTop: '6px'}}>
      <FormControl fullWidth>
        <Controller
          name='position'
          render={({field: {value, onChange}}) => (
            <>
              <InputLabel>Posición</InputLabel>
              <Select
                defaultValue={position || ''}
                value={value || ''} 
                label='Posicion' 
                onChange={e => handlePosition(e, onChange)}>
                {positions.map((position, i) => (
                  <MenuItem key={i} value={position}>
                    {position}
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

export default Position
