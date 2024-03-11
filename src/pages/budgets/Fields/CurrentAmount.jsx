import { Grid, FormControl, TextField, InputAdornment} from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const CurrentAmount = () => {
  const { register } = useFormContext();

  return (
    <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
      <FormControl fullWidth>
        <Controller
          name='currentAmount'
          render={() => (
            <TextField
            {...register('currentAmount', { required: true })}
              label='Presupuesto Actual'
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

export default CurrentAmount
