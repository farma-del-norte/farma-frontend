// import {Fragment} from 'react'
// import {useForm} from 'react-hook-form'
// import {useSelector, useDispatch} from 'react-redux'

// import {toggleDeleteModal} from 'src/store/catalogs/materials/reducer'
// import {deleteMaterialCat} from 'src/store/catalogs/materials/actions'
// import DataTable from 'src/pages/resources/materials/DataTable'
// import EditItem from 'src/pages/resources/materials/EditItem'
// import RemoveItem from 'src/views/modals/RemoveItem'

// const Materials = () => {
//   const dispatch = useDispatch(),
//     dialogText = 'Seguro de eliminar el material seleccionado?',
//     methods = useForm(),
//     {isOpen, isDeleteOpen} = useSelector(state => state.materialsCat)

//   return (
//     <Fragment>
//       <DataTable methods={methods} />
//       {isOpen && <EditItem methods={methods} isOpen={isOpen} />}

//       {isDeleteOpen && (
//         <RemoveItem
//           isOpen={isDeleteOpen}
//           deleteGeneric={deleteMaterialCat}
//           dialogText={dialogText}
//           toggleDeleteModal={toggleDeleteModal}
//           getRowFunction={state => state.materialsCat}
//         />
//       )}
//     </Fragment>
//   )
// }

// export default Materials

import {Simple} from 'src/components/simple'
import {MATERIALS_CAT_ENDPOINT} from 'src/services/endpoints'

export default function Materials() {
  const data = [
    {
      headerName: 'Material',
      field: 'name',
      type: 'text',
      value: '',
      isRequired: true,
      width: 6,
      flex: true
    },
    {
      headerName: 'Costo',
      field: 'cost',
      type: 'cash',
      value: '',
      isRequired: true,
      width: 6,
      flex: true
    },
    {
      headerName: 'Categoría',
      field: 'category',
      type: 'select',
      value: 'Prefabricados',
      options: [
        {name: 'Limpieza'},
        {name: 'Prefabricados'},
        {name: 'Primera mano'},
        {name: 'Utensilios y herramientas'}
      ],
      isRequired: true,
      width: 6,
      flex: true
    },
    {
      headerName: 'Obligación',
      field: 'obligation',
      type: 'select',
      value: 'Requisito',
      options: [{name: 'Material mandatorio'}, {name: 'Material opcional'}, {name: 'Obligatorio'}, {name: 'Requisito'}],
      isRequired: true,
      width: 6,
      flex: true
    },
    {
      headerName: 'Observaciones',
      field: 'observations',
      type: 'text',
      value: '',
      isRequired: true,
      width: 6,
      flex: true
    },
    {
      headerName: 'Rendimiento',
      field: 'performance',
      type: 'text',
      value: '',
      isRequired: true,
      width: 6,
      flex: true
    },
    {
      headerName: 'Unidades',
      field: 'units',
      type: 'select',
      value: 'NA',
      options: [
        {name: 'Kilómetro'},
        {name: 'Metro'},
        {name: 'Centímetro'},
        {name: 'Milímetro'},
        {name: 'Pulgada'},
        {name: 'Kilogramo'},
        {name: 'Gramo'},
        {name: 'Miligramo'},
        {name: 'Litro'},
        {name: 'Mililitro'},
        {name: 'Metro cúbico'},
        {name: 'Centímetro cúbico'},
        {name: 'Metro cuadrado'},
        {name: 'Centímetro cuadrado'},
        {name: 'NA'}
      ],
      isRequired: true,
      width: 6,
      flex: true
    }
  ]

  return (
    <Simple
      table={{
        label: 'Materiales',
        endpoints: {
          baseUrl: `${MATERIALS_CAT_ENDPOINT}/materials-cat`
        },
        columns: data,
        showAddButton: true,
        actions: ['edit', 'delete']
      }}
      modal={{
        title: 'Crear Material',
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
