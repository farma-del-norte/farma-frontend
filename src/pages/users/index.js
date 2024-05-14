import {Simple} from 'src/components/simple'
import {USERS_ENDPOINT} from 'src/services/endpoints'

export default function Users() {
  const columns = [
    {
      flex: 0.25,
      minWidth: 200,
      field: 'firstname',
      headerName: 'Nombre(s)'
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'lastname',
      headerName: 'Apellidos'
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'email',
      headerName: 'Correo electrónico'
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'phone',
      headerName: 'Teléfono'
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'zoneID',
      headerName: 'Zona'
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'position',
      headerName: 'Posición'
    }
  ]
  const form = [
    {
      label: 'Nombre(s)',
      name: 'firstname',
      type: 'text',
      value: '',
      isRequired: true,
      width: 12
    },
    {
      label: 'Apellidos',
      name: 'lastname',
      type: 'text',
      value: '',
      isRequired: true,
      width: 12
    },
    {
      label: 'Correo electrónico',
      name: 'email',
      type: 'text',
      value: '',
      isRequired: true,
      width: 12
    },
    {
      label: 'Teléfono',
      name: 'phone',
      type: 'text',
      value: '',
      isRequired: true,
      width: 12
    },
    {
      label: 'Contraseña',
      name: 'password',
      type: 'text',
      value: '',
      isRequired: true,
      width: 12
    },
    {
      label: 'Zona',
      name: 'zoneID',
      type: 'text',
      value: '',
      isRequired: true,
      width: 12
    },

    {
      label: 'Posición',
      name: 'position',
      type: 'text',
      value: '',
      isRequired: true,
      width: 12
    }
  ]

  return (
    <Simple
      table={{
        label: 'Usuarios',
        endpoints: {
          baseUrl: `${USERS_ENDPOINT}/users`
        },
        loading: true,
        showAddButton: true,
        columns: columns,
        actions: ['edit', 'detail', 'delete']
      }}
      modal={{
        title: 'Crear usuario',
        size: 'md',
        form: form,
        actions: {
          back: 'Regresar',
          save: 'Guardar'
        }
      }}
    />
  )
}
