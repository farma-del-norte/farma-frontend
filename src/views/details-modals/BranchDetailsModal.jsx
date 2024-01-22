import {Button, Grid, Typography} from '@mui/material'
import {useTranslation} from 'react-i18next'
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
import CATALOGS_LOCALE from 'src/utils/locales/catalogs'
import COMMON_LOCALE from 'src/utils/locales/common'
import ClipLoader from 'react-spinners/ClipLoader'

const BranchDetailsModel = () => {
  const {isDetailsModalOpen, activeBranch, branchDetails, isModalLoading} = useSelector(state => state.branches)
  const dispatch = useDispatch()

  const handleCloseBranchDetailsModel = () => {
    dispatch(setActiveBranch(null))
    dispatch(setBranchDetails(null))
    dispatch(setIsDetailsModalOpen(false))
  }

  const handleFormModal = () => {
    dispatch(setIsDetailsFormModalOpen(true))
  }

  return (
    <ReusableDialog
      open={isDetailsModalOpen}
      onClose={handleCloseBranchDetailsModel}
      title={`${CATALOGS_LOCALE.BRANCHES_BRANCH_DETAILS_TITLE} ${activeBranch?.name}`}
      actions={[
        {
          label: branchDetails == null ? 'Agregar Detalles De Sucursal' : 'Editar Detalles De Sucursal',
          onClick: handleFormModal,
          color: 'success',
          variant: 'contained'
        },
        {
          label: COMMON_LOCALE.BACK_BUTTON,
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
            labelText={CATALOGS_LOCALE.BRANCHES_IMAGE_PHARMACY}
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
            labelText={CATALOGS_LOCALE.BRANCHES_PHARMACY_PLANS}
            sourceData={
              branchDetails?.pharmacyPlans ?? [
                {
                  fileName: 'Prueba',
                  url: 'https://i.ytimg.com/vi/Df5hidqLsE0/maxresdefault.jpg'
                }
              ]
            }
          />
          <DetailTextFieldForm labelText={CATALOGS_LOCALE.BRANCHES_SQUARE_METERS} value={branchDetails.mts2} />
          <DetailTextFieldForm labelText={CATALOGS_LOCALE.BRANCHES_CROSS_AD} value={branchDetails.crossAds} />
          <DetailTextFieldForm labelText={CATALOGS_LOCALE.BRANCHES_LETTER_AD} value={branchDetails.letterAds} />
          <DetailTextFieldForm labelText={CATALOGS_LOCALE.BRANCHES_REFLECTIVE_AD} value={branchDetails.reflectiveAds} />
          <DetailTextFieldForm labelText={CATALOGS_LOCALE.BRANCHES_LATITUDE} value={branchDetails.latitude} />
          <DetailTextFieldForm labelText={CATALOGS_LOCALE.BRANCHES_LONGITUDE} value={branchDetails.longitude} />
          <DetailTextFieldForm labelText={CATALOGS_LOCALE.BRANCHES_TARP_AD} value={branchDetails.tarpAds} />
          <DetailTextFieldForm labelText={CATALOGS_LOCALE.BRANCHES_BATHROOMS} value={branchDetails.bathrooms} />
          <DetailTextFieldForm labelText={CATALOGS_LOCALE.BRANCHES_AIR_WASH} value={branchDetails.airWash} />
          <DetailTextFieldForm labelText={CATALOGS_LOCALE.BRANCHES_MINISPLITS} value={branchDetails.minisplit} />
          <DetailTextFieldForm labelText={CATALOGS_LOCALE.BRANCHES_CURTAINS} value={branchDetails.curtains} />
          <DetailTextFieldForm
            labelText={CATALOGS_LOCALE.BRANCHES_WATERPROOFING}
            value={branchDetails.waterproofing ? COMMON_LOCALE.YES : COMMON_LOCALE.NO}
          />
          <DetailTextFieldForm
            labelText={CATALOGS_LOCALE.BRANCHES_SOLAR_PANELS}
            value={branchDetails.solarPanels ? COMMON_LOCALE.YES : COMMON_LOCALE.NO}
          />
        </Grid>
      ) : (
        <Typography variant='overline'>{'No se han dado de alta los detalles de esta sucursal.'}</Typography>
      )}
    </ReusableDialog>
  )
}

export default BranchDetailsModel
