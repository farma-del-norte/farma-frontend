import {Simple} from 'src/components/simple'
import {USERS_ENDPOINT, ZONES_ENDPOINT} from 'src/services/endpoints'
import Tooltip from '@mui/material/Tooltip'

export default function Users() {
  const data = [
    {
      headerName: 'Nombre(s)',
      field: 'firstname',
      type: 'text',
      value: '',
      isRequired: true,
      width: 6,
      flex: true
    },
    {
      headerName: 'Apellidos',
      field: 'lastname',
      type: 'text',
      value: '',
      isRequired: true,
      width: 6,
      flex: true
    },
    {
      headerName: 'Correo electrónico',
      field: 'email',
      type: 'email',
      value: '',
      isRequired: true,
      width: 6,
      flex: true
    },
    {
      headerName: 'Teléfono',
      field: 'phone',
      type: 'phone',
      value: '',
      isRequired: true,
      width: 6,
      flex: true
    },
    {
      headerName: 'Contraseña',
      field: 'password',
      type: 'password',
      value: '',
      hideColumn: true,
      isRequired: true,
      width: 6,
      flex: true
    },
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
      headerName: 'Posición',
      field: 'position',
      type: 'select',
      options: [{name: 'Gerente de zona'}, {name: 'Administrador'}],
      value: '',
      isRequired: true,
      width: 6,
      flex: true
    }
  ]

  return (
    <Simple
      table={{
        label: 'Usuarios',
        endpoints: {
          baseUrl: `${USERS_ENDPOINT}/users`
        },
        columns: data,
        showAddButton: true,
        actions: ['edit', 'delete']
      }}
      modal={{
        title: 'Crear usuario',
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
