import {Select, MenuItem, InputLabel, FormControl} from '@mui/material'
import {useState, useEffect, useMemo} from 'react'
import {getCall} from 'src/store/simple/actions' // Assuming this fetches options
import {useSelector, useDispatch} from 'react-redux'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import FormHelperText from '@mui/material/FormHelperText'
import OutlinedInput from '@mui/material/OutlinedInput'
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

  useEffect(() => {
    if (input.endpoint) {
      dispatch(getCall(endpointsParams))
    }
  }, [dispatch, keyList, endpointsParams, input])

  useEffect(() => {
    if (tables[keyList]) {
      setOptions(tables[keyList]?.list || [])
    }
  }, [tables, keyList])

  return (
    <FormControl fullWidth error={!!error}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={value || []}
        input={<OutlinedInput label={label} />}
        onChange={onChange}
        renderValue={selected =>
          selected.map(id => {
            const item = options.find(option => option.id === id)
            return item ? `${item.name}, ` : options.find(option => !option.id)?.name
          })
        }
      >
        {options.map((item, id) => (
          <MenuItem key={id} value={item.id}>
            <Checkbox checked={value?.indexOf(item.id) > -1} />
            <ListItemText primary={item.name} />
          </MenuItem>
        ))}
      </Select>
      {error && (
        <FormHelperText color='error' type='text2'>
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  )
}

export default MultipleSelectField
