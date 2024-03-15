import { Grid, FormControl, TextField, InputAdornment} from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney'

const CurrentAmount = (props) => {
  const { register, setValue } = useFormContext(),
  currentAmount = props.currentAmount;

  if(currentAmount) {
    setValue('currentAmount', currentAmount)
  } else {
    setValue('currentAmount', 0)
  }

  return (
    <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
      <FormControl fullWidth>
        <Controller
          name='currentAmount'
          render={() => (
            <TextField
            {...register('currentAmount', { 
              required: true,
              valueAsNumber: true,
              pattern:{
                 value: /^(0|[1-9]\d*)(\.\d+)?$/
              }
            })}
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
