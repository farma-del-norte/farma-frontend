import React from 'react'
import {Grid, FormControl} from '@mui/material'
import {Controller} from 'react-hook-form'
import Text from './inputs/Text'

const Inputs = ({input, value, onChange, error}) => {
  switch (input.type) {
    case 'text':
      return <Text input={input} value={value} onChange={onChange} error={error} />
  }
}

const Form = ({inputs, control, resetField, reset, setValue, getValues}) => {
  const filteredInputs = inputs.filter(input => !input.onlyTable)

  return (
    <Grid sx={{pt: '1rem'}} container spacing={5}>
      {filteredInputs.map((input, index) => (
        <Grid key={index} item xs={12} md={input.width}>
          <FormControl fullWidth>
            <Controller
              name={input.name}
              control={control}
              rules={{required: input.isRequired}}
              render={({field: {value, onChange}, fieldState: {error}}) => (
                <Inputs input={input} value={value} onChange={onChange} error={error} />
              )}
            />
          </FormControl>
        </Grid>
      ))}
    </Grid>
  )
}

export default Form
