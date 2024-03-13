import Box from '@mui/material/Box'
import Image from 'next/image'

const PasswordIlustration = () => {

  return (
    <Box sx={{flex: 1, display: 'flex', position: 'relative', alignItems: 'center', justifyContent: 'center'}}>
      <Box sx={{position: 'absolute', top: '30%', left: '20%'}}>
        <Image src='/images/logos/simiLogo.png' alt='Simi Logo' width={400} height={400} layout='fixed' />
      </Box>
    </Box>
  )
}

export default PasswordIlustration
