import {Simple} from 'src/components/simple'
import {MAINTENANCES_ENDPOINT, BRANCHES_ENDPOINT} from 'src/services/endpoints'

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
        label: 'Prueba',
        endpoints: {
          baseUrl: `${MAINTENANCES_ENDPOINT}/maintenances`
        },
        loading: true,
        showAddButton: true,
        columns: columns,
        actions: ['edit', 'detail', 'delete']
      }}
      modal={{
        title: 'modal de prueba',
        size: 'md',
        tabs: [
          {
            title: 'Detalles del Mantenimiento',
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
              },
            ],
            actions: {
              back: 'Regresar',
            }
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
