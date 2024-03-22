import { createMaterialCat, editMaterialCat } from 'src/store/catalogs/materials/actions'
import { toggleModal, setRow } from 'src/store/catalogs/materials/reducer'
import { useSelector, useDispatch } from 'react-redux'
import { FormProvider } from 'react-hook-form'
import { Grid } from '@mui/material'
import ReusableDialog from 'src/components/modal'
import Name from 'src/pages/resources/materials/Fields/Name'
import Cost from 'src/pages/resources/materials/Fields/Cost'
import Units from 'src/pages/resources/materials/Fields/Units'
import Performance from 'src/pages/resources/materials/Fields/Performance'
import Category from 'src/pages/resources/materials/Fields/Category'
import Obligation from 'src/pages/resources/materials/Fields/Obligation'
import Observations from 'src/pages/resources/materials/Fields/Observations'


const EditItem = ({ methods, isOpen }) => {
  const dispatch = useDispatch(),
    { currentRow } = useSelector(state => state.materialsCat),
    handleCloseModal = () => {
      dispatch(toggleModal(false))
      dispatch(setRow([]))
      methods.reset()
    },
    onSubmit = (body) => {
      if (currentRow && currentRow.length >= 0) {
        dispatch(createMaterialCat(body))
        dispatch(toggleModal(false))
      } else {
        body.id = currentRow.id
        dispatch(editMaterialCat(body))
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
            <Cost {...currentRow} />
            <Units {...currentRow} />
            <Performance {...currentRow} />
            <Category {...currentRow} />
            <Obligation {...currentRow} />
            <Observations {...currentRow} />
          </Grid>
        </form>
      </FormProvider>
    </ReusableDialog>
  )
}

export default EditItem;