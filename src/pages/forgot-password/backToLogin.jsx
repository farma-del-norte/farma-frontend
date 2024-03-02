import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { LinkStyled } from './styles'
import ChevronLeft from 'mdi-material-ui/ChevronLeft'

const BackToLogin = (props) => {
    const loginText = props.loginText;

  return (
      <Typography variant='body2' sx={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Link passHref href='/login'>
          <LinkStyled>
            <ChevronLeft />
            <span>{loginText}</span>
          </LinkStyled>
        </Link>
      </Typography>
  )
}

export default BackToLogin