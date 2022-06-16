import _ from "lodash";
import { between, notEmptyString } from "../helpers";
import { ValidatorMethod, ValidatorMethodResult } from "../models";

const result = (
    valid: boolean,
    message: string,
    type: "info" | "warning" | "error" = "error"
): ValidatorMethodResult => ({ valid, message: valid ? undefined : { type, message } });

export const RequiredFieldValidator: ValidatorMethod = (value, oldValue, {
    type,
    message = "Value Required!"
}) => {
    const validate = () => {
        switch (type) {
            case "string":
                return notEmptyString(value);
            case "number":
                return !isNaN(parseFloat(value));
            case "datetime":
                return !isNaN(Date.parse(value));
            case "boolean":
                return value === true;
            case "list":
                return Array.isArray(value) && value.length > 0;
            default:
                return !_.isNil(value);
        }
    };
    return result(!_.isNil(value) && validate(), message);
};

export const NumberInputFieldValidator: ValidatorMethod = (value, oldValue, {
    message = "Value must be a number!"
}) => result(!isNaN(Number(value)), message);

export const NumberRangeFieldValidator: ValidatorMethod = (value, oldValue, {
    min = Number.MIN_SAFE_INTEGER,
    max = Number.MAX_SAFE_INTEGER,
    message = "Invalid value range!"
}) => {
    const numVal = Number(value);
    return result(isNaN(numVal) || between(numVal, min, max), message);
};

export const DateTimeRangeFieldValidator: ValidatorMethod = (value, oldValue, {
    min = new Date(0, 0, 0),
    max = new Date(99999, 12, 31),
    message = "Invalid date range value!"
}) => result(isNaN(Date.parse(value)) || between(new Date(Date.parse(value)), min, max), message);

export const EmailFieldValidator: ValidatorMethod = (value, oldValue, {
    message = "Invalid email value!"
}) => {
    const valid = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i.test(value);
    return result(!notEmptyString(value) || valid, message);
};

export const UrlFieldValidator: ValidatorMethod = (value, oldValue, {
    message = "Invalid url value!"
}) => {
    var pattern = new RegExp('^(http|https)?:\\/\\/?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
    return result(!notEmptyString(value) || pattern.test(value), message);
};

export const StringLengthFieldValidator: ValidatorMethod = (value, oldValue, {
    min = 0,
    max = Number.MAX_SAFE_INTEGER,
    message = "Invalid character count!"
}) => result(!notEmptyString(value) || between(value.length, min, max), message);

export const SelectedItemCountFieldValidator: ValidatorMethod = (value, oldValue, {
    min = 1,
    max = Number.MAX_SAFE_INTEGER,
    message = `Please select at least ${min} items.`
}) => result(!Array.isArray(value) || between(value.length, min, max), message);

