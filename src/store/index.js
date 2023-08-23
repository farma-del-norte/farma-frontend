// ** Toolkit imports
import {configureStore} from '@reduxjs/toolkit'

//farma reducers
import dimensions from 'src/store/catalogs/dimensions/reducer'
import variables from 'src/store/catalogs/variables/reducer'
import concepts from 'src/store/catalogs/concepts/reducer'
import maintenance from 'src/store/catalogs/maintenance/reducer'
import materials from 'src/store/catalogs/materials/reducer'
import requirements from 'src/store/catalogs/requirements/reducer'
import claims from 'src/store/catalogs/claims/reducer'
import zones from 'src/store/catalogs/zones/reducer'
import suppliers from 'src/store/catalogs/suppliers/reducer'
import branches from './catalogs/branches'
import notifications from './notifications'

export const store = configureStore({
  reducer: {
    notifications,
    dimensions,
    variables,
    concepts,
    maintenance,
    materials,
    requirements,
    claims,
    zones,
    branches,
    suppliers
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
