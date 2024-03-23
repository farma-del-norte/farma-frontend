import { Grid, FormControl, TextField, InputAdornment} from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const AssignedBudget = (props) => {
  const { register, setValue } = useFormContext(),
  budget = props.budget;

  if(budget) {
    setValue('budget', budget)
  } else {
    setValue('budget', 0)
  }
  
  return (
    <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
      <FormControl fullWidth>
        <Controller
          name='budget'
          render={() => (
            <TextField
            {...register('budget', { 
              required: true,
              valueAsNumber: true,
              pattern:{
                 value: /^(0|[1-9]\d*)(\.\d+)?$/
              } 
            })}
              label='Presupuesto Asignado'
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

export default AssignedBudget
