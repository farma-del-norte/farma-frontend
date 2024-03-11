import { Grid, FormControl, TextField, InputAdornment} from '@mui/material'
import { useFormContext, Controller } from 'react-hook-form'
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const AssignedBudget = () => {
  const { register } = useFormContext();

  return (
    <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
      <FormControl fullWidth>
        <Controller
          name='assignedBudget'
          render={() => (
            <TextField
            {...register('assignedBudget', { required: true })}
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
