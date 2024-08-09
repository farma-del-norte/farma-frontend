import {Simple} from 'src/components/simple'
import {BRANCHES_ENDPOINT, ZONES_ENDPOINT} from 'src/services/endpoints'
import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'
import {setValue} from 'src/store/form/reducer'

const branchesColumns = [
  {
    flex: true,
    headerName: 'Sucursal',
    field: 'name',
    type: 'text',
    value: '',
    isRequired: true,
    width: 6
  },
  {
    flex: true,
    field: 'simiAlias',
    headerName: 'Alias',
    type: 'text',
    width: 6,
    isRequired: true
  },
  {
    flex: true,
    field: 'key',
    headerName: 'Clave',
    type: 'text',
    width: 6,
    isRequired: true
  },
  {
    flex: true,
    field: 'type',
    headerName: 'Tipo',
    type: 'text',
    width: 6,
    isRequired: true
  },
  {
    flex: true,
    field: 'zoneName',
    headerName: 'Zona',
    type: 'text',
    hideInput: true
  },
  {
    headerName: 'Zona',
    field: 'zoneID',
    type: 'select',
    endpoint: `${ZONES_ENDPOINT}/zones`,
    options: [],
    value: 0,
    isRequired: true,
    width: 6,
    hideColumn: true
  },
  {
    flex: true,
    headerName: 'Codigo Postal',
    field: 'zipCode',
    type: 'text',
    value: '',
    isRequired: true,
    width: 6
  },
  {
    flex: true,
    headerName: 'Colonia',
    field: 'neighborhood',
    type: 'text',
    value: '',
    isRequired: true,
    width: 6
  },
  {
    flex: true,
    headerName: 'Ciudad',
    field: 'city',
    type: 'text',
    value: '',
    isRequired: true,
    width: 6
  },
  {
    flex: true,
    headerName: 'Estado',
    field: 'federalEntity',
    type: 'text',
    value: '',
    isRequired: true,
    width: 6
  },
  {
    flex: true,
    headerName: 'Calle',
    field: 'street',
    type: 'text',
    value: '',
    isRequired: true,
    width: 6
  }
]

const branchDetails = [
  {
    flex: true,
    headerName: 'Latitud',
    field: 'latitude',
    type: 'number',
    value: '',
    isRequired: true,
    width: 4
  },
  {
    flex: true,
    headerName: 'Longitud',
    field: 'longitude',
    type: 'number',
    value: '',
    isRequired: true,
    width: 4
  },
  {
    flex: true,
    field: 'mts2',
    headerName: 'Metros cuadrados',
    type: 'number',
    width: 4,
    isRequired: true
  },
  {
    flex: true,
    field: 'reflectiveCrossAds',
    headerName: 'Anuncios de cruz reflejantes',
    type: 'number',
    width: 4,
    isRequired: true
  },
  {
    flex: true,
    field: 'crossAds',
    headerName: 'Anuncios de cruz',
    type: 'number',
    width: 4
  },
  {
    flex: true,
    field: 'lettersAds',
    headerName: 'Anuncios de letras',
    type: 'number',
    width: 4
  },
  {
    flex: true,
    field: 'reflectiveAds',
    headerName: 'Anuncios reflejantes',
    type: 'number',
    width: 4
  },
  {
    flex: true,
    field: 'tarpAds',
    headerName: 'Anuncios de lona',
    type: 'number',
    width: 4
  },
  {
    flex: true,
    field: 'waterproofing',
    headerName: 'Impermeabilizado',
    type: 'select',
    options: [
      {name: 'Si', id: true},
      {name: 'No', id: false}
    ],
    width: 4
  },
  {
    flex: true,
    field: 'bathrooms',
    headerName: 'Baños',
    type: 'number',
    width: 4
  },
  {
    flex: true,
    field: 'airWash',
    headerName: 'Aire Lavado',
    type: 'number',
    width: 4
  },
  {
    flex: true,
    field: 'minisplit',
    headerName: 'Aire acondicionado',
    type: 'number',
    width: 4
  },
  {
    flex: true,
    field: 'curtains',
    headerName: 'Cortinas',
    type: 'number',
    width: 4
  },
  {
    flex: true,
    field: 'solarPanels',
    headerName: 'Paneles solares',
    type: 'select',
    options: [
      {name: 'Si', id: true},
      {name: 'No', id: false}
    ],
    width: 4
  }
]

const branchImages = [
  {
    flex: true,
    headerName: 'Fotos',
    field: 'pictures',
    accept: '.jpg,jpeg,.png,.webp,pdf,application/pdf,video/*',
    owner: 'services',
    type: 'textarea',
    //type: 'multimedia',
    value: [],
    width: 12
  }
]

export default function Branches() {
  const dispatch = useDispatch()
  const {form} = useSelector(state => state.form)

  useEffect(() => {
    console.debug(form)
  }, [])

  return (
    <Simple
      table={{
        label: 'Sucursales',
        endpoints: {
          baseUrl: `${BRANCHES_ENDPOINT}/branches`
        },
        loading: true,
        showAddButton: true,
        columns: branchesColumns,
        actions: ['edit', 'detail', 'delete']
      }}
      modal={{
        title: `Sucursales`,
        size: 'lg',
        form: branchesColumns,
        tabs: [
          {
            title: 'Sucursal',
            indexActions: 1,
            form: branchesColumns
          },
          {
            title: 'Detalles',
            endpoints: {
              baseUrl: `${BRANCHES_ENDPOINT}/branches/details/:id`
            },
            idField: {
              field: 'id',
              fieldName: 'branchID'
            },
            form: branchDetails
          },
          {
            title: 'Fotos',
            endpoints: {
              baseUrl: `${BRANCHES_ENDPOINT}/branches/details/:id`
            },
            idField: {
              field: 'id',
              fieldName: 'branchID'
            },
            form: branchImages
          }
        ],
        actions: {
          back: 'Regresar',
          save: 'Guardar'
        }
      }}
    />
  )
}
