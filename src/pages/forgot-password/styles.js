import { styled, useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

const ForgotPasswordIllustrationWrapper = styled(Box)(({ theme }) => ({
    padding: theme.spacing(20),
    paddingRight: '0 !important',
    [theme.breakpoints.down('lg')]: {
      padding: theme.spacing(10)
    }
}))
  
const ForgotPasswordIllustration = styled('img')(({ theme }) => ({
    maxWidth: '53.125rem',
    [theme.breakpoints.down('lg')]: {
      maxWidth: '35rem'
    }
}))
  
const RightWrapper = styled(Box)(({ theme }) => ({
    width: '100%',
    [theme.breakpoints.up('md')]: {
      maxWidth: 450
    }
}))
  
const BoxWrapper = styled(Box)(({ theme }) => ({
    [theme.breakpoints.down('xl')]: {
      width: '100%'
    },
    [theme.breakpoints.down('md')]: {
      maxWidth: 400
    }
}))
  
const TypographyStyled = styled(Typography)(({ theme }) => ({
    fontWeight: 600,
    marginBottom: theme.spacing(1.5),
    [theme.breakpoints.down('md')]: { mt: theme.spacing(8) }
}))
  
const LinkStyled = styled('a')(({ theme }) => ({
    display: 'flex',
    fontSize: '0.875rem',
    alignItems: 'center',
    textDecoration: 'none',
    justifyContent: 'center',
    color: theme.palette.primary.main
}))

const mainBoxStyling = {
  p: 12,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'background.paper'
}

const boxWrapperStyling = {
  top: 30,
  left: 40,
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center'
}

module.exports = {
  ForgotPasswordIllustrationWrapper,
  ForgotPasswordIllustration,
  RightWrapper,
  BoxWrapper,
  TypographyStyled,
  LinkStyled,
  mainBoxStyling,
  boxWrapperStyling
}