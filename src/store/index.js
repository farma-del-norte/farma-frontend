// ** Toolkit imports
import {combineReducers, configureStore} from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
//inmunosalud reducers
import session from 'src/store/session'
import users from 'src/store/users'
import notifications from 'src/store/notifications'
import general from 'src/store/dashboard/generalSlice'
import address from 'src/store/address'
import paymentMethods from 'src/store/paymentMethods'
import register from 'src/store/register'
import cart from 'src/store/cart'

import products from 'src/store/products'
import comissions from 'src/store/comissions'
import orders from 'src/store/orders'

//farma reducers
import dimensions from 'src/store/catalogs/dimensions/reducer'
import variables from 'src/store/catalogs/variables'
import concepts from 'src/store/catalogs/concepts'
import maintenance from 'src/store/catalogs/maintenance'
import materials from 'src/store/catalogs/materials'
import requirements from 'src/store/catalogs/requirements'
import claims from 'src/store/catalogs/claims'
import zones from 'src/store/catalogs/zones'
import branches from './catalogs/branches'

export const store = configureStore({
  reducer: {
    user,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    cart,
    //new reducers
    session,
    users,
    notifications,
    products,
    comissions,
    orders,
    paymentMethods,
    address,
    register,
    dimensions,
    variables,
    concepts,
    maintenance,
    materials,
    requirements,
    claims,
    zones,
    branches,
    dashboard: combineReducers({general})
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
