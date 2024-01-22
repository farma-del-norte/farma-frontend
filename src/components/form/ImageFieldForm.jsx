import {Card, CardActionArea, CardContent, CardMedia, Grid, Typography} from '@mui/material'

const ImageFieldForm = ({labelText, sourceData = null}) => {
  return sourceData != null ? (
    <Grid item xs={12} md={6} sx={{paddingRight: 5}}>
      <Typography variant='caption'>{labelText}</Typography>
      <Grid container flexDirection={'row'} sx={{marginTop: 1, borderRadius: 1, paddingY: 2}}>
        {sourceData.map((source, index) => {
          const isPDF = source.url.includes('.pdf')
          return (
            <Card key={index} sx={{margin: 2, width: 200}}>
              <CardActionArea>
                <CardMedia
                  component='img'
                  height='100'
                  image={isPDF ? '/images/icons/project-icons/pdf.png' : source.url}
                  alt={labelText}
                  sx={{objectFit: isPDF ? 'contain' : 'cover'}}
                />
                <CardContent>
                  <Typography variant='body2'>{source.fileName}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          )
        })}
      </Grid>
    </Grid>
  ) : null
}

export default ImageFieldForm
