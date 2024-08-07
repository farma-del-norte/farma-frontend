import {Select, MenuItem, InputLabel, FormControl} from '@mui/material'
import {useState, useEffect, useMemo} from 'react'
import {getCall} from 'src/store/simple/actions' // Assuming this fetches options
import {useSelector, useDispatch} from 'react-redux'
import {addList} from 'src/store/form/reducer'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import FormHelperText from '@mui/material/FormHelperText'
import OutlinedInput from '@mui/material/OutlinedInput'
const MultipleSelectField = ({input, value, onChange, disabled = input.disabled, error}) => {
  const dispatch = useDispatch()
  const [options, setOptions] = useState(input.options || []) // Initial options
  const defaultValue = input.value || [] // Initial value
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
  // si opciones se agregan por endpoint, obtiene las options
  useEffect(() => {
    if (input.endpoint) {
      dispatch(getCall(endpointsParams))
    }
  }, [dispatch, endpointsParams, input])

  // si opciones se agregan por endpoint, se guardara en su watch
  useEffect(() => {
    if (options.length) {
      dispatch(addList({label: input.headerName, watch: options}));
    }
  }, [dispatch, options, input.headerName])

  // actualiza options
  useEffect(() => {
    if (tables[keyList]) {
      setOptions(tables[keyList]?.list || [])
    }
  }, [tables, keyList])

  // set value
  useEffect(() => {
    onChange(input.value)
  }, [input.value])

  return (
    <FormControl fullWidth error={!!error}>
      <InputLabel>{label}</InputLabel>
      <Select
        multiple
        value={value || []}
        defaultValue={defaultValue}
        input={<OutlinedInput label={label} />}
        onChange={disabled ? () => null : onChange}
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
