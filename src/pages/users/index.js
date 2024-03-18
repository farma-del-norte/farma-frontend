import { Fragment } from 'react'
import {useForm} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {closeSnackBar} from 'src/store/notifications'
import { toggleModal, setRow, toggleDeleteModal } from 'src/store/users/reducer'
import { deleteUser } from 'src/store/users/actions'
import DataTable from './DataTable'
import EditItem from './EditItem'
import RemoveItem from '../../@core/layouts/components/shared-components/modals/RemoveItem'
import CustomSnackbar from 'src/components/snackbar/CustomSnackbar'

const Users = () => {
  const dispatch = useDispatch(),
  dialogText = "Seguro que desea Eliminar usuario?",
  methods = useForm(),
  {isOpen, isDeleteOpen} = useSelector(state => state.users),
  {open, message, severity} = useSelector(state => state.notifications);
  
    return (
      <Fragment>
        <DataTable/>
        {
          isOpen && <EditItem methods={methods} isOpen={isOpen}/>
        }

        {
          isDeleteOpen && <RemoveItem isOpen={isDeleteOpen} deleteGeneric={deleteUser} dialogText={dialogText} toggleDeleteModal={toggleDeleteModal} getRowFunction={state => state.users}/>
        }
        
        <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
      </Fragment>
    )
}

export default Users