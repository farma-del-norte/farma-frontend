// ** Toolkit imports
import {configureStore} from '@reduxjs/toolkit'

//farma reducers
import budgets from './budgets/reducer'
import branches from './catalogs/branches/reducer'
import conceptsCat from 'src/store/catalogs/concepts/reducer'
import damages from 'src/store/maintenances/damages/reducer'
import damagesCat from 'src/store/catalogs/damages/reducer'
import dimensionsCat from 'src/store/catalogs/dimensions/reducer'
import materialsCat from 'src/store/catalogs/materials/reducer'
import requirementsCat from 'src/store/catalogs/requirements/reducer'
import serviceCat from 'src/store/catalogs/services/reducer'
import suppliers from 'src/store/catalogs/suppliers/reducer'
import users from 'src/store/catalogs/users/reducer'
import variablesCat from 'src/store/catalogs/variables/reducer'
import zones from 'src/store/catalogs/zones/reducer'
import maintenances from 'src/store/maintenances/correctives/reducer'
import services from 'src/store/maintenances/services/reducer'
import materials from 'src/store/maintenances/materials/reducer'
import media from 'src/store/media/reducer'

export const store = configureStore({
  reducer: {
    budgets,
    branches,
    conceptsCat,
    damages,
    damagesCat,
    dimensionsCat,
    materialsCat,
    requirementsCat,
    serviceCat,
    suppliers,
    users,
    variablesCat,
    zones,
    maintenances,
    services,
    materials,
    media
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
