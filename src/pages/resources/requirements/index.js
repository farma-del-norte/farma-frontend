// import {Fragment, useEffect} from 'react'
// import {useForm, Controller} from 'react-hook-form'
// import {useSelector, useDispatch} from 'react-redux'
// import {Typography, Grid, FormControl, TextField, Box} from '@mui/material'
// import CardTable from 'src/components/cardTable'
// import ReusableDialog from 'src/components/modal'
// import {Pencil, Delete} from 'mdi-material-ui'
// import {toggleModal, setModalItem, setDeleteItem, toggleDeleteModal} from 'src/store/catalogs/requirements/reducer'
// import {
//   createRequirementCat,
//   deleteRequirementCat,
//   editRequirementCat,
//   getRequirementsCat
// } from 'src/store/catalogs/requirements/actions'
// import {t} from 'i18next'
// import FallbackSpinner from 'src/@core/components/spinner'

// const columns = [
//   {
//     flex: 0.25,
//     minWidth: 200,
//     field: 'name',
//     headerName: 'Requerimiento'
//   }
// ]

// function RequirementsCat() {
//   const dispatch = useDispatch()
//   const {isOpen, modalItem, isDeleteOpen, isLoading, requirementsCat, modalDeleteItem} = useSelector(
//     state => state.requirementsCat
//   )

//   const {control, handleSubmit, reset} = useForm({
//     defaultValues: {}
//   })

//   useEffect(() => {
//     dispatch(getRequirementsCat())
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
//     dispatch(setModalItem(null))
//   }

//   const handleDeleteModal = params => {
//     const {row, open} = params
//     dispatch(toggleDeleteModal(open))
//     dispatch(setDeleteItem(row))
//   }

//   const handleDeleteConfirm = () => {
//     dispatch(deleteRequirementCat(modalDeleteItem))
//     handleCloseDeleteModal()
//   }

//   const onSubmit = values => {
//     if (Boolean(modalItem)) {
//       dispatch(editRequirementCat(values))
//     } else {
//       dispatch(createRequirementCat(values))
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
//           rows={requirementsCat}
//           label='Requerimientos'
//           onAddItem={handleAddItem}
//         />
//       )}
//       <ReusableDialog
//         open={isOpen}
//         onClose={handleCloseModal}
//         title={
//           Boolean(modalItem)
//             ? t('requirements_cat_edit_modal', {ns: 'catalogs'})
//             : t('requirements_cat_add_modal', {ns: 'catalogs'})
//         }
//         actions={[
//           {label: t('back_button'), onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
//           {label: t('save_button'), onClick: handleSubmit(onSubmit), color: 'primary', variant: 'contained'}
//         ]}
//       >
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <Grid container spacing={5}>
//             <Grid item xs={12} sx={{marginTop: '6px'}}>
//               <FormControl fullWidth>
//                 <Controller
//                   name='name'
//                   control={control}
//                   render={({field: {value, onChange}}) => (
//                     <TextField label='Requerimiento' value={value} onChange={onChange} />
//                   )}
//                 />
//               </FormControl>
//             </Grid>
//           </Grid>
//         </form>
//       </ReusableDialog>
//       <ReusableDialog
//         open={isDeleteOpen}
//         onClose={handleCloseDeleteModal}
//         title={t('requirements_cat_delete_modal', {ns: 'catalogs'})}
//         actions={[
//           {label: 'Regresar', onClick: handleCloseDeleteModal, color: 'primary', variant: 'outlined'},
//           {label: 'Eliminar', onClick: handleDeleteConfirm, color: 'primary', variant: 'contained'}
//         ]}
//       >
//         <Box>
//           <Typography variant='body2'>{t('requirements_cat_delete_confirm_message', {ns: 'catalogs'})}</Typography>
//         </Box>
//       </ReusableDialog>
//     </Fragment>
//   )
// }

// export default RequirementsCat

import {Simple} from 'src/components/simple'
import {REQUIREMENTS_CAT_ENDPOINT} from 'src/services/endpoints'

export default function RequirimentsCat() {
  const data = [
    {
      headerName: 'Requerimiento',
      field: 'name',
      type: 'text',
      value: '',
      isRequired: true,
      width: 12,
      flex: true
    }
  ]

  return (
    <Simple
      table={{
        label: 'Requerimientos',
        endpoints: {
          baseUrl: `${REQUIREMENTS_CAT_ENDPOINT}/requirements-cat`
        },
        columns: data,
        showAddButton: true,
        actions: ['edit', 'delete']
      }}
      modal={{
        title: 'Crear Requerimiento',
        form: data,
        size: 'sm',
        actions: {
          back: 'Regresar',
          save: 'Guardar'
        }
      }}
    />
  )
}
