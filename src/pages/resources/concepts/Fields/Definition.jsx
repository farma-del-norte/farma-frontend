import {Grid, FormControl, TextField} from '@mui/material'
import {useFormContext, Controller} from 'react-hook-form'

const Definition = props => {
  const {register, setValue } = useFormContext(),
    definition = props.definition

  if (definition) {
    setValue('definition', definition)
  }

  return (
    <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
      <FormControl fullWidth>
        <Controller
          name='definition'
          render={() => (
            <TextField
              {...register('definition', {
                required: true
              })}
              label='Definicion'
            />
          )}
        />
      </FormControl>
    </Grid>
  )
}

export default Definition