import {useEffect} from 'react'
import {Grid, FormControl} from '@mui/material'
import {Controller, useFormContext} from 'react-hook-form'
import {Select, MenuItem, InputLabel} from '@mui/material'
import {getBranches} from 'src/store/catalogs/branches/actions'
import {useSelector, useDispatch} from 'react-redux'

const BranchID = props => {
  const hasBranchID = props.branchID,
    branchID = hasBranchID ? props.branchID: '',
    dispatch = useDispatch(),
    {branches} = useSelector(state => state.branches),
    handleBranch = (e, onChange) => {
      onChange(e.target.value)
    },
    { setValue, formState: {errors} } = useFormContext();

    if(branchID) {
      setValue('branchID', branchID)
    }

  useEffect(() => {
    dispatch(getBranches())
  }, [dispatch])

  return (
    <Grid item xs={12} md={3} sx={{marginTop: '6px'}}>
      <FormControl fullWidth>
        <Controller
          name='branchID'
          render={({field: {value, onChange}}) => (
            <>
              <InputLabel>Sucursal</InputLabel>
              <Select
                defaultValue = {branchID || ''}
                value={value || ''} 
                label='Tipo de Area' 
                onChange={e => handleBranch(e, onChange)}>
                {branches.map((branch, i) => (
                  <MenuItem key={i} value={branch.id}>
                    {branch.name}
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

export default BranchID
