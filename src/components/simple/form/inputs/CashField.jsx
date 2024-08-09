import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import {NumericFormat} from 'react-number-format'
import {useEffect} from 'react'

const CashField = ({input, value, onChange, error}) => {
  const handleValueChange = values => {
    onChange(values.value)
  }

  useEffect(() => {
    if (input.value) onChange(input.value)
  }, [input.value])

  return (
    <NumericFormat
      value={value}
      thousandSeparator={true}
      decimalScale={2}
      disabled={input.disabled}
      fixedDecimalScale={true}
      //prefix={'$'}
      customInput={TextField}
      label={input.headerName + (input.isRequired ? '*' : '')}
      onValueChange={handleValueChange}
      error={!!error}
      helperText={error ? error.message : ' '}
      InputProps={{
        startAdornment: <InputAdornment position='start'>$</InputAdornment>
      }}
      inputProps={{
        disabled: input.disabled
      }}
    />
  )
}

export default CashField
