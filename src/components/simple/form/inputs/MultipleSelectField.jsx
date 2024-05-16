import {Select, MenuItem, InputLabel, FormControl} from '@mui/material'
import {useState, useEffect, useMemo} from 'react'
import {getCall} from 'src/store/simple/actions' // Assuming this fetches options
import {useSelector, useDispatch} from 'react-redux'

const MultipleSelectField = ({input, value, onChange, error}) => {
  const dispatch = useDispatch()
  const [options, setOptions] = useState(input.options || []) // Initial options
  const label = input.isRequired ? `${input.headerName}* ` : input.headerName
  const {tables} = useSelector(state => state.simple)

  // for reducer
  const keyList = input.headerName.replace(/\s+/g, '')
  const endpointsParams = useMemo(
    () => ({
      endpoint: input.endpoint,
      key: keyList
    }),
    [input.endpoint, keyList]
  )

  // Get options on mount or endpoint change
  useEffect(() => {
    if (input.endpoint) {
      dispatch(getCall(endpointsParams))
    }
  }, [dispatch, keyList, endpointsParams, input])

  // Set options from state
  useEffect(() => {
    if (tables[keyList]) {
      setOptions(tables[keyList]?.list || []) // Handle empty list case
    }
  }, [tables, keyList])

  return (
    <FormControl fullWidth error={!!error}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={value || []} // Handle empty value case
        label={label}
        onChange={onChange}
      >
        {options.map((item, id) => (
          <MenuItem key={id} value={item.id}>
            {item.name}
          </MenuItem>
        ))}
      </Select>
      {error && <span style={{color: 'red'}}>{error.message}</span>}
    </FormControl>
  )
}

export default MultipleSelectField
