import * as React from 'react'
import {useForm, Controller} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {Typography, Grid, FormControl, TextField, Box} from '@mui/material'
import CardTable from 'src/pages/components/cardTable'
import ReusableDialog from 'src/pages/components/modal'

import {getTitle} from 'src/utils/functions'
import {Pencil, Delete} from 'mdi-material-ui'

const columns = [
  {
    flex: 0.1,
    field: 'id',
    minWidth: 80,
    headerName: 'ID'
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'name',
    headerName: 'Nombre'
  },
  {
    flex: 0.25,
    minWidth: 230,
    field: 'variable',
    headerName: 'Variable'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'active',
    headerName: 'Activo'
  }
]

const fakeRows = [
  {
    id: 1,
    name: 'dato de prueba',
    variable: 'dato de prueba',
    active: 'Activado'
  },
  {
    id: 2,
    name: 'dato de prueba 2',
    variable: 'dato de prueba 2',
    active: 'Activado'
  },
  {
    id: 3,
    name: 'dato de prueba 3',
    variable: 'dato de prueba 3',
    active: 'Activado'
  },
  {
    id: 4,
    name: 'dato de prueba 3',
    variable: 'dato de prueba 3',
    active: 'Activado'
  }
]

const defaultValuesVariables = {
  id: '',
  name: '',
  variable: '',
  active: ''
}

function Variables() {
  const handleAddItem = params => {}

  const actionableColumns = [
    ...columns,
    {
      flex: 0.125,
      minWidth: 100,
      field: 'actions',
      headerName: 'Acciones',
      renderCell: params => {
        const row = params?.row
        return (
          <Typography variant='body2' sx={{color: '#6495ED', cursor: 'pointer'}}>
            <Pencil sx={{margin: '5px'}} />
            <Delete sx={{margin: '5px'}} />
          </Typography>
        )
      }
    }
  ]

  return (
    <React.Fragment>
      <CardTable
        showAddButton
        columns={actionableColumns}
        rows={fakeRows}
        label='Variables'
        onAddItem={handleAddItem}
      ></CardTable>
    </React.Fragment>
  )
}

export default Variables