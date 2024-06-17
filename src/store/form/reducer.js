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

export default formSlice.reducer

export const {changeForm} = formSlice.actions