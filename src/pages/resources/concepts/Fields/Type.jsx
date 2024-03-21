import {Grid, FormControl} from '@mui/material'
import {Controller, useFormContext} from 'react-hook-form'
import {Select, MenuItem, InputLabel} from '@mui/material'

const Type = props => {
  const hasId = props.type,
    type = hasId ? props.type : '',
    handleZone = (e, onChange) => {
      onChange(e.target.value)
    },
    { setValue } = useFormContext();

    if(type) {
      setValue('type', type)
    }

  return (
    <Grid item xs={12} md={3} sx={{marginTop: '6px'}}>
      <FormControl fullWidth>
        <Controller
          name='type'
          render={({field: {value, onChange}}) => (
            <>
              <InputLabel>Tipo</InputLabel>
              <Select
                defaultValue={type || ''}
                value={value || ''}
                label='Tipo'
                onChange={e => handleZone(e, onChange)}
              >
                <MenuItem value='Concepto'>Concepto</MenuItem>
                <MenuItem value='Elemento'>Elemento</MenuItem>
              </Select>
            </>
          )}
        />
      </FormControl>
    </Grid>
  )
}

export default Type