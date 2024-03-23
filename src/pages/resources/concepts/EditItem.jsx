import { createConceptCat, editConceptCat } from 'src/store/catalogs/concepts/actions'
import { toggleModal, setRow } from 'src/store/catalogs/concepts/reducer'
import { useSelector, useDispatch } from 'react-redux'
import { FormProvider } from 'react-hook-form'
import { Grid } from '@mui/material'
import ReusableDialog from 'src/components/modal'
import Name from 'src/pages/resources/concepts/Fields/Name'
import Variable from 'src/pages/resources/concepts/Fields/Variable'
import Type from 'src/pages/resources/concepts/Fields/Type'
import Definition from 'src/pages/resources/concepts/Fields/Definition'
import Observations from 'src/pages/resources/concepts/Fields/Observations'


const EditItem = ({ methods, isOpen }) => {
  const dispatch = useDispatch(),
    { currentRow } = useSelector(state => state.conceptsCat),
    handleCloseModal = () => {
      dispatch(toggleModal(false))
      dispatch(setRow([]))
      methods.reset()
    },
    onSubmit = (body) => {
      if (currentRow && currentRow.length >= 0) {
        dispatch(createConceptCat(body))
        dispatch(toggleModal(false))
      } else {
        body.id = currentRow.id
        dispatch(editConceptCat(body))
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
            <Variable {...currentRow} />
            <Type {...currentRow} />
            <Definition {...currentRow} />
            <Observations {...currentRow} />
          </Grid>
        </form>
      </FormProvider>
    </ReusableDialog>
  )
}

export default EditItem;