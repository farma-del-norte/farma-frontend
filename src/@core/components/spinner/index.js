// ** MUI Import
import Box from '@mui/material/Box'
import {useTheme} from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'
import Image from 'next/image'

const FallbackSpinner = () => {
  // ** Hook
  const theme = useTheme()

  return (
    <Box
      sx={{
        height: '75vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Box sx={{mb: '200px', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}>
        <Image
          src='/images/logos/simiLogo.png'
          alt='Simi Logo'
          width={85}
          height={85}
          layout='fixed'
          style={{marginBottom: '-87.5px'}}
        />
        <CircularProgress size={88} />
      </Box>
    </Box>
  )
}

export default FallbackSpinner
