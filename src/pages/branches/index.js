import {Simple} from 'src/components/simple'
import {BRANCHES_ENDPOINT} from 'src/services/endpoints'
// import {useSelector, useDispatch} from 'react-redux'
// import {useEffect, useState, useMemo} from 'react'

const branchesColumns = [
  {
    flex: true,
    headerName: 'Nombre del mantenimiento',
    field: 'name',
    type: 'text',
    value: '',
    isRequired: true,
    width: 6
  },
  {
    flex: true,
    field: 'branchName',
    headerName: 'Sucursal',
    hideInput: true
  },
  {
    headerName: 'Sucursal',
    field: 'branchID',
    type: 'select',
    endpoint: `${BRANCHES_ENDPOINT}/branches`,
    options: [],
    value: 0,
    isRequired: true,
    width: 6,
    hideColumn: true
  },
  {
    flex: true,
    headerName: 'Descripcion de mantenimiento',
    field: 'description',
    type: 'text',
    value: '',
    width: 6
  },
  {
    flex: true,
    field: 'date',
    headerName: 'Fecha',
    type: 'date',
    value: '',
    isRequired: true,
    width: 6,
    hideColumn: true
  },
  {
    flex: true,
    field: 'zoneName',
    headerName: 'Zona',
    hideInput: true
  },
  {
    flex: true,
    headerName: 'Comentarios',
    field: 'notes',
    type: 'textarea',
    value: '',
    width: 6,
    hideColumn: true
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
            title: 'Detalles',
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
