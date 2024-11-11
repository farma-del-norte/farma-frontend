import {createSlice} from '@reduxjs/toolkit'
import {getCall, createCall, editCall, deleteCall} from './actions'

const initialState = {
  tables: {},
  forms: {},
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
      const type = action.meta.arg.type || 'tables';
      const key = action.meta.arg.key
      if (!state[type][key] && type === 'tables')
        state.tables[key] = { isLoading: true, list: [], pagination: { lastPage: 0, rowsPerPage: 8 } }
      if (!state[type][key] && type === 'forms') state.forms[key] = { isLoading: true, found: false, values: {} }
    })
    builder.addCase(getCall.fulfilled, (state, action) => {
      const type = action.meta.arg.type || 'tables';
      const key = action.meta.arg.key
      if (state[type][key] && type === 'tables') {
        const {pagination} = action.meta.arg
        state.tables[key].list = action.payload.content
        // pagination
        if (pagination) {
          const rowsPerPage = Math.round(action.payload.meta.totalItems / action.payload.meta.lastPage)
          state.tables[key].pagination.lastPage = Math.round(action.payload.meta.lastPage / rowsPerPage)
          state.tables[key].pagination.rowsPerPage = rowsPerPage
        }
        state.tables[key].isLoading = false
      }
      if (state[type][key] && type === 'forms') state.forms[key] = { isLoading: false, found: Object.keys(action.payload.content).length > 0, values: action.payload.content }
    })
    builder.addCase(getCall.rejected, (state, action) => {
      const type = action.meta.arg.type || 'tables';
      const key = action.meta.arg.key

      if (state[type][key] && type === 'tables') state.tables[key] = { isLoading: false, list: [] }
      if (state[type][key] && type === 'forms') state.forms[key] = { isLoading: true, values: [] }
    })
    builder.addCase(createCall.pending, (state, action) => {
      const type = action.meta.arg.endpointsParams.type || 'tables';
      const key = action.meta.arg.endpointsParams.key

      if (!state[type][key] && type === 'tables') {
        state.tables[key].isLoading = true
      } else if (!state[type][key] && type === 'forms') state.forms[key].isLoading = true
    })
    builder.addCase(createCall.fulfilled, (state, action) => {
      const type = action.meta.arg.endpointsParams.type || 'tables';
      const key = action.meta.arg.endpointsParams.key
      if (state[type][key] && type === 'tables') {
        state.tables[key].list = action.payload.content
        state.tables[key].isLoading = false
      } else if (state[type][key] && type === 'forms') state.forms[key].isLoading = false
    })
    builder.addCase(createCall.rejected, (state, action) => {
      const type = action.meta.arg.endpointsParams.type || 'tables';
      const key = action.meta.arg.endpointsParams.key
      if (state[type][key] && type === 'tables') {
        state.tables[key].isLoading = false
      } else if (state[type][key] && type === 'forms') state.forms[key].isLoading = false
    })
    builder.addCase(editCall.pending, (state, action) => {
      const type = action.meta.arg.endpointsParams.type || 'tables';
      const key = action.meta.arg.endpointsParams.key

      if (!state[type][key] && type === 'tables') {
        state.tables[key].isLoading = true
      } else if (!state[type][key] && type === 'forms') state.forms[key].isLoading = true
    })
    builder.addCase(editCall.fulfilled, (state, action) => {
      const type = action.meta.arg.endpointsParams.type || 'tables';
      const key = action.meta.arg.endpointsParams.key

      if (state[type][key] && type === 'tables') {
        state.tables[key].list = action.payload.content
        state.tables[key].isLoading = false
      } else if (state[type][key] && type === 'forms'){ 
        state.forms[key].isLoading = false
        state.forms[key].values = action.payload.content
      }
    })
    builder.addCase(editCall.rejected, (state, action) => {
      const type = action.meta.arg.endpointsParams.type || 'tables';
      const key = action.meta.arg.endpointsParams.key
      if (!state[type][key] && type === 'tables') {
        state.tables[key].isLoading = false
      } else if (!state[type][key] && type === 'forms') state.forms[key].isLoading = false
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