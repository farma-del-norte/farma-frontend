// ** MUI Import
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Image from 'next/image'

const FallbackSpinner = ({h = '75vh', mb = '200px', mt = '0px'}) => {
  // ** Hook
  //const theme = useTheme()

  console.log(h, mb, mt)

  return (
    <Box
      sx={{
        height: h,
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
      }}
    >
      <Box sx={{mb, mt, display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center'}}>
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
