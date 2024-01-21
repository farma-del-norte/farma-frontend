import Box from '@mui/material/Box';
import ImageIcon from '@mui/icons-material/Image';
import TheatersIcon from '@mui/icons-material/Theaters';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { Typography, Button } from '@mui/material';
import React, { useEffect, useState, useRef } from 'react';
import { useSettings } from 'src/@core/hooks/useSettings'
import { useTheme } from '@mui/material/styles'
import styles from './styles.module.css';

//TODO: Separate the URLS from Files array maybe handling two arrays on images object (urlImages, fileImages)

const MultimediaUploader = ({
  base64Images = [],
  handleImages,
  field,
  accept = ".jpg,.png,.webp,video/mp4,video/x-m4v,video/*,pdf,application/pdf",
}) => {
  const theme = useTheme()
  const borderDesign = theme.palette.divider
  const { settings, saveSettings } = useSettings()
  const [images, setImages] = useState([]);
  const divContent = useRef(null);
  const animateField = document.getElementById('movingText');

  useEffect(() => {
    if (base64Images.length > 0) {
      setImages(base64Images)
    }
  }, [])

  useEffect(() => {
    convertImagesToBase64()
  }, [images])

  const convertImagesToBase64 = () => {
    Promise.all(
      images.map(
        (image) =>
          new Promise((resolve, reject) => {
            if (typeof (image) != 'string') {
              const fileReader = new FileReader();
              fileReader.onload = (_) => {
                resolve(fileReader.result);
              };
              fileReader.onerror = (error) => reject(error);
              fileReader.readAsDataURL(image.hasOwnProperty("file") ? image.file : image);
            } else {
              resolve(image)
            }
          })
      )
    ).then((base64Images) => {
      // Send base64Images to server
      handleImages(base64Images)
    });
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const newImages = [...images];
    for (const file of e.dataTransfer.files) {
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp') {
        newImages.push(file);
      }
      else if (file.type === 'video/mp4' || file.type === 'video/x-m4v' || file.type === 'video/*'){
        const file = e.dataTransfer.files[0];
        const url = URL.createObjectURL(file);
        newImages.push({file: file, url: url});
      }else if(file.type === "application/pdf"){
        newImages.push(file);
      }
    }
    setImages(newImages);
  }

  const handleRemove = (indexToRemove) => {
    const newImages = images.filter((image, index) => index !== indexToRemove);
    setImages(newImages);
  }

  const handleFileInputChange = (e) => {
    e.preventDefault()
    const newImages = [...images];
    for (const file of e.target.files) {
      if (file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/webp') {
        newImages.push(file);
      }
      else if (file.type === 'video/mp4' || file.type === 'video/x-m4v' || file.type === 'video/*'){
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        newImages.push({file: file, url: url});
      }else if(file.type === "application/pdf"){
        newImages.push(file);
      }
    }
    setImages(newImages);
  }

  useEffect(()=> {
    // Verifica si el div tiene contenido
    if (divContent.current.children.length > 0) {
      // Si tiene contenido, agrega una clase para activar la animación
      animateField.style.position = 'absolute';
      animateField.style.top = '-14px'
      animateField.style.transition = "all 1s ease";
      animateField.style.fontSize = "0.75rem";
    }else if(divContent.current.children.length === 0 && animateField){
      animateField.style.position = 'relative';
      animateField.style.top = '5px'
      animateField.style.fontSize = "1.25rem";
    }
  })

  return (
    <Box
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={handleDrop}
      className={styles.box}
      sx={{
        border: `1px solid ${borderDesign}`,
      }}
    >
      <Typography id="movingText" className={styles.field} sx={{backgroundColor: theme.palette.mode === 'light' ? theme.palette.customColors.default : theme.palette.background.paper}} variant='h5'>
        {field}
      </Typography>
      <div className={styles.fileBox}>
        <div>
          <ImageIcon sx={{width: "5rem", height: "5rem"}}/>
          <TheatersIcon sx={{width: "5rem", height: "5rem"}}/>
          <PictureAsPdfIcon sx={{width: "5rem", height: "5rem"}}/>
        </div>
        <Typography variant='body1'>Arrastra contenido multimedia aquí</Typography>
        <div style={{display: "flex", justifyContent: "center", alignItems: "center", width: "100%"}}>
          <div style={{borderBottom: `1px solid ${borderDesign}`, marginRight: "1rem", width: "30%", height: "1px"}}></div>
          <Typography variant='body1'>o</Typography>
          <div style={{borderBottom: `1px solid ${borderDesign}`, marginLeft: "1rem", width: "30%", height: "1px"}}></div>
        </div>
        <label 
          htmlFor='pdf-input' 
          style={{
            paddingTop: "0.5rem",
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
          <Button variant='contained' component='span' color='secondary' size='small'>
            Búsqueda de archivos
          </Button>
          <input
            id='pdf-input'
            accept={accept}
            type='file'
            onChange={handleFileInputChange}
            style={{ opacity: 0 }}
            required
          />
        </label>
      </div>
      <div 
        ref={divContent}
        className='file-content'
        style={{
          display: 'flex',
          flexWrap: 'wrap',
        }}
      >
        {images.map((file, index) => (
          file?.type?.includes('image') ?
          <div key={index} style={{
            position: 'relative',
            width: '150px',
            height: '150px',
            overflow: 'hidden',
            margin: '10px 5px'
          }}>
            
              <img
                src={typeof (file) === 'string' ? file : URL.createObjectURL(file)}
                alt={file.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            <div style={{ position: 'absolute', top: '5px', right: '5px', color: '#fff', fontWeight: 'bold' }}>
              <button style={{
                backgroundColor: '#000',
                cursor: 'pointer',
                border: '1px solid #ccc',
                borderRadius: '15px',
                height: '30px',
                width: '30px'
              }}
                onClick={(e) => {
                  e.preventDefault()
                  handleRemove(index)
                }}
              ><Typography variant='body2' color={'#eee'}><strong>X</strong></Typography></button>
            </div>
          </div>
              :
              file?.file?.type.includes('video') ?
              <div key={index} style={{
                position: 'relative',
                width: '268px',
                height: '150px',
                overflow: 'hidden',
                margin: '10px 5px'
              }}>
                <video
                  className="VideoInput_video"
                  width="100%"
                  height="100%"
                  controls
                  src={file.url} 
                />
                <div style={{ position: 'absolute', top: '5px', right: '5px', color: '#fff', fontWeight: 'bold' }}>
                  <button style={{
                    backgroundColor: '#000',
                    cursor: 'pointer',
                    border: '1px solid #ccc',
                    borderRadius: '15px',
                    height: '30px',
                    width: '30px'
                  }}
                    onClick={(e) => {
                      e.preventDefault()
                      handleRemove(index)
                    }}
                  ><Typography variant='body2' color={'#eee'}><strong>X</strong></Typography></button>
                </div>
              </div>
              :
              <div key={index} style={{
                position: 'relative',
                width: '270px',
                height: '150px',
                overflow: 'hidden',
                margin: '10px 5px'
              }}>
                <embed src={typeof (file) === 'string' ? file : URL.createObjectURL(file)} width="270" height="150"/>
                <div style={{ position: 'absolute', top: '5px', right: '5px', color: '#fff', fontWeight: 'bold' }}>
                <button style={{
                  backgroundColor: '#000',
                  cursor: 'pointer',
                  border: '1px solid #ccc',
                  borderRadius: '15px',
                  height: '30px',
                  width: '30px'
                }}
                  onClick={(e) => {
                    e.preventDefault()
                    handleRemove(index)
                  }}
                ><Typography variant='body2' color={'#eee'}><strong>X</strong></Typography></button>
              </div>
            </div>
        ))}
        </div>
    </Box>
  );
};

export default MultimediaUploader