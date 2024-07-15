import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import {NumericFormat} from 'react-number-format'

const CashField = ({input, value, onChange, error}) => {
  const handleValueChange = values => {
    onChange(values.value)
  }

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
    />
  )
}

export default CashField
