import {Simple} from 'src/components/simple'
import {
  MAINTENANCES_ENDPOINT,
  BRANCHES_ENDPOINT,
  SERVICES_ENDPOINT,
  SERVICES_CAT_ENDPOINT,
  SUPPLIERS_ENDPOINT,
  MATERIALS_ENDPOINT,
  MATERIALS_CAT_ENDPOINT,
  DAMAGES_CAT_ENDPOINT,
  DAMAGE_MAINTENANCE_ENDPOINT
} from 'src/services/endpoints'
import {useSelector, useDispatch} from 'react-redux'
import {useEffect, useState, useMemo} from 'react'
import {getMaterialsCat} from 'src/store/catalogs/materials/actions'
import {getDimensionsCat} from 'src/store/catalogs/dimensions/actions'
import {getVariablesCat} from 'src/store/catalogs/variables/actions'
import {getConceptsCat} from 'src/store/catalogs/concepts/actions'
import {setValue} from 'src/store/form/reducer'
import {t} from 'i18next'
import Tooltip from '@mui/material/Tooltip'

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
    options: [],
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
    options: [],
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
    accept: '.jpg,jpeg,.png,.webp,pdf,application/pdf,video/*',
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

const materialsColumns = [
  {
    flex: 1.4,
    headerName: 'Catálogo de Materiales',
    field: 'materialCatID',
    type: 'select',
    endpoint: `${MATERIALS_CAT_ENDPOINT}/materials-cat`,
    isRequired: true,
    width: 6,
    hideColumn: true
  },
  {
    flex: true,
    field: 'materialCatName',
    headerName: 'Material',
    hideInput: true
  },
  {
    flex: true,
    headerName: 'Servicios',
    field: 'serviceID',
    type: 'select',
    isRequired: true,
    width: 6,
    renderCell: params => {
      if (params.row.serviceName) {
        const serviceName = params.row.serviceName
        return (
          <Tooltip title={serviceName}>
            {serviceName.length > 15 ? serviceName.substring(0, 15) + '...' : serviceName}
          </Tooltip>
        )
      } else {
        return ''
      }
    }
  },
  {
    flex: true,
    field: 'units',
    headerName: 'Unidad',
    value: 'NA',
    defaultValue: 'NA',
    disabled: true,
    type: 'select',
    options: [
      {name: 'Kilómetro'},
      {name: 'Metro'},
      {name: 'Centímetro'},
      {name: 'Milímetro'},
      {name: 'Pulgada'},
      {name: 'Kilogramo'},
      {name: 'Gramo'},
      {name: 'Miligramo'},
      {name: 'Litro'},
      {name: 'Mililitro'},
      {name: 'Metro cúbico'},
      {name: 'Centímetro cúbico'},
      {name: 'Metro cuadrado'},
      {name: 'Centímetro cuadrado'},
      {name: 'NA'}
    ],
    isRequired: true,
    width: 6
  },
  {
    flex: true,
    field: 'unitCost',
    headerName: 'Costo por unidad',
    type: 'cash',
    isRequired: true,
    width: 6
  },
  {
    flex: true,
    field: 'quantity',
    headerName: 'Cantidad',
    type: 'number',
    isRequired: true,
    width: 6
  },
  {
    flex: true,
    field: 'totalCost',
    headerName: 'Costo total',
    type: 'cash',
    isRequired: true,
    width: 6
  },
  {
    flex: true,
    headerName: 'Notas',
    field: 'notes',
    type: 'textarea',
    value: '',
    width: 12,
    renderCell: params => {
      if (params.row.notes) {
        const notes = params.row.notes
        return <Tooltip title={notes}>{notes.length > 15 ? notes.substring(0, 15) + '...' : notes}</Tooltip>
      } else {
        return ''
      }
    }
  }
]

const siniestroColumns = [
  {
    headerName: 'Siniestro',
    field: 'damageCatID',
    endpoint: `${DAMAGES_CAT_ENDPOINT}/damages-cat`,
    type: 'select',
    options: [],
    value: '',
    width: 6
  },
  {
    headerName: 'Descripción',
    field: 'description',
    fieldName: 'Descripción',
    type: 'text',
    value: '',
    width: 6
  },
  {
    headerName: 'Notas',
    field: 'notes',
    fieldName: 'Notas',
    type: 'text',
    value: '',
    width: 6
  },
  {
    headerName: 'Fecha',
    field: 'date',
    fieldName: 'Fecha',
    type: 'date',
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
  const [materialsForm, setMaterialsForm] = useState(materialsColumns)
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
    setValue({
      fields: servicesForm,
      setFields: setServicesForm,
      inputFields: [{area: 'options'}, {status: 'options'}],
      values: [areas, status]
    })
    dispatch(getMaterialsCat())
    dispatch(getDimensionsCat())
    dispatch(getVariablesCat())
    dispatch(getConceptsCat())
  }, [areas, status, dispatch])

  // cambiar opciones en area
  useEffect(() => {
    if (form?.Servicio) {
      if (form.Servicio.area) {
        setValue({
          form,
          fields: servicesForm,
          setFields: setServicesForm,
          inputFields: {areaID: 'options'},
          watch: {Servicio: 'area'},
          values: {Material: materialsCat, Dimensión: dimensionsCat, Variable: variablesCat, Concepto: conceptsCat}
        })
      }
    }
  }, [form])
  //TODO: no cambia el valor de units al crear
  // Cambiar valor en unit
  useEffect(() => {
    const material = materialsCat.find(cat => cat.id === form.Material?.materialCatID)
    if (material) {
      if (!form?.Material?.id) {
        setValue({
          form,
          fields: materialsForm,
          setFields: setMaterialsForm,
          inputFields: {units: 'value'},
          values: material.units
        })
      } else {
        setValue({
          form,
          fields: materialsForm,
          setFields: setMaterialsForm,
          inputFields: {units: 'value'},
          values: material.units
        })
      }
    } else {
      setValue({
        form,
        fields: materialsForm,
        setFields: setMaterialsForm,
        inputFields: {units: 'value'},
        values: material?.units
      })
    }
  }, [materialsCat, form?.Material?.materialCatID])

  // agregar endpoint a select services
  useEffect(() => {
    if (form.Detalles?.id) {
      setValue({
        form,
        fields: materialsForm,
        setFields: setMaterialsForm,
        inputFields: {serviceID: 'endpoint'},
        values: `${SERVICES_ENDPOINT}/services/maintenances/${form.Detalles.id}`
      })
    }
  }, [form])

  useEffect(() => {
    if (form.Material?.quantity && form.Material?.unitCost) {
      const totalPrice = form.Material.unitCost * form.Material.quantity
      setValue({
        form,
        fields: materialsForm,
        setFields: setMaterialsForm,
        inputFields: {totalCost: 'value'},
        values: totalPrice.toString()
      })
    }
  }, [form])

  return (
    <Simple
      table={{
        label: 'Mantenimientos',
        endpoints: {
          baseUrl: `${MAINTENANCES_ENDPOINT}/maintenances`
        },
        serverMode: true,
        showAddButton: true,
        columns: maintenancesColumns,
        actions: ['edit', 'detail', 'delete']
      }}
      modal={{
        title: `Mantenimiento`,
        detailsTitle: `Mantenimiento ${form?.Detalles?.name} en ${form?.Detalles?.branchName}`,
        size: 'lg',
        tabs: [
          {
            title: 'Detalles',
            indexActions: 1,
            form: maintenancesDetails
          },
          {
            title: 'Siniestro',
            endpoints: {
              baseUrl: `${DAMAGE_MAINTENANCE_ENDPOINT}/damages/:id`
            },
            fieldName: 'maintenanceID',
            form: siniestroColumns
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
          },
          {
            title: 'Materiales',
            indexActions: 1,
            form: [
              {
                headerName: 'Materiales del mantenimiento',
                field: 'id',
                fieldName: 'materialsID',
                type: 'table',
                table: {
                  label: 'Materiales',
                  endpoints: {
                    baseUrl: `${MATERIALS_ENDPOINT}/materials/maintenance/:id`
                  },
                  showAddButton: true,
                  columns: materialsColumns,
                  actions: ['edit', 'delete']
                },
                modal: {
                  title: 'Material',
                  size: 'md',
                  form: materialsForm,
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
