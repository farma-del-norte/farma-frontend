import {Simple} from 'src/components/simple'
import {
  MAINTENANCES_ENDPOINT,
  BRANCHES_ENDPOINT,
  SERVICES_ENDPOINT,
  SERVICES_CAT_ENDPOINT,
  SUPPLIERS_ENDPOINT
} from 'src/services/endpoints'
import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState, useMemo} from 'react'
import {getMaterialsCat} from 'src/store/catalogs/materials/actions'
import {getDimensionsCat} from 'src/store/catalogs/dimensions/actions'
import {getVariablesCat} from 'src/store/catalogs/variables/actions'
import {getConceptsCat} from 'src/store/catalogs/concepts/actions'
import {t} from 'i18next'

const maintenancesColumns = [
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

const maintenancesDetails = [
  {
    flex: true,
    headerName: 'Nombre del mantenimiento',
    field: 'name',
    type: 'text',
    value: '',
    isRequired: true,
    disabled: true,
    width: 6
  },
  {
    flex: true,
    field: 'branchName',
    headerName: 'Sucursal',
    disabled: true,
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
    disabled: true,
    hideColumn: true
  },
  {
    flex: true,
    headerName: 'Descripción de mantenimiento',
    field: 'description',
    type: 'text',
    value: '',
    disabled: true,
    width: 6
  },
  {
    flex: true,
    field: 'date',
    headerName: 'Fecha',
    type: 'date',
    value: '',
    isRequired: true,
    disabled: true,
    width: 6,
    hideColumn: true
  },
  {
    flex: true,
    field: 'zoneName',
    headerName: 'Zona',
    disabled: true,
    hideInput: true
  },
  {
    flex: true,
    headerName: 'Comentarios',
    field: 'notes',
    type: 'textarea',
    disabled: true,
    value: '',
    width: 6,
    hideColumn: true
  }
]

const servicesColumns = [
  {
    flex: true,
    headerName: 'Nombre del Servicio',
    field: 'name',
    type: 'text',
    value: '',
    width: 6
  },
  {
    flex: true,
    field: 'serviceCatName',
    headerName: t('services.columns.serviceCat', {ns: 'maintenances'}),
    hideInput: true
  },
  {
    headerName: 'Catálogo del servicio',
    field: 'serviceCatID',
    type: 'select',
    endpoint: `${SERVICES_CAT_ENDPOINT}/services-cat`,
    isRequired: true,
    width: 6,
    hideColumn: true
  },
  {
    flex: true,
    headerName: t('services.columns.date', {ns: 'maintenances'}),
    field: 'date',
    type: 'date',
    value: '',
    isRequired: true,
    width: 6,
    hideColumn: true
  },
  {
    flex: true,
    field: 'area',
    headerName: t('services.columns.area', {ns: 'maintenances'}),
    type: 'select',
    options: [],
    isRequired: true,
    width: 6,
    hideColumn: true
  },
  {
    flex: true,
    field: 'areaID',
    headerName: t('services.columns.area_type', {ns: 'maintenances'}),
    type: 'select',
    options: [],
    isRequired: true,
    width: 6,
    hideColumn: true
  },
  {
    flex: true,
    field: 'supplierName',
    headerName: t('services.columns.supplier', {ns: 'maintenances'}),
    hideInput: true
  },
  {
    headerName: 'Proveedor',
    field: 'supplierID',
    type: 'select',
    endpoint: `${SUPPLIERS_ENDPOINT}/suppliers`,
    fieldName: ['firstname', 'lastname'],
    value: 0,
    isRequired: true,
    width: 6,
    hideColumn: true
  },
  {
    flex: true,
    headerName: t('services.columns.cost', {ns: 'maintenances'}),
    field: 'cost',
    type: 'cash',
    value: '',
    isRequired: true,
    width: 6
  },
  {
    flex: true,
    headerName: t('services.columns.status', {ns: 'maintenances'}),
    field: 'status',
    type: 'select',
    options: [],
    keyValue: 'name',
    value: 0,
    isRequired: true,
    width: 6
  },
  {
    flex: true,
    headerName: t('services.columns.evidence', {ns: 'maintenances'}),
    field: 'evidence',
    accept: '.jpg,.png,.webp,pdf,application/pdf',
    owner: 'services',
    type: 'multimedia',
    value: [],
    hideColumn: true,
    width: 6
  },
  {
    flex: true,
    headerName: t('services.columns.notes', {ns: 'maintenances'}),
    field: 'notes',
    type: 'textarea',
    hideColumn: true,
    value: '',
    width: 6
  }
]

export default function Correctives() {
  const dispatch = useDispatch()
  const {form} = useSelector(state => state.form)
  const {materialsCat} = useSelector(state => state.materialsCat)
  const {dimensionsCat} = useSelector(state => state.dimensionsCat)
  const {variablesCat} = useSelector(state => state.variablesCat)
  const {conceptsCat} = useSelector(state => state.conceptsCat)
  const [servicesForm, setServicesForm] = useState(servicesColumns)
  const areas = useMemo(
    () => [
      {name: 'Materiales', id: 'Material'},
      {name: 'Dimensiones', id: 'Dimensión'},
      {name: 'Variables', id: 'Variable'},
      {name: 'Concepto', id: 'Concepto'}
    ],
    []
  )
  const status = useMemo(
    () => [
      {name: 'Planeación', id: 'Planeación'},
      {name: 'Desarrollo', id: 'Desarrollo'},
      {name: 'Finalizado', id: 'Finalizado'},
      {name: 'Cancelado', id: 'Cancelado'}
    ],
    []
  )

  // inicilaizar opciones de servicio
  useEffect(() => {
    setServicesForm(prevInputs => {
      const newInputs = [...prevInputs]
      newInputs[4].options = areas
      newInputs[9].options = status
      return newInputs
    })
    dispatch(getMaterialsCat())
    dispatch(getDimensionsCat())
    dispatch(getVariablesCat())
    dispatch(getConceptsCat())
  }, [areas, status, dispatch])

  const handleAreaId = options => {
    setServicesForm(prevInputs => {
      const newInputs = [...prevInputs]
      newInputs[5].options = options
      return newInputs
    })
  }

  // cambiar opciones en area
  useEffect(() => {
    if (form?.Servicio) {
      if (form.Servicio.area) {
        switch (form.Servicio.area) {
          case 'Material':
            handleAreaId(materialsCat)
            break
          case 'Dimensión':
            handleAreaId(dimensionsCat)
            break
          case 'Variable':
            handleAreaId(variablesCat)
            break
          case 'Concepto':
            handleAreaId(conceptsCat)
            break
          default:
            break
        }
      }
    }
  }, [form])

  return (
    <Simple
      table={{
        label: 'Mantenimientos',
        endpoints: {
          baseUrl: `${MAINTENANCES_ENDPOINT}/maintenances`
        },
        loading: true,
        showAddButton: true,
        columns: maintenancesColumns,
        actions: ['edit', 'detail', 'delete']
      }}
      modal={{
        title: 'Mantenimiento',
        size: 'lg',
        tabs: [
          {
            title: 'Detalles',
            indexActions: 1,
            form: maintenancesDetails
          },
          {
            title: 'Servicios',
            indexActions: 1,
            form: [
              {
                headerName: 'Servicios del mantenimiento',
                field: 'id',
                fieldName: 'maintenanceID',
                type: 'table',
                table: {
                  label: 'Servicios',
                  endpoints: {
                    baseUrl: `${SERVICES_ENDPOINT}/services/maintenances/:id`
                  },
                  showAddButton: true,
                  columns: servicesColumns,
                  actions: ['edit', 'delete']
                },
                modal: {
                  title: 'Servicio',
                  size: 'md',
                  form: servicesForm,
                  actions: {
                    back: 'Regresar',
                    save: 'Guardar'
                  }
                },
                width: 12
              }
            ]
          }
        ],
        form: [
          {
            headerName: 'Nombre del mantenimiento',
            field: 'name',
            type: 'text',
            value: '',
            isRequired: true,
            width: 6
          },
          {
            headerName: 'Sucursal',
            field: 'branchID',
            type: 'select',
            endpoint: `${BRANCHES_ENDPOINT}/branches`,
            options: [],
            value: 0,
            isRequired: true,
            width: 6
          },
          {
            headerName: 'Descripcion de mantenimiento',
            field: 'description',
            type: 'text',
            value: '',
            isRequired: true,
            width: 6
          },
          {
            headerName: 'Costo inicial',
            field: 'cost',
            type: 'cash',
            value: '',
            isRequired: true,
            width: 6,
            flex: true
          },
          {
            headerName: 'Fecha',
            field: 'date',
            type: 'date',
            value: '',
            isRequired: true,
            width: 6
          },
          {
            headerName: 'Comentarios',
            field: 'notes',
            type: 'textarea',
            isRequired: true,
            value: '',
            width: 6
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
