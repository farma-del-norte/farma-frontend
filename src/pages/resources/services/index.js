import {Fragment} from 'react'
import {useForm} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {closeSnackBar} from 'src/store/notifications'
import {toggleDeleteModal} from 'src/store/catalogs/services/reducer'
import {deleteServiceCat} from 'src/store/catalogs/services/actions'
import DataTable from './DataTable'
import EditItem from './EditItem'
import RemoveItem from 'src/views/modals/RemoveItem'

const Services = () => {
  const dispatch = useDispatch(),
    dialogText = 'Seguro de eliminar el servicio seleccionado?',
    methods = useForm(),
    {isOpen, isDeleteOpen} = useSelector(state => state.serviceCat),
    {open, message, severity} = useSelector(state => state.notifications)

  return (
    <Fragment>
      <DataTable methods={methods} />
      {isOpen && <EditItem methods={methods} isOpen={isOpen} />}

      {isDeleteOpen && (
        <RemoveItem
          isOpen={isDeleteOpen}
          deleteGeneric={deleteServiceCat}
          dialogText={dialogText}
          toggleDeleteModal={toggleDeleteModal}
          getRowFunction={state => state.serviceCat}
        />
      )}
    </Fragment>
  )
}

export default Services
