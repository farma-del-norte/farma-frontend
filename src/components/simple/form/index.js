import React from 'react'
import {Grid, FormControl} from '@mui/material'
import {Controller} from 'react-hook-form'
import InputManager from 'src/components/simple/form/inputManager'

const Form = ({inputs, control}) => {
  const filteredInputs = inputs.filter(input => !input.hideInput)

  return (
    <Grid container spacing={3} sx={{pt: 2}}>
      {filteredInputs.map((input, index) => (
        <Grid key={index} item xs={12} md={input.width}>
          <FormControl fullWidth>
            <Controller
              name={input.field}
              control={control}
              render={({field: {value, onChange}, fieldState: {error}}) => (
                <InputManager input={input} value={value} onChange={onChange} error={error} />
              )}
            />
          </FormControl>
        </Grid>
      ))}
    </Grid>
  )
}

export default Form
