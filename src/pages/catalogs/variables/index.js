import * as React from 'react'
import {useForm, Controller} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {Typography, Grid, FormControl, TextField, Box, Select, MenuItem, InputLabel} from '@mui/material'
import CardTable from 'src/components/cardTable'
import ReusableDialog from 'src/components/modal'

import {Pencil, Delete} from 'mdi-material-ui'

import {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} from 'src/store/catalogs/variables'
import {variables_locale} from 'src/utils/localization'

const columns = [
  {
    flex: 0.25,
    minWidth: 200,
    field: 'name',
    headerName: 'Variable'
  },
  {
    flex: 0.25,
    minWidth: 230,
    field: 'obligation',
    headerName: 'Obligación'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'specifications',
    headerName: 'Especificaciones'
  },
  {
    flex: 0.15,
    minWidth: 230,
    field: 'guidelines',
    headerName: 'Lineamientos'
  },
  {
    flex: 0.15,
    minWidth: 130,
    field: 'maintenance',
    headerName: 'Mantenimiento'
  },
  {
    flex: 0.25,
    minWidth: 230,
    field: 'dimension',
    headerName: 'Nombre de Dimension'
  }
]

const fakeRows = [
  {
    id: 1,
    name: 'dato de prueba',
    dimension: 'dato de prueba',
    obligation: 'dato de prueba',
    specifications: 'dato de prueba',
    guidelines: 'lineamientos de prueba',
    maintenance: 'dato de prueba',
    active: 'Activado'
  }
]

/* TODO 
create new object when is Editing form
*/

const defaultEditingValues = {
  name: 'dato de prueba',
  dimension: 'dato de prueba',
  obligation: 'dato de prueba',
  specifications: 'dato de prueba',
  guidelines: 'lineamientos de prueba',
  maintenance: 'dato de prueba',
  guidelines: 'dato de prueba'
}
const defaultValuesVariables = {
  id: 1,
  name: '',
  dimension: '',
  obligation: '',
  specifications: '',
  guidelines: '',
  maintenance: '',
  active: 'Activado'
}

function Variables() {
  const dispatch = useDispatch()

  const {isOpen, modalItem, isDeleteOpen} = useSelector(state => state.variables)

  const {control, handleSubmit, reset} = useForm({
    defaultValues: defaultValuesVariables
  })

  const resetAllFormFields = () => {
    reset(defaultEditingValues)
  }

  React.useEffect(() => {
    if (isEdit) resetAllFormFields()
  }, [])

  const isEdit = Boolean(modalItem)
  const handleAddItem = () => {
    reset({})
    dispatch(toggleModal(true))
  }

  const handleOpenModal = params => {
    const {row, open} = params
    reset(row)
    dispatch(toggleModal(open))
    dispatch(setModalItem(row))
  }

  const handleCloseModal = () => {
    reset(defaultValuesVariables)
    const cleanModal = null
    dispatch(toggleModal(false))
    dispatch(setModalItem(cleanModal))
  }

  const handleDeleteModal = params => {
    const {row, open} = params
    dispatch(toggleDeleteModal(open))
    dispatch(setDeleteItem(row))
  }

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
            <Pencil sx={{margin: '5px'}} onClick={() => handleOpenModal({row, open: true})} />
            <Delete sx={{margin: '5px'}} onClick={() => handleDeleteModal({row, open: true})} />
          </Typography>
        )
      }
    }
  ]

  const handleCloseDeleteModal = () => {
    const cleanModal = null
    dispatch(toggleDeleteModal(false))
    dispatch(setDeleteItem(cleanModal))
  }

  const handleConfirm = params => {}

  const onSubmit = params => {}

  const editTitle = variables_locale.edit // Returns 'Editar dimension seleccionada'
  const addTitle = variables_locale.add // Returns 'Agregar dimension'
  const deleteTitle = variables_locale.delete // Returns 'Eliminar dimension'

  return (
    <React.Fragment>
      <CardTable
        showAddButton
        columns={actionableColumns}
        rows={fakeRows}
        label='Variables'
        onAddItem={handleAddItem}
      />
      <ReusableDialog
        open={isOpen}
        onClose={handleCloseModal}
        title={isEdit ? editTitle : addTitle}
        actions={[
          {label: 'Regresar', onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
          {label: 'Guardar', onClick: handleCloseModal, color: 'primary', variant: 'contained'}
        ]}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='name'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Nombre' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Dimension</InputLabel>
                <Controller
                  name='dimensionName'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={value}
                      label='Dimension' /* id dimension list of options */
                      onChange={onChange}
                    >
                      <MenuItem value={10}>Prueba</MenuItem>
                      <MenuItem value={20}>Prueba</MenuItem>
                      <MenuItem value={30}>Prueba</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Obligacion</InputLabel>
                <Controller
                  name='obligacion'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      value={value}
                      label='Obligation' /*  */
                      onChange={onChange}
                    >
                      <MenuItem value={10}>Obligatorio</MenuItem>
                      <MenuItem value={20}>Obligatorio en sucursal nueva</MenuItem>
                      <MenuItem value={30}>Opcional</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='specification'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Especificacion' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='guidelines'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Lineamientos' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
              <FormControl fullWidth>
                <Controller
                  name='maintenance'
                  control={control}
                  render={({field: {value, onChange}}) => (
                    <TextField label='Mantenimiento' value={value} onChange={onChange} />
                  )}
                />
              </FormControl>
            </Grid>
          </Grid>
        </form>
      </ReusableDialog>
      <ReusableDialog
        open={isDeleteOpen}
        onClose={handleCloseModal}
        title='Eliminar Variable'
        actions={[
          {label: 'Regresar', onClick: handleCloseDeleteModal, color: 'primary', variant: 'outlined'},
          {label: 'Guardar', onClick: handleCloseDeleteModal, color: 'primary', variant: 'contained'}
        ]}
      >
        <Box>
          <Typography variant='body2'>Seguro de eliminar la variable seleccionada?</Typography>
        </Box>
      </ReusableDialog>
    </React.Fragment>
  )
}

export default Variables
