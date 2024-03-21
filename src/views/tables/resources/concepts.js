import {CATALOGS, COMMON} from 'src/utils/constants'
import { t } from 'i18next'

export const conceptsColumns = [
    {
        flex: COMMON.COLUMN_FLEX,
        minWidth: COMMON.COLUMN_MIN_WIDTH,
        field: CATALOGS.CONCEPTS_FIELD_NAME,
        headerName: t('concepts_cat_field_name', { ns: 'catalogs' })
    },
    {
        flex: COMMON.COLUMN_FLEX,
        minWidth: COMMON.COLUMN_MIN_WIDTH,
        field: CATALOGS.CONCEPTS_FIELD_TYPE,
        headerName: t('concepts_cat_field_type', { ns: 'catalogs' })
    },
    {
        flex: COMMON.COLUMN_FLEX,
        minWidth: COMMON.COLUMN_MIN_WIDTH,
        field: CATALOGS.CONCEPTS_FIELD_DEFINITION,
        headerName: t('concepts_cat_field_definition', { ns: 'catalogs' })
    },
    {
        flex: COMMON.COLUMN_FLEX_SMALL,
        minWidth: COMMON.COLUMN_MIN_WIDTH_SMALL,
        field: CATALOGS.CONCEPTS_FIELD_OBSERVATIONS,
        headerName: t('concepts_cat_field_observations', { ns: 'catalogs' })
    },
    {
        flex: COMMON.COLUMN_FLEX,
        minWidth: COMMON.COLUMN_MIN_WIDTH,
        field: CATALOGS.CONCEPTS_FIELD_VARIABLE_NAME,
        headerName: t('concepts_cat_field_variable_name', { ns: 'catalogs' })
    }
]
