import {TextField, MenuItem} from '@mui/material'
import {useState, useEffect, useMemo} from 'react'
import {getCall} from 'src/store/simple/actions'
import {useSelector, useDispatch} from 'react-redux'

const Text = ({input, value, onChange, error}) => {
  const dispatch = useDispatch()
  const [options, setOptions] = useState(input.options || [])
  const label = input.isRequired ? `${input.headerName}* ` : input.headerName
  const {tables} = useSelector(state => state.simple)
  const defaultValue = input.value || value || ''
  //for reducer
  const keyList = input.headerName.replace(/\s+/g, '')
  const endpointsParams = useMemo(() => {
    return {
      endpoint: input.endpoint,
      key: keyList
    }
  }, [input.endpoint, keyList])

  // get options
  useEffect(() => {
    if (input.endpoint) {
      dispatch(getCall(endpointsParams))
    }
  }, [dispatch, keyList, endpointsParams, input])

  // set options
  useEffect(() => {
    if (tables[keyList]) {
      setOptions(tables[keyList]?.list || [])
    }
  }, [tables, keyList])

  useEffect(() => {
    console.log('options', options)
  }, [options])

  return (
    <TextField
      select
      value={defaultValue}
      label={label}
      onChange={onChange}
      error={!!error}
      helperText={error ? error.message : ' '}
    >
      {options.map((item, id) => (
        <MenuItem key={id} value={item.id ? item.id : item.name}>
          {item.name}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default Text
