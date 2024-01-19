// ** Toolkit imports
import {configureStore} from '@reduxjs/toolkit'

//farma reducers
import branches from './catalogs/branches/reducer'
import conceptsCat from 'src/store/catalogs/concepts/reducer'
import damagesCat from 'src/store/catalogs/damages/reducer'
import dimensionsCat from 'src/store/catalogs/dimensions/reducer'
import materialsCat from 'src/store/catalogs/materials/reducer'
import notifications from './notifications'
import requirementsCat from 'src/store/catalogs/requirements/reducer'
import serviceCat from 'src/store/catalogs/services/reducer'
import suppliers from 'src/store/catalogs/suppliers/reducer'
import users from 'src/store/catalogs/users/reducer'
import variablesCat from 'src/store/catalogs/variables/reducer'
import zones from 'src/store/catalogs/zones/reducer'

export const store = configureStore({
  reducer: {
    branches,
    conceptsCat,
    damagesCat,
    dimensionsCat,
    materialsCat,
    notifications,
    requirementsCat,
    serviceCat,
    suppliers,
    users,
    variablesCat,
    zones
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
