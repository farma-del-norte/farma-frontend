// ** Next Import
import Link from 'next/link'

// ** MUI Components
import Button from '@mui/material/Button'
import {styled} from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

// ** Layout Import
import BlankLayout from 'src/@core/layouts/BlankLayout'

// ** Demo Imports

// ** Styled Components
const BoxWrapper = styled(Box)(({theme}) => ({
  [theme.breakpoints.down('md')]: {
    width: '90vw'
  }
}))

const Error401 = () => {
  return (
    <Box className='content-center'>
      <Box sx={{p: 5, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center'}}>
        <BoxWrapper>
          <Typography variant='h1'>401</Typography>
          <Typography variant='h5' sx={{mb: 1, fontSize: '1.5rem !important'}}>
            No autorizado! 🔐
          </Typography>
          <Typography variant='body2'>No tienes permiso para acceder a esta página!</Typography>
        </BoxWrapper>
        <Link passHref href={localStorage.getItem('im-user') ? '/dashboards' : '/login'}>
          <Button component='a' variant='contained' sx={{px: 5.5, mt: 10}}>
            Volver al inicio
          </Button>
        </Link>
      </Box>
    </Box>
  )
}
Error401.getLayout = page => <BlankLayout>{page}</BlankLayout>

export default Error401
