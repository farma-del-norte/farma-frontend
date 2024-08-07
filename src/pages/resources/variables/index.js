// import {Fragment, useEffect} from 'react'
// import {useForm, Controller} from 'react-hook-form'
// import {useSelector, useDispatch} from 'react-redux'
// import {Typography, Grid, FormControl, TextField, Box, Select, MenuItem, InputLabel} from '@mui/material'
// import CardTable from 'src/components/cardTable'
// import ReusableDialog from 'src/components/modal'
// import {Pencil, Delete} from 'mdi-material-ui'
// import {toggleModal, setModalItem, toggleDeleteModal, setDeleteItem} from 'src/store/catalogs/variables/reducer'
// import {CATALOGS, COMMON} from 'src/utils/constants'
// import {
//   createVariableCat,
//   deleteVariableCat,
//   editVariableCat,
//   getVariablesCat
// } from 'src/store/catalogs/variables/actions'

// import FallbackSpinner from 'src/@core/components/spinner'
// import i18n from 'src/configs/i18n'
// import {t} from 'i18next'

// const columns = [
//   {
//     flex: COMMON.COLUMN_FLEX,
//     minWidth: COMMON.COLUMN_MIN_WIDTH,
//     field: CATALOGS.VARIABLES_FIELD_NAME,
//     headerName: t('variables_cat_field_name', {ns: 'catalogs'})
//   },
//   {
//     flex: COMMON.COLUMN_FLEX,
//     minWidth: COMMON.COLUMN_MIN_WIDTH,
//     field: CATALOGS.VARIABLES_FIELD_OBLIGATION,
//     headerName: t('variables_cat_field_obligation', {ns: 'catalogs'})
//   },
//   {
//     flex: COMMON.COLUMN_FLEX_SMALL,
//     minWidth: COMMON.COLUMN_MIN_WIDTH_SMALL,
//     field: CATALOGS.VARIABLES_FIELD_SPECIFICATIONS,
//     headerName: t('variables_cat_field_specifications', {ns: 'catalogs'})
//   },
//   {
//     flex: COMMON.COLUMN_FLEX_SMALL,
//     minWidth: COMMON.COLUMN_MIN_WIDTH,
//     field: CATALOGS.VARIABLES_FIELD_GUIDELINES,
//     headerName: t('variables_cat_field_guidelines', {ns: 'catalogs'})
//   },
//   {
//     flex: COMMON.COLUMN_FLEX_SMALL,
//     minWidth: COMMON.COLUMN_MIN_WIDTH_SMALL,
//     field: CATALOGS.VARIABLES_FIELD_SERVICE,
//     headerName: t('variables_cat_field_service', {ns: 'catalogs'})
//   },
//   {
//     flex: COMMON.COLUMN_FLEX,
//     minWidth: COMMON.COLUMN_MIN_WIDTH,
//     field: CATALOGS.VARIABLES_FIELD_DIMENSIONS_NAME,
//     headerName: t('variables_cat_field_dimensions_name', {ns: 'catalogs'})
//   }
// ]

// const defaultValuesVariablesCat = {
//   id: 1,
//   name: '',
//   dimensionID: 10,
//   obligation: '',
//   specifications: '',
//   guidelines: '',
//   service: ''
// }

// function VariablesCat() {
//   const dispatch = useDispatch()
//   const {variablesCat, isOpen, modalItem, isDeleteOpen, isLoading, modalDeleteItem} = useSelector(
//     state => state.variablesCat
//   )

//   const {control, handleSubmit, reset} = useForm({
//     defaultValues: defaultValuesVariablesCat
//   })

//   useEffect(() => {
//     dispatch(getVariablesCat())
//   }, [dispatch])

//   const handleCloseModal = () => {
//     reset()
//     const cleanModal = null
//     dispatch(toggleModal(false))
//     dispatch(setModalItem(cleanModal))
//   }

//   const handleCloseDeleteModal = () => {
//     const cleanModal = null
//     dispatch(toggleDeleteModal(false))
//     dispatch(setDeleteItem(cleanModal))
//   }

//   const handleOpenModal = params => {
//     const {row, open} = params
//     reset(row)
//     dispatch(toggleModal(open))
//     dispatch(setModalItem(row))
//   }

//   const handleAddItem = () => {
//     reset({})
//     dispatch(toggleModal(true))
//   }

//   const handleDeleteModal = params => {
//     const {row, open} = params
//     dispatch(toggleDeleteModal(open))
//     dispatch(setDeleteItem(row))
//   }

//   const handleDeleteConfirm = () => {
//     dispatch(deleteVariableCat(modalDeleteItem))
//     handleCloseDeleteModal()
//   }

//   const onSubmit = values => {
//     if (Boolean(modalItem)) {
//       dispatch(editVariableCat(values))
//     } else {
//       dispatch(createVariableCat(values))
//     }
//     handleCloseModal()
//   }

//   const actionableColumns = [
//     ...columns,
//     {
//       flex: 0.125,
//       minWidth: 100,
//       field: 'actions',
//       headerName: 'Acciones',
//       renderCell: params => {
//         const row = params?.row
//         return (
//           <Typography variant='body2' sx={{color: '#6495ED', cursor: 'pointer'}}>
//             <Pencil sx={{margin: '5px'}} onClick={() => handleOpenModal({row, open: true})} />
//             <Delete sx={{margin: '5px'}} onClick={() => handleDeleteModal({row, open: true})} />
//           </Typography>
//         )
//       }
//     }
//   ]

//   return (
//     <Fragment>
//       {isLoading ? (
//         <FallbackSpinner />
//       ) : (
//         <CardTable
//           showAddButton
//           columns={actionableColumns}
//           rows={variablesCat}
//           label='Variables'
//           onAddItem={handleAddItem}
//         />
//       )}
//       <ReusableDialog
//         open={isOpen}
//         onClose={handleCloseModal}
//         title={
//           Boolean(modalItem)
//             ? t('variables_cat_edit_modal', {ns: 'catalogs'})
//             : t('variables_cat_add_modal', {ns: 'catalogs'})
//         }
//         actions={[
//           {
//             label: i18n.t('back_button'),
//             onClick: handleCloseModal,
//             color: COMMON.BUTTON_PRIMARY_COLOR,
//             variant: COMMON.BACK_BUTTON_VARIANT
//           },
//           {
//             label: i18n.t('save_button'),
//             onClick: handleSubmit(onSubmit),
//             color: COMMON.BUTTON_PRIMARY_COLOR,
//             variant: COMMON.SAVE_BUTTON_VARIANT
//           }
//         ]}
//       >
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Grid container spacing={5}>
//             <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
//               <FormControl fullWidth>
//                 <Controller
//                   name={CATALOGS.VARIABLES_FIELD_NAME}
//                   control={control}
//                   render={({field: {value, onChange}}) => (
//                     <TextField
//                       label={t('variables_cat_field_name', {ns: 'catalogs'})}
//                       value={value}
//                       onChange={onChange}
//                     />
//                   )}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
//               <FormControl fullWidth>
//                 <InputLabel id='demo-simple-select-label'>Dimension</InputLabel>
//                 <Controller
//                   name={CATALOGS.VARIABLES_FIELD_DIMENSION_ID}
//                   control={control}
//                   render={({field: {value, onChange}}) => (
//                     <Select
//                       labelId='demo-simple-select-label'
//                       id='demo-simple-select'
//                       value={value}
//                       label={t('variables_cat_field_dimensions_name', {ns: 'catalogs'})}
//                       onChange={onChange}
//                     >
//                       <MenuItem value={10}>Prueba</MenuItem>
//                       <MenuItem value={20}>Prueba</MenuItem>
//                       <MenuItem value={30}>Prueba</MenuItem>
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
//               <FormControl fullWidth>
//                 <InputLabel id='demo-simple-select-label'>
//                   {t('variables_cat_field_obligation', {ns: 'catalogs'})}
//                 </InputLabel>
//                 <Controller
//                   name={CATALOGS.VARIABLES_FIELD_OBLIGATION}
//                   control={control}
//                   render={({field: {value, onChange}}) => (
//                     <Select
//                       labelId='demo-simple-select-label'
//                       id='demo-simple-select'
//                       value={value}
//                       label={t('variables_cat_field_obligation', {ns: 'catalogs'})}
//                       onChange={onChange}
//                     >
//                       <MenuItem value={10}>Obligatorio</MenuItem>
//                       <MenuItem value={20}>Obligatorio en sucursal nueva</MenuItem>
//                       <MenuItem value={30}>Opcional</MenuItem>
//                     </Select>
//                   )}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
//               <FormControl fullWidth>
//                 <Controller
//                   name={CATALOGS.VARIABLES_FIELD_SPECIFICATIONS}
//                   control={control}
//                   render={({field: {value, onChange}}) => (
//                     <TextField
//                       label={t('variables_cat_field_specifications', {ns: 'catalogs'})}
//                       value={value}
//                       onChange={onChange}
//                     />
//                   )}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
//               <FormControl fullWidth>
//                 <Controller
//                   name={CATALOGS.VARIABLES_FIELD_GUIDELINES}
//                   control={control}
//                   render={({field: {value, onChange}}) => (
//                     <TextField
//                       label={t('variables_cat_field_guidelines', {ns: 'catalogs'})}
//                       value={value}
//                       onChange={onChange}
//                     />
//                   )}
//                 />
//               </FormControl>
//             </Grid>
//             <Grid item xs={12} md={6} sx={{marginTop: '6px'}}>
//               <FormControl fullWidth>
//                 <Controller
//                   name={CATALOGS.VARIABLES_FIELD_SERVICE}
//                   control={control}
//                   render={({field: {value, onChange}}) => (
//                     <TextField
//                       label={t('variables_cat_field_service', {ns: 'catalogs'})}
//                       value={value}
//                       onChange={onChange}
//                     />
//                   )}
//                 />
//               </FormControl>
//             </Grid>
//           </Grid>
//         </form>
//       </ReusableDialog>
//       <ReusableDialog
//         open={isDeleteOpen}
//         onClose={handleCloseModal}
//         title={t('variables_cat_delete_modal', {ns: 'catalogs'})}
//         actions={[
//           {
//             label: i18n.t('back_button'),
//             onClick: handleCloseDeleteModal,
//             color: COMMON.BUTTON_PRIMARY_COLOR,
//             variant: COMMON.BACK_BUTTON_VARIANT
//           },
//           {
//             label: i18n.t('delete_button'),
//             onClick: handleDeleteConfirm,
//             color: COMMON.BUTTON_PRIMARY_COLOR,
//             variant: COMMON.DELETE_BUTTON_VARIANT
//           }
//         ]}
//       >
//         <Box>
//           <Typography variant='body2'>{t('variables_cat_delete_confirm_message', {ns: 'catalogs'})}</Typography>
//         </Box>
//       </ReusableDialog>
//     </Fragment>
//   )
// }

// export default VariablesCat

import {Simple} from 'src/components/simple'
import {DIMENSIONS_CAT_ENDPOINT, VARIABLES_CAT_ENDPOINT} from 'src/services/endpoints'
import Tooltip from '@mui/material/Tooltip'
export default function VariablesCat() {
  const data = [
    {
      headerName: 'Variable',
      field: 'name',
      type: 'text',
      value: '',
      isRequired: true,
      width: 6,
      flex: true
    },
    {
      headerName: 'Obligación',
      field: 'obligation',
      type: 'select',
      value: 'Opcional',
      isRequired: true,
      width: 6,
      flex: true,
      options: [{name: 'Obligatorio'}, {name: 'Obligatorio en sucursal nueva'}, {name: 'Opcional'}]
    },
    {
      headerName: 'Especificaciones',
      field: 'specifications',
      type: 'text',
      value: '',
      width: 6,
      flex: true
    },
    {
      headerName: 'Lineamientos',
      field: 'guidelines',
      type: 'text',
      value: '',
      width: 6,
      flex: true
    },
    {
      headerName: 'Mantenimientos',
      field: 'maintenance',
      type: 'text',
      value: '',
      width: 6,
      flex: true
    },

    {
      headerName: 'Dimensiones',
      field: 'dimensionsID',
      type: 'select',
      value: '',
      endpoint: `${DIMENSIONS_CAT_ENDPOINT}/dimensions-cat`,
      options: [],
      isRequired: true,
      width: 6,
      flex: true,
      renderCell: params => {
        return (
          <Tooltip title={params.row.dimensionName}>
            {params.row.dimensionName.length > 22
              ? params.row.dimensionName.substring(0, 22) + '...'
              : params.row.dimensionName}
          </Tooltip>
        )
      }
    }
  ]

  return (
    <Simple
      table={{
        label: 'Variables',
        endpoints: {
          baseUrl: `${VARIABLES_CAT_ENDPOINT}/variables-cat`
        },
        columns: data,
        showAddButton: true,
        actions: ['edit', 'delete']
      }}
      modal={{
        title: 'Crear Variable',
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
