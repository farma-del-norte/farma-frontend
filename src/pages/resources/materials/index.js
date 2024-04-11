import {Fragment} from 'react'
import {useForm} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {closeSnackBar} from 'src/store/notifications'
import {toggleDeleteModal} from 'src/store/catalogs/materials/reducer'
import {deleteMaterialCat} from 'src/store/catalogs/materials/actions'
import DataTable from 'src/pages/resources/materials/DataTable'
import EditItem from 'src/pages/resources/materials/EditItem'
import RemoveItem from 'src/views/modals/RemoveItem'

const Materials = () => {
  const dispatch = useDispatch(),
    dialogText = 'Seguro de eliminar el material seleccionado?',
    methods = useForm(),
    {isOpen, isDeleteOpen} = useSelector(state => state.materialsCat),
    {open, message, severity} = useSelector(state => state.notifications)

  return (
    <Fragment>
      <DataTable methods={methods} />
      {isOpen && <EditItem methods={methods} isOpen={isOpen} />}

      {isDeleteOpen && (
        <RemoveItem
          isOpen={isDeleteOpen}
          deleteGeneric={deleteMaterialCat}
          dialogText={dialogText}
          toggleDeleteModal={toggleDeleteModal}
          getRowFunction={state => state.materialsCat}
        />
      )}
    </Fragment>
  )
}

export default Materials
