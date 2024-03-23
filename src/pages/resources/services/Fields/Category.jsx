import {Grid, FormControl, TextField, FormHelperText} from '@mui/material'
import {useFormContext, Controller} from 'react-hook-form'

const Category = props => {
  const {register, setValue } = useFormContext(),
    category = props.category

  if (category) {
    setValue('category', category)
  }

  return (
    <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
      <FormControl fullWidth>
        <Controller
          name='category'
          render={() => (
            <TextField
              {...register('category', {
                required: true
              })}
              label='Categoria'
            />
          )}
        />
      </FormControl>
    </Grid>
  )
}

export default Category