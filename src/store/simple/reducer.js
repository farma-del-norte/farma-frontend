import {createSlice} from '@reduxjs/toolkit'
import {getCall, createCall, editCall, deleteCall} from './actions'

const initialState = {
  tables: {},
}

export const simpleSlice = createSlice({
  name: 'simple',
  initialState,
  reducers: {
    /* edit modal */
    initList: (state, {payload}) => {
      state.tables[payload] = { isLoading: true, list: [] }
    },
  },
  extraReducers: builder => {
    builder.addCase(getCall.pending, (state, action) => {
      const key = action.meta.arg.key
      if (!state.tables[key])
        state.tables[key] = { isLoading: true, list: [] }
    })
    builder.addCase(getCall.fulfilled, (state, action) => {
      const key = action.meta.arg.key
      state.tables[key].list = action.payload.content
      state.tables[key].isLoading = false
    })
    builder.addCase(getCall.rejected, (state, action) => {
      const key = action.meta.arg.key
      state.tables[key].isLoading = false
    })
    builder.addCase(createCall.pending, (state, action) => {
      const key = action.meta.arg.endpointsParams.key
      state.tables[key].isLoading = true
    })
    builder.addCase(createCall.fulfilled, (state, action) => {
      const key = action.meta.arg.endpointsParams.key
      state.tables[key].list = action.payload.content
      state.tables[key].isLoading = false
    })
    builder.addCase(createCall.rejected, (state, action) => {
      const key = action.meta.arg.endpointsParams.key
      state.tables[key].isLoading = false
    })
    builder.addCase(editCall.pending, (state, action) => {
      const key = action.meta.arg.endpointsParams.key
      state.tables[key].isLoading = true
    })
    builder.addCase(editCall.fulfilled, (state, action) => {
      const key = action.meta.arg.endpointsParams.key
      state.tables[key].list = action.payload.content
      state.tables[key].isLoading = false
    })
    builder.addCase(editCall.rejected, (state, action) => {
      const key = action.meta.arg.endpointsParams.key
      state.tables[key].isLoading = false
    })
    builder.addCase(deleteCall.pending, (state, action) => {
      const key = action.meta.arg.endpointsParams.key
      state.tables[key].isLoading = true
    })
    builder.addCase(deleteCall.fulfilled, (state, action) => {
      const key = action.meta.arg.endpointsParams.key
      state.tables[key].list = action.payload.content
      state.tables[key].isLoading = false
    })
    builder.addCase(deleteCall.rejected, (state, action) => {
      const key = action.meta.arg.endpointsParams.key
      state.tables[key].isLoading
    })
  }
})

export default simpleSlice.reducer

export const {initList} = simpleSlice.actions