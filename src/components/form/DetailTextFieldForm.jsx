import {Typography, Grid} from '@mui/material'
import {DetailTypography} from '../styledComponents/typography'

const DetailTextFieldForm = ({labelText, value}) => (
  <Grid item xs={12} md={3}>
    <Typography variant='caption'>{labelText}</Typography>
    <DetailTypography variant='body2'>{value}</DetailTypography>
  </Grid>
)

export default DetailTextFieldForm
