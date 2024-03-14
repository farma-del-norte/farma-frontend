import { Fragment } from 'react'
import {useForm} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'
import {closeSnackBar} from 'src/store/notifications'
import DataTable from './DataTable'
import EditItem from './EditItem'
import RemoveItem from './RemoveItem'
import CustomSnackbar from 'src/components/snackbar/CustomSnackbar'

const Budgets = () => {
  const dispatch = useDispatch(),
  methods = useForm(),
  {isOpen, isDeleteOpen} = useSelector(state => state.budgets),
  {open, message, severity} = useSelector(state => state.notifications);
  
    return (
      <Fragment>
        
        <DataTable/>
        {
          isOpen && <EditItem methods={methods} isOpen={isOpen} />
        }

        {
          isDeleteOpen && <RemoveItem methods={methods} isOpen={isDeleteOpen} />
        }
        
        <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
      </Fragment>
    )
}

export default Budgets