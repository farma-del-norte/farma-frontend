import {Simple} from 'src/components/simple'
import {BRANCHES_ENDPOINT, ZONES_ENDPOINT} from 'src/services/endpoints'
// import {useSelector, useDispatch} from 'react-redux'
// import {useEffect, useState, useMemo} from 'react'

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

export default function Branches() {
  // const dispatch = useDispatch()
  // const {form} = useSelector(state => state.form)
  // const [servicesForm, setServicesForm] = useState([])
  // const areas = useMemo(
  //   () => [
  //     {name: 'Materiales', id: 'Material'},
  //     {name: 'Dimensiones', id: 'Dimensión'},
  //     {name: 'Variables', id: 'Variable'},
  //     {name: 'Concepto', id: 'Concepto'}
  //   ],
  //   []
  // )
  // const status = useMemo(
  //   () => [
  //     {name: 'Planeación', id: 'Planeación'},
  //     {name: 'Desarrollo', id: 'Desarrollo'},
  //     {name: 'Finalizado', id: 'Finalizado'},
  //     {name: 'Cancelado', id: 'Cancelado'}
  //   ],
  //   []
  // )

  // // inicilaizar opciones de servicio
  // useEffect(() => {
  //   setServicesForm(prevInputs => {
  //     const newInputs = [...prevInputs]
  //     newInputs[4].options = areas
  //     newInputs[9].options = status
  //     return newInputs
  //   })
  //   dispatch(getMaterialsCat())
  //   dispatch(getDimensionsCat())
  //   dispatch(getVariablesCat())
  //   dispatch(getConceptsCat())
  // }, [areas, status, dispatch])

  // const handleAreaId = options => {
  //   setServicesForm(prevInputs => {
  //     const newInputs = [...prevInputs]
  //     newInputs[5].options = options
  //     return newInputs
  //   })
  // }

  // cambiar opciones en area
  // useEffect(() => {
  //   if (form?.Servicio) {
  //     if (form.Servicio.area) {
  //       switch (form.Servicio.area) {
  //         case 'Material':
  //           handleAreaId(materialsCat)
  //           break
  //         case 'Dimensión':
  //           handleAreaId(dimensionsCat)
  //           break
  //         case 'Variable':
  //           handleAreaId(variablesCat)
  //           break
  //         case 'Concepto':
  //           handleAreaId(conceptsCat)
  //           break
  //         default:
  //           break
  //       }
  //     }
  //   }
  // }, [form])

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
