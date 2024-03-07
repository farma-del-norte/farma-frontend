import Box from '@mui/material/Box'
import { ForgotPasswordIllustrationWrapper, 
    ForgotPasswordIllustration
} from './styles'
import { useTheme } from '@mui/material/styles'
import FooterIllustrationsV2 from 'src/views/pages/auth/FooterIllustrationsV2'

const PasswordIlustration = (props) => {
    const theme = useTheme(),
        imageSource = props.imageSource;

    return (
        <Box sx={{ flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center' }}>
            <ForgotPasswordIllustrationWrapper>
                <ForgotPasswordIllustration
                    alt='forgot-password-illustration'
                    src={`/images/pages/${imageSource}-${theme.palette.mode}.png`}
                    />
                </ForgotPasswordIllustrationWrapper>
            <FooterIllustrationsV2 />
        </Box>
    )
}

export default PasswordIlustration