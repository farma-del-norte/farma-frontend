import {Typography, Grid} from '@mui/material'
import {DetailTypography} from '../styledComponents/typography'

const DetailTextFieldForm = ({labelText, value, multiline=false, md=3}) => (
  <Grid item xs={12} md={md}>
    <Typography variant='caption'>{labelText}</Typography>
    <DetailTypography multiline={multiline} variant='body2'>{value}</DetailTypography>
  </Grid>
)

export default DetailTextFieldForm
