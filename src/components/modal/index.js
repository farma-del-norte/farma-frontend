import { useState} from 'react'
import {
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  useMediaQuery,
  Box,
  Tab,
  Tabs,
} 
from '@mui/material'

const Actions = ({actions, toIndex = undefined}) => {

  const limit = toIndex ?? actions.length

  return(
    <DialogActions>
      {actions.length
        ? actions.slice(0, limit).map((action, index) => (
            <Button key={index} onClick={action.onClick} color={action.color} variant={action.variant}>
              {action.label}
            </Button>
          ))
        : null}
    </DialogActions>
  )
}

const CustomTabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <strong>{children}</strong>
        </Box>
      )}
    </div>
  );
}

const MainTabs = ({tabs, actions}) => {

  const [selectedTab, setSelectedTab] = useState(0)

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, paddingTop: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleChange} aria-label="lab API tabs example">
          { tabs.map((tab, index) => (
            <Tab
              sx={{ fontSize: '1rem' }}
              key={index} 
              label={tab.title || ''} 
              value={index} 
            />
          ))}
        </Tabs>
      </Box>
      {tabs.map((tab, index) => (
        <CustomTabPanel
          key={index} 
          value={selectedTab}
          index={index}
        >
          <DialogContent>Item {index}</DialogContent>
          <Actions actions={actions} toIndex={tabs[selectedTab].indexActions}/>
        </CustomTabPanel>
      ))}
    </Box>
  )
}

const ReusableDialog = ({open = false, onClose = () => {}, title = '', children, actions = [], size = false, tabs = undefined}) => {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={size}
      fullWidth={!isMobile}
      fullScreen={isMobile}
    >
      {tabs ?
        <MainTabs
          tabs={tabs}
          actions={actions}
        >
          {children}
        </MainTabs>
        :
        <Box>
          <DialogTitle>{title}</DialogTitle>
          <DialogContent>{children}</DialogContent>
          <Actions actions={actions} />
        </Box>
      }
    </Dialog>
  )
}

export default ReusableDialog
