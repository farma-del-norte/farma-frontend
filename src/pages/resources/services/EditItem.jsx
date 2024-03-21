import { createServiceCat, editServiceCat } from 'src/store/catalogs/services/actions'
import { toggleModal, setRow } from 'src/store/catalogs/services/reducer'
import { useSelector, useDispatch } from 'react-redux'
import { FormProvider } from 'react-hook-form'
import { Grid } from '@mui/material'
import ReusableDialog from 'src/components/modal'
import Category from 'src/pages/resources/services/Fields/Category'
import Name from 'src/pages/resources/services/Fields/Name'

const EditItem = ({ methods, isOpen }) => {
  const dispatch = useDispatch(),
    { currentRow } = useSelector(state => state.serviceCat),
    handleCloseModal = () => {
      dispatch(toggleModal(false))
      dispatch(setRow([]))
      methods.reset()
    },
    onSubmit = (body) => {
      if (currentRow && currentRow.length >= 0) {
        dispatch(createServiceCat(body))
        dispatch(toggleModal(false))
      } else {
        body.id = currentRow.id
        dispatch(editServiceCat(body))
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
          <Grid container spacing={5}>
            <Name {...currentRow} />
            <Category {...currentRow} />
          </Grid>
        </form>
      </FormProvider>
    </ReusableDialog>
  )
}

export default EditItem;