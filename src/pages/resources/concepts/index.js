import {Fragment} from 'react'
import {useForm} from 'react-hook-form'
import {useSelector, useDispatch} from 'react-redux'

import {toggleDeleteModal} from 'src/store/catalogs/concepts/reducer'
import {deleteConceptCat} from 'src/store/catalogs/concepts/actions'
import {t} from 'i18next'
import DataTable from 'src/pages/resources/concepts/DataTable'
import EditItem from 'src/pages/resources/concepts/EditItem'
import RemoveItem from 'src/views/modals/RemoveItem'

const Concepts = () => {
  const dispatch = useDispatch(),
    methods = useForm(),
    {isOpen, isDeleteOpen} = useSelector(state => state.conceptsCat)

  return (
    <Fragment>
      <DataTable methods={methods} />
      {isOpen && <EditItem methods={methods} isOpen={isOpen} />}

      {isDeleteOpen && (
        <RemoveItem
          isOpen={isDeleteOpen}
          deleteGeneric={deleteConceptCat}
          dialogText={t('concepts_cat_delete_confirm_message', {ns: 'catalogs'})}
          toggleDeleteModal={toggleDeleteModal}
          getRowFunction={state => state.conceptsCat}
        />
      )}
    </Fragment>
  )
}

export default Concepts
