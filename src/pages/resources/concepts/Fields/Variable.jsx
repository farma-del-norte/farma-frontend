import {useEffect, useState} from 'react'
import {Grid, FormControl} from '@mui/material'
import {Controller, useFormContext} from 'react-hook-form'
import {Select, MenuItem, InputLabel} from '@mui/material'
import { getVariablesCat } from 'src/store/catalogs/variables/actions'
import { getConceptsCat } from 'src/store/catalogs/concepts/actions'
import {useSelector, useDispatch} from 'react-redux'

const Variable = props => {
  const hasId = props.variablesID,
    variablesID = hasId ? props.variablesID : '',
    dispatch = useDispatch(),
    { conceptsCat } = useSelector(state => state.conceptsCat),
    { variablesCat } = useSelector(state => state.variablesCat),
    handleZone = (e, onChange) => {
      onChange(e.target.value)
    },
    { setValue, formState: {errors} } = useFormContext();

    if(variablesID) {
      setValue('variablesID', variablesID)
    }

    useEffect(() => {
        dispatch(getConceptsCat())
        if (variablesCat.length == 0) {
          dispatch(getVariablesCat())
        }
      }, [dispatch, variablesCat])

  return (
    <Grid item xs={12} md={3} sx={{marginTop: '6px'}}>
      <FormControl fullWidth>
        <Controller
          name='variablesID'
          render={({field: {value, onChange}}) => (
            <>
              <InputLabel>Variables</InputLabel>
              <Select
                defaultValue={variablesID || ''}
                value={value || ''}
                label='Variables ID'
                onChange={e => handleZone(e, onChange)}
              >
                {variablesCat.map((variableCat, i) => (
                  <MenuItem key={i} value={variableCat.id}>
                    {variableCat.name}
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

export default Variable