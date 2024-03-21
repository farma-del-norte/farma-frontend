import { Fragment } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { closeSnackBar } from 'src/store/notifications'
import { toggleDeleteModal } from 'src/store/catalogs/concepts/reducer'
import { deleteConceptCat } from 'src/store/catalogs/concepts/actions'
import { t } from 'i18next'
import DataTable from './DataTable'
import EditItem from './EditItem'
import RemoveItem from 'src/views/modals/RemoveItem'
import CustomSnackbar from 'src/components/snackbar/CustomSnackbar'


const Concepts = () => {
    const dispatch = useDispatch(),
        methods = useForm(),
        { isOpen, isDeleteOpen } = useSelector(state => state.conceptsCat),
        { open, message, severity } = useSelector(state => state.notifications);

    return (
        <Fragment>
            <DataTable methods={methods} />
            {
                isOpen && <EditItem methods={methods} isOpen={isOpen} />
            }

            {
                isDeleteOpen && <RemoveItem isOpen={isDeleteOpen} deleteGeneric={deleteConceptCat} dialogText={t('concepts_cat_delete_confirm_message', {ns: 'catalogs'})} toggleDeleteModal={toggleDeleteModal} getRowFunction={state => state.conceptsCat} />
            }

            <CustomSnackbar open={open} message={message} severity={severity} handleClose={() => dispatch(closeSnackBar())} />
        </Fragment>
    )
}

export default Concepts