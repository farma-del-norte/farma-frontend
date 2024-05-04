import { Simple } from "src/components/simple"
import { MAINTENANCES_ENDPOINT } from "src/services/endpoints"

const columns = [
    {
      flex: 0.25,
      minWidth: 200,
      field: 'name',
      headerName: 'Mantenimiento'
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'branchName',
      headerName: 'Sucursal'
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'description',
      headerName: 'descripciòn'
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'date',
      headerName: 'fecha'
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'zoneName',
      headerName: 'Zona'
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'cost',
      headerName: 'Costo'
    },
]

export default function pruebaSimple() {
  return (
    <Simple
      table={
        {
          label: 'Prueba',
          endpoints: {
            baseUrl: `${MAINTENANCES_ENDPOINT}/maintenances`
          },
          loading: true,
          showAddButton: true,
          columns: columns,
          actions: ['edit', 'detail', 'delete']
        }
      }
      modal={
        {
          title: 'modal de prueba',
          size: 'md',
          form: [
            {
              label: 'Zona',
              name: 'name',
              type: 'text',
              value: '',
              isRequired: true,
              width: 12,
            },
            {
                type: 'table',
                table: {
                    label: 'Prueba 2',
                    showAddButton: true,
                    columns: [],
                    rows: [],
                    actions: ['edit', 'delete']
                }
            }
          ],
          actions: {
            back: "Regresar",
            save: "Guardar"
          }
        }
      }
    />
  )
}
