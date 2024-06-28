import {createUser, editUser} from 'src/store/login/actions'
import {toggleModal, setRow} from 'src/store/login/reducer'
import {useSelector, useDispatch} from 'react-redux'
import {FormProvider} from 'react-hook-form'
import {Grid} from '@mui/material'
import ReusableDialog from 'src/components/modal'
import FirstName from 'src/pages/users/Fields/FirstName'
import LastName from 'src/pages/users/Fields/LastName'
import Email from 'src/pages/users/Fields/Email'
import PhoneNumber from 'src/pages/users/Fields/PhoneNumber'
import Position from 'src/pages/users/Fields/Position'
import BranchID from 'src/pages/users/Fields/BranchID'
import Password from 'src/pages/users/Fields/Password'
import Zone from 'src/pages/users/Fields/Zone'

const EditItem = ({methods, isOpen}) => {
  const dispatch = useDispatch(),
    {currentRow} = useSelector(state => state.users),
    handleCloseModal = () => {
      dispatch(toggleModal(false))
      dispatch(setRow([]))
      methods.reset()
      methods.clearErrors()
    },
    onSubmit = body => {
      if (currentRow && currentRow.length >= 0) {
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
        {
          label: currentRow.length >= 0 ? 'Agregar' : 'Actualizar',
          onClick: methods.handleSubmit(onSubmit),
          color: 'primary',
          variant: 'contained',
          type: 'submit'
        }
      ]}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container spacing={5}>
            <FirstName {...currentRow} />
            <LastName {...currentRow} />
            <Email {...currentRow} />
            <PhoneNumber {...currentRow} />
            {currentRow.length === 0 && <Password isOpen={currentRow.length === 0} />}
            <Position {...currentRow} />
            <Zone {...currentRow} />
            <BranchID {...currentRow} />
          </Grid>
        </form>
      </FormProvider>
    </ReusableDialog>
  )
}

export default EditItem
