const utils = require('./utils');
const validator = {};
validator.customMessage = (validation, param, length) => {
    if (validation === 'isInt') {
        return l10n.t('SHOULD_BE_INT', { FIELD: param });
    } else if (validation === 'isBoolean') {
        return l10n.t('SHOULD_BE_BOOLEAN', { FIELD: param });
    } else if (validation === 'isFloat') {
        return l10n.t('SHOULD_BE_FLOAT', { FIELD: param });
    } else if (validation === 'isArray') {
        return l10n.t('SHOULD_BE_ARRAY', { FIELD: param });
    } else if (validation === 'isAlpha') {
        return l10n.t('SHOULD_BE_IN_ALPHA', { FIELD: param });
    } else if (validation === 'isMatch') {
        return l10n.t('SHOULD_BE_IN_MATCH', { FIELD: param });
    } else if (validation === 'isString') {
        return l10n.t('SHOULD_BE_STRING', { FIELD: param });
    } else if (validation === 'isRequired') {
        return l10n.t('FIELD_REQUIRED', { FIELD: param });
    } else if (validation === 'isIn') {
        return l10n.t('INVALID_VALUE', { FIELD: param });
    } else if (validation === 'isNegative') {
        return l10n.t('CANNOT_BE_NEGATIVE', { FIELD: param });
    } else if (validation === 'isMin') {
        return l10n.t('CHECK_MIN_LENGTH', { FIELD: param, LENGTH: length });
    } else if (validation === 'isMax') {
        return l10n.t('CHECK_MAX_LENGTH', { FIELD: param, LENGTH: length });
    } else if (validation === 'isLength') {
        return l10n.t('CHECK_LENGTH', { FIELD: param, LENGTH: length });
    } else if (validation === 'isDateFormat') {
        return l10n.t('CHECK_DATE_FORMAT', { FIELD: param, FORMAT: length });
    } else if (validation === 'isEmail') {
        return l10n.t('INVALID_EMAIL', { FIELD: param });
    } else {
        return l10n.t('ERROR');
    }
};
validator.checkNegativeValue = (value) => {
    let response;
    if (+value < 0) {
        response = false;
    } else {
        response = true;
    }
    return response;
};

validator.checkExists = (value) => {
    let response;
    if (utils.empty(value)) {
        response = false;
    } else {
        response = true;
    }
    return response;
};
module.exports = validator;