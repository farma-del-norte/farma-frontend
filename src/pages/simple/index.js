import {Simple} from 'src/components/simple'
import {MAINTENANCES_ENDPOINT, BRANCHES_ENDPOINT, SERVICES_ENDPOINT} from 'src/services/endpoints'

const columns = [
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
    flex: 0.25,
    field: 'zoneName',
    headerName: 'Zona'
  },
  {
    flex: 0.25,
    field: 'cost',
    headerName: 'Costo'
  }
]

export default function pruebaSimple() {
  return (
    <Simple
      table={{
        label: 'Mantenimientos',
        endpoints: {
          baseUrl: `${MAINTENANCES_ENDPOINT}/maintenances`
        },
        loading: true,
        showAddButton: true,
        columns: columns,
        actions: ['edit', 'detail', 'delete']
      }}
      modal={{
        title: 'Mantenimiento',
        size: 'md',
        tabs: [
          {
            title: 'Mantenimiento',
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
                headerName: 'Mantenimiento',
                field: 'name',
                type: 'table',
                table: {
                  label: 'Prueba',
                  endpoints: {
                    baseUrl: `${SERVICES_ENDPOINT}/services`
                  },
                  showAddButton: true,
                  columns: columns,
                  actions: ['edit', 'delete']
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
            headerName: 'cash',
            field: 'cash',
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
