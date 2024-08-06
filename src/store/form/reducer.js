import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  form: {},
}

export const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    /* change/add form */
    changeForm: (state, {payload}) => {
      const { keyForm, watch } = payload;
      state.form[keyForm] = watch
    },
  },
})

export const setValue = ({form, watch, fields, setFields, inputFields, values}) => {
  // funcion donde cambia un valor
  const checkExternalInput = (value) => {
    if (watch) {
      const formKey = Object.keys(watch)
      const inputKey = Object.values(watch)

      // si es un solo valor
      if (typeof value !== 'object') {
        return { available: true, newValue: value }
      }

      // si pueden ser diferentes valores
      if (!form[formKey]) {
        return { available: false, newValue: value }
      }

      if (values[form[formKey][inputKey]]) {
        return { available: true, newValue: values[form[formKey][inputKey]] }
      }
    }
    return { available: true, newValue: value }
  }
  const changeValue = (field, fieldKey, value) => {
    let {available, newValue} = checkExternalInput(value)
    // check if input is available to change value
    if (available) {
      const inputId = fields.findIndex(input => input.field === field);
      if (inputId >= 0) {
        setFields(prevInputs => {
          const newInputs = [...prevInputs]
          newInputs[inputId][fieldKey] = newValue
          return newInputs
        })
      } else {
        console.error(`[setValue] Error: input not found for field: ${inputsToSet[i][0]}`)
      }
    }
  }
  // va a asignar mas de 1 valor
  if (Array.isArray(inputFields)) {
    const inputsToSet = inputFields.map(input => Object.keys(input));
    const keysToSet = inputFields.map(input => Object.values(input));
    
    if ((inputsToSet.length === keysToSet.length) && (inputsToSet && values) && Array.isArray(values)) {
      // setValues to field
      for (let i = 0; i < inputsToSet.length; i++) {
        changeValue(inputsToSet[i][0], keysToSet[i][0], values[i])
      }
    } else {
      console.error('[setValue] Error: send inputFields like this: [{field: "inputKey"}, ...] or values as Array')
    }
  } else {
    // asigna solo un valor si llega solo en objeto
    try {
      const inputToSet = Object.keys(inputFields)[0];
      const keyToSet = Object.values(inputFields)[0];
      changeValue(inputToSet, keyToSet, values)
    } catch (error) {
      console.error(error)
    }
  }
}

export default formSlice.reducer

export const {changeForm} = formSlice.actions