import {Fragment} from 'react'
import {useForm} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'

import {toggleDeleteModal} from 'src/store/budgets/reducer'
import {deleteBudget} from 'src/store/budgets/actions'
import DataTable from 'src/pages/budgets/DataTable'
import EditItem from 'src/pages/budgets/EditItem'
import RemoveItem from 'src/views/modals/RemoveItem'

const Budgets = () => {
  const dispatch = useDispatch(),
    dialogText = 'Seguro de eliminar el presupuesto seleccionado?',
    methods = useForm(),
    {isOpen, isDeleteOpen, currentRow} = useSelector(state => state.budgets),
    {open, message, severity} = useSelector(state => state.notifications)

  return (
    <Fragment>
      <DataTable />
      {isOpen && <EditItem methods={methods} isOpen={isOpen} />}

      {isDeleteOpen && (
        <RemoveItem
          isOpen={isDeleteOpen}
          deleteGeneric={deleteBudget}
          dialogText={dialogText}
          toggleDeleteModal={toggleDeleteModal}
          getRowFunction={state => state.budgets}
        />
      )}
    </Fragment>
  )
}

export default Budgets
