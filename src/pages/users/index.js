import {Simple} from 'src/components/simple'
import {USERS_ENDPOINT, ZONES_ENDPOINT} from 'src/services/endpoints'
import {useSelector} from 'react-redux'
import { setValue } from 'src/store/form/reducer'
import Tooltip from '@mui/material/Tooltip'
import { useEffect, useState } from 'react'

export default function Users() {
  const {form, lists} = useSelector(state => state.form)

  const [data, setData] = useState([
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
      headerName: 'Posición',
      field: 'position',
      type: 'select',
      options: [{name: 'Gerente de zona'}, {name: 'Administrador'}],
      value: '',
      isRequired: true,
      width: 6,
      flex: true
    },
    {
      headerName: 'Zona',
      field: 'zoneIDs',
      type: 'multipleSelect',
      endpoint: `${ZONES_ENDPOINT}/zones`,
      options: [],
      value: '',
      isRequired: true,
      width: 12,
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
  ])
  
  // pos admin set all zones
  useEffect(() => {
    if(form?.Crearusuario?.position === 'Administrador') {
      setValue({
        form,
        watch: {
          Crearusuario: 'position'
        },
        fields: data,
        setFields: setData,
        inputFields: [{zoneIDs: 'value'}, {zoneIDs: 'disabled'}],
        values: [lists?.Zona?.map(option => option.id), true]
      })
    } else if (data[5].disabled) {
      // reset values for new user
      setValue({
        form,
        watch: {
          Crearusuario: 'position'
        },
        fields: data,
        setFields: setData,
        inputFields: [{zoneIDs: 'value'}, {zoneIDs: 'disabled'}],
        values: ['', false]
      })
    }
  }, [form.Crearusuario?.position, lists])

  // set psw optional at edit
  useEffect(() => {
    // is editing make psw optional
    if (form?.Crearusuario?.id && data[4].isRequired) {
      setValue({
        form,
        watch: {
          Crearusuario: 'password'
        },
        fields: data,
        setFields: setData,
        inputFields: {password: 'isRequired'},
        values: false
      })
    } else if (!data[4].isRequired && !form?.Crearusuario?.id) {
      setValue({
        form,
        watch: {
          Crearusuario: 'password'
        },
        fields: data,
        setFields: setData,
        inputFields: {password: 'isRequired'},
        values: true
      })
    }
  }, [form.Crearusuario])

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
