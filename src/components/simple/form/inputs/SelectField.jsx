import {TextField, MenuItem} from '@mui/material'
import {useState, useEffect, useMemo} from 'react'
import {getCall} from 'src/store/simple/actions'
import {useSelector, useDispatch} from 'react-redux'

const Select = ({input, value, onChange, error}) => {
  const dispatch = useDispatch()
  const [options, setOptions] = useState(input.options || [])
  const label = input.isRequired ? `${input.headerName}* ` : input.headerName
  const {tables} = useSelector(state => state.simple)
  const defaultValue = input.value || ''
  //for reducer
  const keyList = input.headerName.replace(/\s+/g, '')
  const endpointsParams = useMemo(() => {
    return {
      endpoint: input.endpoint,
      key: keyList
    }
  }, [input.endpoint, keyList])

  // cuando desde la raiz se cambian opciones
  useEffect(() => {
    if (input?.options?.length) setOptions(input.options)
  }, [JSON.stringify(input.options)])

  // get options
  useEffect(() => {
    if (input.endpoint) {
      dispatch(getCall(endpointsParams))
    }
  }, [dispatch, endpointsParams, input.endpoint])

  // set options
  useEffect(() => {
    if (tables[keyList]) {
      setOptions(tables[keyList]?.list || [])
    }
  }, [tables, keyList])

  // set field name
  const rowField = row => {
    if (Array.isArray(input.fieldName)) {
      let name = ''
      for (let i = 0; i < input.fieldName.length; i++) {
        name += `${row[input.fieldName[i]]} `
      }
      return name
    } else if (input.fieldName) {
      return row[input.fieldName]
    }
    return row.name
  }

  useEffect(() => {
    if (input.value) {
      onChange(input.value)
    }
  }, [input.value, onChange])

  return (
    <TextField
      select
      value={value || ''}
      defaultValue={defaultValue}
      disabled={input.disabled === 'true' ? true : false}
      label={label}
      onChange={onChange}
      error={!!error}
      helperText={error ? error.message : ' '}
    >
      {}
      {options.map((item, id) => (
        <MenuItem key={id} value={item.id ? item.id : item.name ? item.name : rowField(item)}>
          {rowField(item)}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default Select
