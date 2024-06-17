import {Simple} from 'src/components/simple'
import {MAINTENANCES_ENDPOINT, BRANCHES_ENDPOINT, SERVICES_ENDPOINT, SERVICES_CAT_ENDPOINT, SUPPLIERS_ENDPOINT} from 'src/services/endpoints'
import {useSelector} from 'react-redux'
import { useEffect, useState, useMemo } from 'react'
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
    isRequired: true,
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

const servicesColumns = [
  {
    flex: true,
    field: 'serviceCatName',
    headerName: t('services.columns.serviceCat', {ns: 'maintenances'}),
    hideInput: true
  },
  {
    headerName: 'Catalogo del servicio',
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
    width: 6,
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
    owner: 'services',
    type: 'multimedia',
    value: [],
    width: 6,
  },
  {
    flex: true,
    headerName: t('services.columns.notes', {ns: 'maintenances'}),
    field: 'notes',
    type: 'textarea',
    isRequired: true,
    value: '',
    width: 6
  }
]

export default function PruebaSimple() {
  const {form} = useSelector(state => state.form)
  const [servicesForm, setServicesForm] = useState(servicesColumns)
  const areas = useMemo(
    () => [
      { name: 'Materiales', value: 'Material' },
      { name: 'Dimensiones', value: 'Dimensión' },
      { name: 'Variables', value: 'Variable' },
      { name: 'Concepto', value: 'Concepto' },
    ],
    []
  );
  const status = useMemo(
    () => [
    { name: 'Planeación', value: 'Planeación'},
    { name: 'Desarrollo', value: 'Desarrollo'},
    { name: 'Finalizado', value: 'Finalizado'},
    { name: 'Cancelado', value: 'Cancelado' },
  ],[]
  );

  // inicilaizar opciones de servicio
  useEffect(() => {
    setServicesForm(prevInputs => {
      const newInputs = [...prevInputs]
      newInputs[3].options = areas;
      newInputs[7].options = status;
      return newInputs;
    });
  }, [areas, status])

  useEffect(() => {
    if(form?.Servicio) {
      if (form.Servicio.area) {
        console.log('altera options', form.Servicio.area)
        setServicesForm(prevInputs => {
          const newInputs = [...prevInputs]
          console.log('newInputs', newInputs[4])
          newInputs[4].options = status;
          return newInputs;
        })
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
            form: maintenancesColumns
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
                width: 12,
              },
            ],
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
          },
        ],
        actions: {
          back: 'Regresar',
          save: 'Guardar'
        }
      }}
    />
  )
}
