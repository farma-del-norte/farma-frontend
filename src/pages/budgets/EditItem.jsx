import { createBudget, editBudget } from 'src/store/budgets/actions'
import { toggleModal, setRow } from 'src/store/budgets/reducer'
import {useSelector, useDispatch} from 'react-redux'
import { FormProvider } from 'react-hook-form'
import ReusableDialog from 'src/components/modal'
import AssignedBudget from './Fields/AssignedBudget'
import Date from './Fields/Date'
import CurrentAmount from './Fields/CurrentAmount'
import Zone from './Fields/Zone'

const EditItem = ({ methods, isOpen }) => {
  const dispatch = useDispatch(),
  { currentRow } = useSelector(state => state.budgets),
  handleCloseModal = () => {
    dispatch(toggleModal(false))
    dispatch(setRow([]))
  },
  onSubmit = (body) => {
    if(currentRow && currentRow.length >= 0) {
      dispatch(createBudget(body))
      dispatch(toggleModal(false))
    } else {
      body.id = currentRow.id
      dispatch(editBudget(body))
      dispatch(toggleModal(false))
    }
  }

  return (
    <ReusableDialog
          open={isOpen}
          onClose={handleCloseModal}
          actions={[
            {label: 'Regresar', onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
            {label: currentRow.length >= 0 ? 'Agregar' : 'Actualizar' , onClick: methods.handleSubmit(onSubmit), color: 'primary', variant: 'contained', type:'submit'}
          ]}
        >
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
              <AssignedBudget {...currentRow} />
              <CurrentAmount {...currentRow}/>
              <Date {...currentRow} />
              <Zone {...currentRow} />
            </form>
          </FormProvider>
    </ReusableDialog>
  )
}

export default EditItem;