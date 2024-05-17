import React from 'react'
import {Grid, FormControl} from '@mui/material'
import {Controller} from 'react-hook-form'
import Text from 'src/components/simple/form/inputs/Text'
import SelectField from 'src/components/simple/form/inputs/SelectField'
import PasswordField from 'src/components/simple/form/inputs/PasswordField'
import EmailField from 'src/components/simple/form/inputs/EmailField'
import MultipleSelectField from 'src/components/simple/form/inputs/MultipleSelectField'
import PhoneField from 'src/components/simple/form/inputs/PhoneField'
import Date from './inputs/Date'

const Inputs = ({input, value, onChange, error}) => {
  switch (input.type) {
    case 'text':
      return <Text input={input} value={value} onChange={onChange} error={error} />
    case 'select':
      return <SelectField input={input} value={value} onChange={onChange} error={error} />
    case 'multipleSelect':
      return <MultipleSelectField input={input} value={value} onChange={onChange} error={error} />
    case 'password':
      return <PasswordField input={input} value={value} onChange={onChange} error={error} />
    case 'email':
      return <EmailField input={input} value={value} onChange={onChange} error={error} />
    case 'phone':
      return <PhoneField input={input} value={value} onChange={onChange} error={error} />
    case 'date':
      return <Date input={input} value={value} onChange={onChange} error={error} />
    default:
      return <Text input={input} value={value} onChange={onChange} error={error} />
  }
}

const Form = ({inputs, control, resetField, reset, setValue, getValues}) => {
  const filteredInputs = inputs.filter(input => !input.hideInput)

  return (
    <Grid sx={{pt: '1rem'}} container spacing={5}>
      {filteredInputs.map((input, index) => (
        <Grid key={index} item xs={12} md={input.width}>
          <FormControl fullWidth>
            <Controller
              name={input.field}
              control={control}
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
