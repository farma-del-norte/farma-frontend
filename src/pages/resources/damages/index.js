// import {Fragment} from 'react'
// import {useForm} from 'react-hook-form'
// import {useSelector, useDispatch} from 'react-redux'

// import {toggleDeleteModal} from 'src/store/catalogs/damages/reducer'
// import {deleteDamageCat} from 'src/store/catalogs/damages/actions'
// import DataTable from 'src/pages/resources/damages/DataTable'
// import EditItem from 'src/pages/resources/damages/EditItem'
// import RemoveItem from 'src/views/modals/RemoveItem'

// const Damages = () => {
//   const dispatch = useDispatch(),
//     dialogText = 'Seguro de eliminar el siniestro seleccionado?',
//     methods = useForm(),
//     {isOpen, isDeleteOpen} = useSelector(state => state.damagesCat)

//   return (
//     <Fragment>
//       <DataTable methods={methods} />
//       {isOpen && <EditItem methods={methods} isOpen={isOpen} />}

//       {isDeleteOpen && (
//         <RemoveItem
//           isOpen={isDeleteOpen}
//           deleteGeneric={deleteDamageCat}
//           dialogText={dialogText}
//           toggleDeleteModal={toggleDeleteModal}
//           getRowFunction={state => state.damagesCat}
//         />
//       )}
//     </Fragment>
//   )
// }

// export default Damages

import {Simple} from 'src/components/simple'
import {DAMAGES_CAT_ENDPOINT} from 'src/services/endpoints'
export default function DamagesCat() {
  const data = [
    {
      headerName: 'Siniestro',
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
        label: 'Siniestros',
        endpoints: {
          baseUrl: `${DAMAGES_CAT_ENDPOINT}/damages-cat`
        },
        columns: data,
        showAddButton: true,
        actions: ['edit', 'delete']
      }}
      modal={{
        title: 'Crear Siniestro',
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
