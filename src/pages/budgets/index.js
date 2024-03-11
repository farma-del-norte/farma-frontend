import { Fragment } from 'react'
import {useForm} from 'react-hook-form'
//import {Fragment, useEffect, useState, useMemo} from 'react'
// import {useForm, Controller} from 'react-hook-form'
// import {useSelector, useDispatch} from 'react-redux'
// import {Typography, Grid, FormControl, TextField, Box, Select, MenuItem, InputLabel, InputAdornment} from '@mui/material'
// import CardTable from 'src/components/cardTable'
// import ReusableDialog from 'src/components/modal'
// import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
// import {Pencil, Delete} from 'mdi-material-ui'
// import {toggleModal, setModalItem, setDeleteItem, toggleDeleteModal} from 'src/store/maintenances/maintenances/reducer'
// import {createMaintenance, deleteMaintenance, editMaintenance, getMaintenances} from 'src/store/maintenances/maintenances/actions'
// import { getBranches } from 'src/store/catalogs/branches/actions'
// import {getMaterialsCat} from 'src/store/catalogs/materials/actions'
// import {getDimensionsCat} from 'src/store/catalogs/dimensions/actions'
// import {getVariablesCat} from 'src/store/catalogs/variables/actions'
// import {getConceptsCat} from 'src/store/catalogs/concepts/actions'
// import {MAINTENANCES, MAINTENANCES_LOCALE, COMMON} from 'src/utils/constants'
// import CustomSnackbar from 'src/components/snackbar/CustomSnackbar'
// import {closeSnackBar} from 'src/store/notifications'
// import FallbackSpinner from 'src/@core/components/spinner'
// import {LoadingSelect} from 'src/utils/inputs'
// import MultimediaUploader from 'src/components/multimediaUploader/MultimediaUploader'
// import {getBranchesData, postBranchesData, patchBranchData, deleteBranchData} from '../../../services/catalogs/branches'
import EditItem from './EditItem';


const Budgets = () => {
  const methods = useForm();
    // const dispatch = useDispatch()

    // const {isOpen, modalItem, isDeleteOpen, maintenances, isLoading, modalDeleteItem} = useSelector(state => state.maintenances)
    // const [images, setImages] = useState([])
    // const {open, message, severity} = useSelector(state => state.notifications)
    // const [areaType, setAreaType] = useState('')
    // const [areaContent, setAreaContent] = useState([{name: "Selecciona un tipo de area para ver resultados", id: "", disabled: true}])
    // const [loadingArea, setLoadingArea] = useState(false)

    // const {control, handleSubmit, resetField, reset, setValue} = useForm({
    //   defaultValues: {
    //     area: undefined, areaID: undefined, branchID: undefined,
    //     cost: undefined, description: undefined, evidencia: undefined, materials: undefined, 
    //     motive: undefined, notes: undefined, provider: undefined, services: undefined
    //   }
    // })
  
    return (
      <Fragment>
        <EditItem methods={methods}/>
        {/* <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} /> */}
      </Fragment>
    )
}

export default Budgets