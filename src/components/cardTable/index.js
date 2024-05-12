import React from 'react'
import {Card, Box, useMediaQuery, IconButton, Tooltip, Typography} from '@mui/material'
import {
  DataGrid,
  GridToolbarExport,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarQuickFilter
} from '@mui/x-data-grid'
import {esES} from '@mui/x-data-grid/locales'
import {AddCircleOutline} from '@mui/icons-material'

const CardTable = ({showAddButton = false, ...props}) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))
  const gridHeight = isMobile ? 300 : 500

  const handleAddClick = () => {
    // Handle the click event for the add button
    props.onAddItem()
  }

  const addButtonTooltip = `Agregar ${props.label}` // Tooltip text

  function CustomToolbar() {
    return (
      <GridToolbarContainer sx={{justifyContent: 'space-between', p: '1rem'}}>
        <Typography sx={{fontWeight: 'bold', ml: '7px'}} variant='h6'>
          {props.label}
        </Typography>
        <GridToolbarQuickFilter />
        <Box>
          <GridToolbarColumnsButton />
          {/* <GridToolbarFilterButton /> */}
          {/* <GridToolbarDensitySelector /> */}
          <GridToolbarExport
            csvOptions={{
              utf8WithBom: true
            }}
          />
          {showAddButton && (
            <Tooltip title={addButtonTooltip}>
              <IconButton onClick={handleAddClick} color='primary'>
                <AddCircleOutline />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </GridToolbarContainer>
    )
  }

  return (
    <Card>
      <Box sx={{height: gridHeight}}>
        <DataGrid
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}
          loading={true}
          slots={{
            toolbar: CustomToolbar
          }}
          {...props}
        />
      </Box>
    </Card>
  )
}

export default CardTable
