import { Grid, Typography} from '@mui/material'
import {useDispatch, useSelector} from 'react-redux'
import DetailTextFieldForm from 'src/components/form/DetailTextFieldForm'
import ImageFieldForm from 'src/components/form/ImageFieldForm'
import ReusableDialog from 'src/components/modal'
import {
  setActiveBranch,
  setBranchDetails,
  setIsDetailsFormModalOpen,
  setIsDetailsModalOpen
} from 'src/store/catalogs/branches/reducer'

import ClipLoader from 'react-spinners/ClipLoader'
import i18n from 'src/configs/i18n'
import {t} from 'i18next'

const BranchDetailsModel = ({reset = () => {}}) => {
  const {isDetailsModalOpen, activeBranch, branchDetails, isModalLoading} = useSelector(state => state.branches)
  const dispatch = useDispatch()

  const handleCloseBranchDetailsModel = () => {
    dispatch(setActiveBranch(null))
    dispatch(setBranchDetails(null))
    dispatch(setIsDetailsModalOpen(false))
  }

  const handleFormModal = () => {
    reset(branchDetails != null ? branchDetails : {})
    dispatch(setIsDetailsFormModalOpen(true))
  }

  return (
    <ReusableDialog
      open={isDetailsModalOpen}
      onClose={handleCloseBranchDetailsModel}
      title={t('branches_branch_details_title', {ns: 'catalogs', branch: activeBranch?.name})}
      actions={[
        {
          label: branchDetails == null ? 'Agregar Detalles De Sucursal' : 'Editar Detalles De Sucursal',
          onClick: handleFormModal,
          color: 'success',
          variant: 'contained'
        },
        {
          label: i18n.t('back_button'),
          onClick: handleCloseBranchDetailsModel,
          color: 'primary',
          variant: 'outlined'
        }
      ]}
    >
      {isModalLoading ? (
        <ClipLoader />
      ) : branchDetails != null ? (
        <Grid container>
          <ImageFieldForm
            labelText={t('branches_image_pharmacy', {ns: 'catalogs'})}
            sourceData={
              branchDetails?.pharmacyImages ?? [
                {
                  fileName: 'Prueba',
                  url: 'https://i.ytimg.com/vi/Df5hidqLsE0/maxresdefault.jpg'
                }
              ]
            }
          />
          <ImageFieldForm
            labelText={t('branches_pharmacy_plans', {ns: 'catalogs'})}
            sourceData={
              branchDetails?.pharmacyPlans ?? [
                {
                  fileName: 'Prueba',
                  url: 'https://i.ytimg.com/vi/Df5hidqLsE0/maxresdefault.jpg'
                }
              ]
            }
          />
          <DetailTextFieldForm labelText={t('branches_square_meters', {ns: 'catalogs'})} value={branchDetails?.mts2} />
          <DetailTextFieldForm labelText={t('branches_cross_ad', {ns: 'catalogs'})} value={branchDetails?.crossAds} />
          <DetailTextFieldForm labelText={t('branches_letter_ad', {ns: 'catalogs'})} value={branchDetails?.letterAds} />
          <DetailTextFieldForm
            labelText={t('branches_reflective_ad', {ns: 'catalogs'})}
            value={branchDetails?.reflectiveAds}
          />
          <DetailTextFieldForm labelText={t('branches_latitude', {ns: 'catalogs'})} value={branchDetails?.latitude} />
          <DetailTextFieldForm labelText={t('branches_longitude', {ns: 'catalogs'})} value={branchDetails?.longitude} />
          <DetailTextFieldForm labelText={t('branches_tarp_ad', {ns: 'catalogs'})} value={branchDetails?.tarpAds} />
          <DetailTextFieldForm labelText={t('branches_bathrooms', {ns: 'catalogs'})} value={branchDetails?.bathrooms} />
          <DetailTextFieldForm labelText={t('branches_air_wash', {ns: 'catalogs'})} value={branchDetails?.airWash} />
          <DetailTextFieldForm
            labelText={t('branches_minisplits', {ns: 'catalogs'})}
            value={branchDetails?.minisplit}
          />
          <DetailTextFieldForm labelText={t('branches_curtains', {ns: 'catalogs'})} value={branchDetails?.curtains} />
          <DetailTextFieldForm
            labelText={t('branches_waterproofing', {ns: 'catalogs'})}
            value={branchDetails.waterproofing ? t('yes') : t('no')}
          />
          <DetailTextFieldForm
            labelText={t('branches_solar_panels', {ns: 'catalogs'})}
            value={branchDetails.solarPanels ? t('yes') : t('no')}
          />
        </Grid>
      ) : (
        <Typography variant='overline'>{t('branches_no_details', {ns: 'catalogs'})}</Typography>
      )}
    </ReusableDialog>
  )
}

export default BranchDetailsModel
