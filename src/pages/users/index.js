import {Fragment} from 'react'
import {useForm} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'

import {toggleDeleteModal} from 'src/store/users/reducer'
import {deleteUser} from 'src/store/users/actions'
import DataTable from './DataTable'
import EditItem from './EditItem'
import RemoveItem from 'src/views/modals/RemoveItem'

const Users = () => {
  const dispatch = useDispatch(),
    dialogText = 'Seguro que desea Eliminar usuario?',
    methods = useForm(),
    {isOpen, isDeleteOpen} = useSelector(state => state.users),
    {open, message, severity} = useSelector(state => state.notifications)

  return (
    <Fragment>
      <DataTable />
      {isOpen && <EditItem methods={methods} isOpen={isOpen} />}

      {isDeleteOpen && (
        <RemoveItem
          isOpen={isDeleteOpen}
          deleteGeneric={deleteUser}
          dialogText={dialogText}
          toggleDeleteModal={toggleDeleteModal}
          getRowFunction={state => state.users}
        />
      )}
    </Fragment>
  )
}

export default Users
