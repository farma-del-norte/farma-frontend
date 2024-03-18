import { Fragment } from 'react'
import {useForm} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {closeSnackBar} from 'src/store/notifications'
import { toggleDeleteModal } from 'src/store/budgets/reducer'
import { deleteBudget } from 'src/store/budgets/actions'
import DataTable from './DataTable'
import EditItem from './EditItem'
import RemoveItem from '../../@core/layouts/components/shared-components/modals/RemoveItem'
import CustomSnackbar from 'src/components/snackbar/CustomSnackbar'

const Budgets = () => {
  const dispatch = useDispatch(),
  dialogText = "Seguro de eliminar el presupuesto seleccionado?",
  methods = useForm(),
  {isOpen, isDeleteOpen, currentRow} = useSelector(state => state.budgets),
  {open, message, severity} = useSelector(state => state.notifications);
  
    return (
      <Fragment>
        
        <DataTable/>
        {
          isOpen && <EditItem methods={methods} isOpen={isOpen} />
        }

        {
          isDeleteOpen && <RemoveItem isOpen={isDeleteOpen} deleteGeneric={deleteBudget} dialogText={dialogText} toggleDeleteModal={toggleDeleteModal} getRowFunction={state => state.budgets} />
        }
        
        <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
      </Fragment>
    )
}

export default Budgets