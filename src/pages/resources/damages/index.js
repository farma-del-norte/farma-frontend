import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { closeSnackBar } from 'src/store/notifications'
import { toggleDeleteModal } from 'src/store/catalogs/damages/reducer'
import { deleteDamageCat } from 'src/store/catalogs/damages/actions'
import DataTable from 'src/pages/resources/damages/DataTable'
import EditItem from 'src/pages/resources/damages/EditItem'
import RemoveItem from 'src/views/modals/RemoveItem'
import CustomSnackbar from 'src/components/snackbar/CustomSnackbar'


const Damages = () => {
    const dispatch = useDispatch(),
        dialogText = "Seguro de eliminar el siniestro seleccionado?",
        methods = useForm(),
        { isOpen, isDeleteOpen } = useSelector(state => state.damagesCat),
        { open, message, severity } = useSelector(state => state.notifications);

    return (
        <Fragment>
            <DataTable methods={methods} />
            {
                isOpen && <EditItem methods={methods} isOpen={isOpen} />
            }

            {
                isDeleteOpen && <RemoveItem isOpen={isDeleteOpen} deleteGeneric={deleteDamageCat} dialogText={dialogText} toggleDeleteModal={toggleDeleteModal} getRowFunction={state => state.damagesCat} />
            }

            <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
        </Fragment>
    )
}

export default Damages