import Typography from '@mui/material/Typography'
import { TypographyStyled } from './styles'
import Box from '@mui/material/Box'

const InformationText = (props) => {
    const forgetPassword = props.forgetPassword,
        resetPassword = props.resetPassword;
    return (
        <Box sx={{ mb: 6 }}>
            <TypographyStyled variant='h5'>{forgetPassword}</TypographyStyled>
            <Typography variant='body2'>
                {resetPassword}
            </Typography>
        </Box>
    )
}

export default InformationText