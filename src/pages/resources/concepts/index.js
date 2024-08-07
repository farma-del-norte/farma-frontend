// import {Fragment} from 'react'
// import {useForm} from 'react-hook-form'
// import {useSelector, useDispatch} from 'react-redux'

// import {toggleDeleteModal} from 'src/store/catalogs/concepts/reducer'
// import {deleteConceptCat} from 'src/store/catalogs/concepts/actions'
// import {t} from 'i18next'
// import DataTable from 'src/pages/resources/concepts/DataTable'
// import EditItem from 'src/pages/resources/concepts/EditItem'
// import RemoveItem from 'src/views/modals/RemoveItem'

// const Concepts = () => {
//   const dispatch = useDispatch(),
//     methods = useForm(),
//     {isOpen, isDeleteOpen} = useSelector(state => state.conceptsCat)

//   return (
//     <Fragment>
//       <DataTable methods={methods} />
//       {isOpen && <EditItem methods={methods} isOpen={isOpen} />}

//       {isDeleteOpen && (
//         <RemoveItem
//           isOpen={isDeleteOpen}
//           deleteGeneric={deleteConceptCat}
//           dialogText={t('concepts_cat_delete_confirm_message', {ns: 'catalogs'})}
//           toggleDeleteModal={toggleDeleteModal}
//           getRowFunction={state => state.conceptsCat}
//         />
//       )}
//     </Fragment>
//   )
// }

// export default Concepts

import {Simple} from 'src/components/simple'
import {CONCEPTS_CAT_ENDPOINT, VARIABLES_CAT_ENDPOINT} from 'src/services/endpoints'
import Tooltip from '@mui/material/Tooltip'
export default function Concepts() {
  const data = [
    {
      headerName: 'Nombre',
      field: 'name',
      type: 'text',
      value: '',
      isRequired: true,
      width: 6,
      flex: true
    },

    {
      headerName: 'Observaciones',
      field: 'observations',
      type: 'text',
      value: '',
      width: 6,
      flex: true,
      renderCell: params => {
        return (
          <Tooltip title={params.row.observations}>
            {params.row.observations.length > 25
              ? params.row.observations.substring(0, 25) + '...'
              : params.row.observations}
          </Tooltip>
        )
      }
    },
    {
      headerName: 'Variables',
      field: 'variablesID',
      type: 'select',
      endpoint: `${VARIABLES_CAT_ENDPOINT}/variables-cat`,
      options: [],
      value: '',
      isRequired: true,
      width: 6,
      flex: true,
      renderCell: params => {
        return (
          <Tooltip title={params.row.variableName}>
            {params.row.variableName.length > 22
              ? params.row.variableName.substring(0, 22) + '...'
              : params.row.variableName}
          </Tooltip>
        )
      }
    },
    {
      headerName: 'Definición',
      field: 'definition',
      type: 'textarea',
      value: '',
      width: 6,
      flex: true,
      renderCell: params => {
        return (
          <Tooltip title={params.row.definition}>
            {params.row.definition.length > 25 ? params.row.definition.substring(0, 25) + '...' : params.row.definition}
          </Tooltip>
        )
      }
    }
  ]

  return (
    <Simple
      table={{
        label: 'Conceptos',
        endpoints: {
          baseUrl: `${CONCEPTS_CAT_ENDPOINT}/concepts-cat`
        },
        columns: data,
        showAddButton: true,
        actions: ['edit', 'delete']
      }}
      modal={{
        title: 'Crear Concepto',
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
