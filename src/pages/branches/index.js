import {Simple} from 'src/components/simple'
import {BRANCHES_ENDPOINT, ZONES_ENDPOINT, MEDIA_ENDPOINT} from 'src/services/endpoints'
import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'
import {setValue} from 'src/store/form/reducer'
import {onZipCodeChange} from 'src/utils/functions'

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
    type: 'select',
    options: [{name: 'Sucursal'}, {name: 'Oficina'}, {name: 'Bodega'}],
    width: 6,
    value: 0,
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
    headerName: 'Calle',
    field: 'street',
    type: 'text',
    value: '',
    isRequired: true,
    width: 6
  },
  {
    flex: true,
    headerName: 'Numero de Exterior',
    field: 'extNumber',
    type: 'text',
    value: '',
    isRequired: true,
    width: 6
  },
  {
    flex: true,
    headerName: 'Numero de Interior',
    field: 'intNumber',
    type: 'text',
    value: '',
    isRequired: false,
    width: 6
  },
  {
    flex: true,
    headerName: 'Código Postal',
    field: 'zipCode',
    type: 'zipCode',
    value: '',
    isRequired: true,
    width: 6
  },
  {
    flex: true,
    headerName: 'Colonia',
    field: 'neighborhood',
    type: 'select',
    options: [],
    disabled: 'true',
    fieldName: 'neighborhood',
    value: '',
    isRequired: true,
    width: 6
  },
  {
    flex: true,
    headerName: 'Ciudad',
    field: 'city',
    disabled: 'true',
    type: 'city',
    value: '',
    isRequired: true,
    width: 6
  },
  {
    flex: true,
    headerName: 'Estado',
    field: 'federalEntity',
    disabled: 'true',
    type: 'federalEntity',
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
    isRequired: false,
    width: 4
  },
  {
    flex: true,
    headerName: 'Longitud',
    field: 'longitude',
    type: 'number',
    value: '',
    isRequired: false,
    width: 4
  },
  {
    flex: true,
    field: 'mts2',
    headerName: 'Metros cuadrados',
    type: 'number',
    width: 4,
    isRequired: false
  },
  {
    flex: true,
    field: 'reflectiveCrossAds',
    headerName: 'Anuncios de cruz reflejantes',
    type: 'number',
    width: 4,
    isRequired: false
  },
  {
    flex: true,
    field: 'crossAds',
    headerName: 'Anuncios de cruz',
    type: 'number',
    width: 4,
    isRequired: false
  },
  {
    flex: true,
    field: 'lettersAds',
    headerName: 'Anuncios de letras',
    type: 'number',
    width: 4,
    isRequired: false
  },
  {
    flex: true,
    field: 'reflectiveAds',
    headerName: 'Anuncios reflejantes',
    type: 'number',
    width: 4,
    isRequired: false
  },
  {
    flex: true,
    field: 'tarpAds',
    headerName: 'Anuncios de lona',
    type: 'number',
    width: 4,
    isRequired: false
  },
  {
    flex: true,
    field: 'waterproofing',
    headerName: 'Impermeabilizado',
    type: 'select',
    options: [
      {name: 'Si', id: 1},
      {name: 'No', id: 0}
    ],
    width: 4,
    isRequired: false
  },
  {
    flex: true,
    field: 'bathrooms',
    headerName: 'Baños',
    type: 'number',
    width: 4,
    isRequired: false
  },
  {
    flex: true,
    field: 'airWash',
    headerName: 'Aire Lavado',
    type: 'number',
    width: 4,
    isRequired: false
  },
  {
    flex: true,
    field: 'minisplit',
    headerName: 'Aire acondicionado',
    type: 'number',
    width: 4,
    isRequired: false
  },
  {
    flex: true,
    field: 'curtains',
    headerName: 'Cortinas',
    type: 'number',
    width: 4,
    isRequired: false
  },
  {
    flex: true,
    field: 'solarPanels',
    headerName: 'Paneles solares',
    type: 'select',
    options: [
      {name: 'Si', id: 1},
      {name: 'No', id: 0}
    ],
    width: 4,
    isRequired: false
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
  const [branchesForm, setBranchesForm] = useState(branchesColumns)
  const [AddressInfo, setAddressInfo] = useState([])

  useEffect(() => {
    if (form.Sucursales?.id !== undefined && form.Sucursales.id !== null) {
      setAddressInfo(onZipCodeChange(form.Sucursales.zipCode))
    } else if (form.Sucursales?.id === undefined || form.Sucursales.id === null) {
      setAddressInfo([])
    }
  }, [form.Sucursales?.id])

  useEffect(() => {
    if (form.Sucursales?.zipCode && form.Sucursales.zipCode.length >= 4 && /^\d+$/.test(form.Sucursales.zipCode)) {
      setAddressInfo(onZipCodeChange(form.Sucursales.zipCode))
    } else if (form.Sucursales?.zipCode && form.Sucursales.zipCode.length < 4 && AddressInfo.length > 0) {
      setAddressInfo([])
    }
  }, [form.Sucursales?.zipCode])

  useEffect(() => {
    if (AddressInfo.length > 0) {
      setValue({
        form,
        fields: branchesForm,

        setFields: setBranchesForm,
        inputFields: [
          {neighborhood: 'type'},
          {neighborhood: 'disabled'},
          {neighborhood: 'options'},
          {neighborhood: 'value'},
          {federalEntity: 'value'},
          {city: 'value'}
        ],
        values: [
          'select',
          'false',
          AddressInfo,
          AddressInfo[0]?.neighborhood,
          AddressInfo[0]?.federalEntity,
          AddressInfo[0]?.city
        ]
      })
    } else if (AddressInfo.length === 0) {
      setValue({
        form,
        fields: branchesForm,
        setFields: setBranchesForm,
        inputFields: [
          {neighborhood: 'type'},
          {neighborhood: 'disabled'},
          {neighborhood: 'options'},
          {neighborhood: 'value'},
          {federalEntity: 'value'},
          {city: 'value'}
        ],
        values: ['neighborhood', 'true', [], ' ', ' ', ' ']
      })
    }
  }, [AddressInfo])

  return (
    <Simple
      table={{
        label: 'Sucursales',
        endpoints: {
          baseUrl: `${BRANCHES_ENDPOINT}/branches`
        },
        loading: true,
        showAddButton: true,
        columns: branchesForm,
        actions: ['edit', 'detail', 'delete']
      }}
      modal={{
        title: `Sucursales`,
        size: 'lg',
        form: branchesForm,
        tabs: [
          {
            title: 'Sucursal',
            indexActions: 1,
            form: branchesColumns
          },
          {
            title: 'Detalles',
            endpoints: {
              baseUrl: `${BRANCHES_ENDPOINT}/branch-details/:id`
            },
            fieldName: 'branchID',
            form: branchDetails
          },
          {
            title: 'Fotos',
            endpoints: {
              baseUrl: `${MEDIA_ENDPOINT}/media/owner/:id`
            },
            fieldName: 'branchID',
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
