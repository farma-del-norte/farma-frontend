import {t} from 'i18next'

const USERS_LOCALE = {
    //USERS SNACKBAR
    USER_CREATED: t('success_user_created', {ns: 'users'}),
    USER_EDITED: t('success_user_edited', {ns: 'users'}),
    USER_DELETED: t('success_user_deleted', {ns: 'users'}),

    // USERS YUP
    FIRSTNAME_REQUIRED: t('firstName_required', {ns: 'users'}),
    FIRSTNAME_MAX_LENGTH: t('firstName_max_required', {ns: 'users'}),
    LASTNAME_REQUIRED: t('lastName_required', {ns: 'users'}),
    LASTNAME_MAX_LENGTH: t('lastName_max_length', {ns: 'users'}),
    EMAIL_NOT_CORRECT: t('email_valid', {ns: 'users'}),
    EMAIL_REQUIRED: t('email_required', {ns: 'users'}),
    PHONE_NOT_CORRECT: t('phone_valid', {ns: 'users'}),
    PHONE_REQUIRED: t('phone_required', {ns: 'users'}),
    PASSWORD_MAX_LENGTH: t('password_max_length', {ns: 'users'}),
    PASSWORD_MIN_LENGTH: t('password_min_length', {ns: 'users'}),
    PASSWORD_REQUIRED: t('password_required', {ns: 'users'}),
    CONFIRM_PASSWORD_NOT_CORRECT: t('confirm_password_valid', {ns: 'users'}),
    CONFIRM_PASSWORD_REQUIRED: t('confirm_password_required', {ns: 'users'}),
    SELECT_REQUIRED: t('select_required', {ns: 'users'}),
}

export default USERS_LOCALE