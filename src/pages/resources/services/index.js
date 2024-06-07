// import {Fragment} from 'react'
// import {useForm} from 'react-hook-form'
// import {useSelector, useDispatch} from 'react-redux'

// import {toggleDeleteModal} from 'src/store/catalogs/services/reducer'
// import {deleteServiceCat} from 'src/store/catalogs/services/actions'
// import DataTable from './DataTable'
// import EditItem from './EditItem'
// import RemoveItem from 'src/views/modals/RemoveItem'

// const Services = () => {
//   const dispatch = useDispatch(),
//     dialogText = 'Seguro de eliminar el servicio seleccionado?',
//     methods = useForm(),
//     {isOpen, isDeleteOpen} = useSelector(state => state.serviceCat)

//   return (
//     <Fragment>
//       <DataTable methods={methods} />
//       {isOpen && <EditItem methods={methods} isOpen={isOpen} />}

//       {isDeleteOpen && (
//         <RemoveItem
//           isOpen={isDeleteOpen}
//           deleteGeneric={deleteServiceCat}
//           dialogText={dialogText}
//           toggleDeleteModal={toggleDeleteModal}
//           getRowFunction={state => state.serviceCat}
//         />
//       )}
//     </Fragment>
//   )
// }

// export default Services

import {Simple} from 'src/components/simple'
import {SERVICES_CAT_ENDPOINT} from 'src/services/endpoints'

export default function Services() {
  const data = [
    {
      headerName: 'Servicio',
      field: 'name',
      type: 'text',
      value: '',
      isRequired: true,
      width: 12,
      flex: true
    },
    {
      headerName: 'Categoria',
      field: 'category',
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
        label: 'Servicios',
        endpoints: {
          baseUrl: `${SERVICES_CAT_ENDPOINT}/services-cat`
        },
        columns: data,
        showAddButton: true,
        actions: ['edit', 'delete']
      }}
      modal={{
        title: 'Crear Servicio',
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
