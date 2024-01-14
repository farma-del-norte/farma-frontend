import {Grid, Typography} from '@mui/material'
import {useTranslation} from 'react-i18next'
import {useDispatch, useSelector} from 'react-redux'
import DetailTextFieldForm from 'src/components/form/DetailTextFieldForm'
import ImageFieldForm from 'src/components/form/ImageFieldForm'
import ReusableDialog from 'src/components/modal'
import {DetailTypography} from 'src/components/styledComponents/typography'
import {setActiveBranch, setIsDetailsOpen} from 'src/store/catalogs/branches/reducer'
import CATALOGS_LOCALE from 'src/utils/locales/catalogs'
import COMMON_LOCALE from 'src/utils/locales/common'

const BranchDetailsModel = () => {
  const {t} = useTranslation()
  const {isDetailsOpen, activeBranch} = useSelector(state => state.branches)
  const dispatch = useDispatch()

  const handleCloseBranchDetailsModel = () => {
    dispatch(setActiveBranch(null))
    dispatch(setIsDetailsOpen(false))
  }

  return (
    <ReusableDialog
      open={isDetailsOpen}
      onClose={handleCloseBranchDetailsModel}
      title={`${CATALOGS_LOCALE.BRANCHES_BRANCH_DETAILS_TITLE} ${activeBranch?.name}`}
      actions={[
        {
          label: COMMON_LOCALE.BACK_BUTTON,
          onClick: handleCloseBranchDetailsModel,
          color: 'primary',
          variant: 'outlined'
        }
      ]}
      isMaxWidthEnabled={true}
    >
      <Grid container>
        <ImageFieldForm labelText={CATALOGS_LOCALE.BRANCHES_IMAGE_PHARMACY} imageURLs={[]} />
        <DetailTextFieldForm labelText={CATALOGS_LOCALE.BRANCHES_SQUARE_METERS} value={activeBranch.details.mts2} />
        <DetailTextFieldForm labelText={CATALOGS_LOCALE.BRANCHES_CROSS_AD} value={activeBranch.details.crossAds} />
        <ImageFieldForm labelText={CATALOGS_LOCALE.BRANCHES_PHARMACY_PLANS} imageURLs={[]} />
        <DetailTextFieldForm labelText={CATALOGS_LOCALE.BRANCHES_LETTER_AD} value={activeBranch.details.letterAds} />
        <DetailTextFieldForm
          labelText={CATALOGS_LOCALE.BRANCHES_REFLECTIVE_AD}
          value={activeBranch.details.reflectiveAds}
        />
        <DetailTextFieldForm labelText={CATALOGS_LOCALE.BRANCHES_LATITUDE} value={activeBranch.details.latitude} />
        <DetailTextFieldForm labelText={CATALOGS_LOCALE.BRANCHES_LONGITUDE} value={activeBranch.details.longitude} />
        <DetailTextFieldForm labelText={CATALOGS_LOCALE.BRANCHES_TARP_AD} value={activeBranch.details.tarpAds} />
        <DetailTextFieldForm
          labelText={CATALOGS_LOCALE.BRANCHES_WATERPROOFING}
          value={activeBranch.details.waterproofing ? COMMON_LOCALE.YES : COMMON_LOCALE.NO}
        />
        <DetailTextFieldForm labelText={CATALOGS_LOCALE.BRANCHES_BATHROOMS} value={activeBranch.details.bathrooms} />
        <DetailTextFieldForm labelText={CATALOGS_LOCALE.BRANCHES_AIR_WASH} value={activeBranch.details.airWash} />
        <DetailTextFieldForm labelText={CATALOGS_LOCALE.BRANCHES_MINISPLITS} value={activeBranch.details.minisplit} />
        <DetailTextFieldForm labelText={CATALOGS_LOCALE.BRANCHES_CURTAINS} value={activeBranch.details.curtains} />
        <DetailTextFieldForm
          labelText={CATALOGS_LOCALE.BRANCHES_SOLAR_PANELS}
          value={activeBranch.details.solarPanels}
        />
      </Grid>
    </ReusableDialog>
  )
}

export default BranchDetailsModel
