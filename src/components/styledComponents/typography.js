import {Typography} from '@mui/material'
import {styled} from '@mui/material/styles'

export const DetailTypography = styled(Typography)(({ multiline }) => ({
  border: '0.5px solid ButtonShadow',
  borderRadius: '0.5em',
  marginRight: '20px',
  paddingLeft: '8px',
  height: multiline ? '60px' : '30px',
  paddingTop: '3px'
}))
