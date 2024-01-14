import {Box, Grid, Typography} from '@mui/material'
import {DetailTypography} from '../styledComponents/typography'
import Image from 'next/image'

const ImageFieldForm = ({labelText, imageURLs = []}) => (
  <Grid item xs={12} md={6} sx={{paddingRight: 5}}>
    <Typography variant='caption'>{labelText}</Typography>
    <Grid container spacing={2} sx={{border: '0.5px solid ButtonShadow', marginTop: 1, borderRadius: 1}}>
      <Grid item>
        <Image
          src={'https://wonderfulengineering.com/wp-content/uploads/2014/10/image-wallpaper-15.jpg'}
          unoptimized
          alt={labelText}
          height={100}
          width={100}
        />
      </Grid>
      <Grid item>
        <Image
          src={'https://wonderfulengineering.com/wp-content/uploads/2014/10/image-wallpaper-15.jpg'}
          unoptimized
          alt={labelText}
          height={100}
          width={100}
        />
      </Grid>
    </Grid>
  </Grid>
)

export default ImageFieldForm
