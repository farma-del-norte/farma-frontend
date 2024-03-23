import { createDamageCat, editDamageCat } from 'src/store/catalogs/damages/actions'
import { toggleModal, setRow } from 'src/store/catalogs/damages/reducer'
import { useSelector, useDispatch } from 'react-redux'
import { FormProvider } from 'react-hook-form'
import ReusableDialog from 'src/components/modal'
import Name from 'src/pages/resources/damages/Fields/Name'

const EditItem = ({ methods, isOpen }) => {
  const dispatch = useDispatch(),
    { currentRow } = useSelector(state => state.damagesCat),
    handleCloseModal = () => {
      dispatch(toggleModal(false))
      dispatch(setRow([]))
      methods.reset()
    },
    onSubmit = (body) => {
      if (currentRow && currentRow.length >= 0) {
        dispatch(createDamageCat(body))
        dispatch(toggleModal(false))
      } else {
        body.id = currentRow.id
        dispatch(editDamageCat(body))
        dispatch(toggleModal(false))
      }
    }

  return (
    <ReusableDialog
      open={isOpen}
      onClose={handleCloseModal}
      actions={[
        { label: 'Regresar', onClick: handleCloseModal, color: 'primary', variant: 'outlined' },
        { label: currentRow.length >= 0 ? 'Agregar' : 'Actualizar', onClick: methods.handleSubmit(onSubmit), color: 'primary', variant: 'contained', type: 'submit' }
      ]}
    >
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Name {...currentRow} />
        </form>
      </FormProvider>
    </ReusableDialog>
  )
}

export default EditItem;