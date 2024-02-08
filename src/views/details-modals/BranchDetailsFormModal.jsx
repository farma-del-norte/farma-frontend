import ReusableDialog from 'src/components/modal'
import i18n from 'src/configs/i18n'
import {useDispatch, useSelector} from 'react-redux'
import {setIsDetailsFormModalOpen} from 'src/store/catalogs/branches/reducer'
import {addBranchDetails, updateBranchDetails} from 'src/store/catalogs/branches/actions'
import { DetailsForm } from '../forms/branch-details/DetailsForm'

const BranchDetailsFormModal = ({control, handleSubmit, handlePharmacyImageUpdate, handleBlueprintImageUpdate}) => {
  const dispatch = useDispatch()
  const {isDetailsFormOpen, branchDetails, activeBranch} = useSelector(state => state.branches)

  const handleAddBranch = values => {
    dispatch(addBranchDetails({branchId: activeBranch.id, body: values}))
  }

  const handleUpdateBranch = values => {
    dispatch(updateBranchDetails(branchDetails.id, values))
  }

  const handleCloseModal = () => {
    dispatch(setIsDetailsFormModalOpen(false))
  }

  return (
    <ReusableDialog
      open={isDetailsFormOpen}
      onClose={handleCloseModal}
      title={
        Boolean(branchDetails)
          ? `${i18n.t('branches:edit_details')} ${activeBranch?.name}`
          : `${i18n.t('branches:add_details')} ${activeBranch?.name}`
      }
      actions={[
        {label: i18n.t('Regresar'), onClick: handleCloseModal, color: 'primary', variant: 'outlined'},
        Boolean(branchDetails)
          ? {
              label: i18n.t('save_button'),
              onClick: handleSubmit(handleUpdateBranch),
              color: 'primary',
              variant: 'contained'
            }
          : {label: i18n.t('add'), onClick: handleSubmit(handleAddBranch), color: 'primary', variant: 'contained'}
      ]}
    >
      <DetailsForm
        control={control}
        handleSubmit={handleSubmit}
        handlePharmacyImageUpdate={handlePharmacyImageUpdate}
        handleBlueprintImageUpdate={handleBlueprintImageUpdate}
      />
    </ReusableDialog>
  )
}

export default BranchDetailsFormModal
