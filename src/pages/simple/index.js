import {Simple} from 'src/components/simple'
import {MAINTENANCES_ENDPOINT, BRANCHES_ENDPOINT, SERVICES_ENDPOINT, SERVICES_CAT_ENDPOINT, SUPPLIERS_ENDPOINT} from 'src/services/endpoints'
import {t} from 'i18next'

const maintenancesColumns = [
  {
    flex: true,
    field: 'name',
    headerName: 'Mantenimiento'
  },
  {
    flex: true,
    field: 'branchName',
    headerName: 'Sucursal'
  },
  {
    flex: true,
    field: 'description',
    headerName: 'descripciòn'
  },
  {
    flex: true,
    field: 'date',
    headerName: 'fecha'
  },
  {
    flex: true,
    field: 'zoneName',
    headerName: 'Zona'
  },
  {
    flex: true,
    field: 'cost',
    headerName: 'Costo'
  }
]

const servicesColumns = [
  {
    flex: true,
    field: 'serviceCatName',
    headerName: t('services.columns.serviceCat', {ns: 'maintenances'})
  },
  {
    flex: true,
    field: 'date',
    headerName: t('services.columns.date', {ns: 'maintenances'})
  },
  {
    flex: true,
    field: 'area',
    headerName: t('services.columns.area_type', {ns: 'maintenances'})
  },
  {
    flex: true,
    field: 'supplierName',
    headerName: t('services.columns.supplier', {ns: 'maintenances'})
  },
  {
    flex: true,
    field: 'cost',
    headerName: t('services.columns.cost', {ns: 'maintenances'})
  },
  {
    flex: true,
    field: 'status',
    headerName: t('services.columns.status', {ns: 'maintenances'})
  },
  {
    flex: true,
    field: 'notes',
    headerName: t('services.columns.notes', {ns: 'maintenances'})
  }
]

export default function pruebaSimple() {
  const status = [
    { name: 'Planeación'},
    { name: 'Desarrollo'},
    { name: 'Finalizado'},
    { name: 'Cancelado' },
  ]

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
            ]
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
                  form: [
                    {
                      headerName: 'Catalogo del servicio',
                      field: 'serviceCatID',
                      type: 'select',
                      endpoint: `${SERVICES_CAT_ENDPOINT}/services-cat`,
                      isRequired: true,
                      width: 6
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
                      headerName: 'Proveedor',
                      field: 'supplierID',
                      type: 'select',
                      endpoint: `${SUPPLIERS_ENDPOINT}/suppliers`,
                      value: 0,
                      isRequired: true,
                      width: 6
                    },
                    {
                      headerName: 'Estatus',
                      field: 'status',
                      type: 'select',
                      options: status,
                      keyValue: 'name',
                      value: 0,
                      isRequired: true,
                      width: 6
                    },
                    {
                      headerName: 'Costo',
                      field: 'cost',
                      type: 'cash',
                      value: '',
                      isRequired: true,
                      width: 6,
                      flex: true
                    },
                    {
                      headerName: t('services.columns.evidence', {ns: 'maintenances'}),
                      field: 'evidence',
                      owner: 'services',
                      type: 'multimedia',
                      value: [],
                      width: 6,
                    },
                    {
                      headerName: 'Notas',
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
