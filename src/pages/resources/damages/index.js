import {Fragment} from 'react'
import {useForm} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'

import {toggleDeleteModal} from 'src/store/catalogs/damages/reducer'
import {deleteDamageCat} from 'src/store/catalogs/damages/actions'
import DataTable from 'src/pages/resources/damages/DataTable'
import EditItem from 'src/pages/resources/damages/EditItem'
import RemoveItem from 'src/views/modals/RemoveItem'

const Damages = () => {
  const dispatch = useDispatch(),
    dialogText = 'Seguro de eliminar el siniestro seleccionado?',
    methods = useForm(),
    {isOpen, isDeleteOpen} = useSelector(state => state.damagesCat)

  return (
    <Fragment>
      <DataTable methods={methods} />
      {isOpen && <EditItem methods={methods} isOpen={isOpen} />}

      {isDeleteOpen && (
        <RemoveItem
          isOpen={isDeleteOpen}
          deleteGeneric={deleteDamageCat}
          dialogText={dialogText}
          toggleDeleteModal={toggleDeleteModal}
          getRowFunction={state => state.damagesCat}
        />
      )}
    </Fragment>
  )
}

export default Damages
