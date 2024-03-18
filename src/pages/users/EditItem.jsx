import { createUser, editUser } from 'src/store/users/actions'
import { toggleModal, setRow } from 'src/store/users/reducer'
import {useSelector, useDispatch} from 'react-redux'
import { FormProvider, useForm } from 'react-hook-form'
import ReusableDialog from 'src/components/modal'
import FirstName from './Fields/FirstName'
import LastName from './Fields/LastName'
import Email from './Fields/Email'
import PhoneNumber from './Fields/PhoneNumber'
import Position from './Fields/Position'
import BranchID from './Fields/BranchID'
import Password from './Fields/Password'
import Zone from './Fields/Zone'

const EditItem = ({ methods, isOpen }) => {
  const dispatch = useDispatch(),
  { currentRow } = useSelector(state => state.users),
  handleCloseModal = () => {
    dispatch(toggleModal(false))
    dispatch(setRow([]))
    methods.reset()
    methods.clearErrors()
  },
  onSubmit = (body) => {
    if(currentRow && currentRow.length >= 0) {
      dispatch(createUser(body))
      dispatch(toggleModal(false))
    } else {
      body.id = currentRow.id
      dispatch(editUser(body))
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
              <FirstName {...currentRow} />
              <LastName {...currentRow} />
              <Email {...currentRow} />
              <PhoneNumber {...currentRow} />
              {
                currentRow.length === 0 && <Password isOpen={currentRow.length === 0}/>
              }
              <Position {...currentRow} />
              <Zone {...currentRow} />
              <BranchID {...currentRow} />
            </form>
          </FormProvider>
    </ReusableDialog>
  )
}

export default EditItem;