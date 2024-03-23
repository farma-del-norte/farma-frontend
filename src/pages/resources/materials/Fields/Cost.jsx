import { Grid, FormControl, TextField, InputAdornment} from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const Cost = (props) => {
  const { register, setValue } = useFormContext(),
  cost = props.cost;

  if(cost) {
    setValue('cost', cost)
  } else {
    setValue('cost', 0)
  }
  
  return (
    <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
      <FormControl fullWidth>
        <Controller
          name='cost'
          render={() => (
            <TextField
            {...register('cost', { 
              required: true,
              valueAsNumber: true,
              pattern:{
                 value: /^(0|[1-9]\d*)(\.\d+)?$/
              } 
            })}
              label='Costo'
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
  )
}

export default Cost