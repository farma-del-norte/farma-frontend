import {Simple} from 'src/components/simple'
import {BUDGETS_ENDPOINT, ZONES_ENDPOINT} from 'src/services/endpoints'
import Tooltip from '@mui/material/Tooltip'

export default function Users() {
  const data = [
    {
      headerName: 'Zona',
      field: 'zoneID',
      type: 'multipleSelect',
      endpoint: `${ZONES_ENDPOINT}/zones`,
      options: [],
      value: '',
      isRequired: true,
      width: 6,
      flex: true,
      renderCell: params => {
        if (params.row.zones && params.row.zones.length > 0) {
          const zoneNames = params.row.zones.map(zone => zone.zoneName)
          const fullResponse = zoneNames.join(', ')
          return (
            <Tooltip title={fullResponse}>
              {fullResponse.length > 15 ? fullResponse.substring(0, 15) + '...' : fullResponse}
            </Tooltip>
          )
        } else {
          return ''
        }
      }
    },
    {
      headerName: 'Fecha de asignación',
      field: 'assignmentDate',
      type: 'date',
      value: '',
      isRequired: true,
      width: 6,
      flex: true
    },
    {
      headerName: 'Presupuesto',
      field: 'budget',
      type: 'cash',
      value: '',
      isRequired: true,
      width: 6,
      flex: true
    },
    {
      headerName: 'Monto actual',
      field: 'currentAmount',
      type: 'cash',
      value: '',
      isRequired: true,
      width: 6,
      flex: true
    }
  ]

  return (
    <Simple
      table={{
        label: 'Presupuestos',
        endpoints: {
          baseUrl: `${BUDGETS_ENDPOINT}/budgets`
        },
        columns: data,
        showAddButton: true,
        actions: ['edit', 'delete']
      }}
      modal={{
        title: 'Crear presupuesto',
        form: data,
        size: 'md',
        actions: {
          back: 'Regresar',
          save: 'Guardar'
        }
      }}
    />
  )
}
