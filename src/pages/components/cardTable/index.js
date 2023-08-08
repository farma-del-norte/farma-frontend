import React from 'react'
import {Card, CardHeader, Box, useMediaQuery, IconButton, Tooltip} from '@mui/material'
import {DataGrid} from '@mui/x-data-grid'
import {AddCircleOutline} from '@mui/icons-material'
import {getLocaleText} from 'src/configs/defaultLocaleText'

const CardTable = ({showAddButton = false, ...props}) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const gridHeight = isMobile ? 300 : 500

  const handleAddClick = () => {
    // Handle the click event for the add button
    props.onAddItem()
  }

  const addButtonTooltip = `Agregar ${props.label}` // Tooltip text

  return (
    <Card>
      <CardHeader
        title={props.label}
        action={
          showAddButton && (
            <Tooltip title={addButtonTooltip}>
              <IconButton onClick={handleAddClick} color='primary'>
                <AddCircleOutline />
              </IconButton>
            </Tooltip>
          )
        }
      />
      <Box sx={{height: gridHeight}}>
        <DataGrid localeText={getLocaleText()} {...props} />
      </Box>
    </Card>
  )
}

export default CardTable
