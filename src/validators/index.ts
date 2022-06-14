import _ from "lodash";
import { notEmptyString } from "../helpers";
import { ValidatorMethod, ValidatorMethodResult } from "../models";

const result = (
    valid: boolean,
    message: string,
    type: "info" | "warning" | "error" = "error"
): ValidatorMethodResult => ({
    valid, message: valid ? undefined : { type, message }
});

export const RequiredFieldValidator: ValidatorMethod = (value, oldValue, { type } = {}) => {
    const validate = () => {
        switch (type) {
            case "string":
                return notEmptyString(value);
            case "number":
                return !isNaN(Number(value));
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
    return result(!_.isNil(value) && validate(), "Value Required!");
};
export const NumberFieldValidator: ValidatorMethod = value => {
    const valid = _.isNil(value) || !isNaN(Number(value));
    return result(valid, "Value is not a number!");
};
export const DateTimeFieldValidator: ValidatorMethod = value => {
    const valid = _.isNil(value) || !isNaN(Date.parse(value));
    return result(valid, "Invalid date value!");
};
export const EmailFieldValidator: ValidatorMethod = value => {
    const valid = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i.test(value);
    return result(!notEmptyString(value) || valid, "Invalid email value!");
};
export const UrlFieldValidator: ValidatorMethod = value => {
    var pattern = new RegExp('^(http|https)?:\\/\\/?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?');
    const valid = !notEmptyString(value) || pattern.test(value);
    return result(valid, "Invalid url value!");
};
export const SelectedItemCountFieldValidator: ValidatorMethod = (value, oldValue, { count = 1 }) => {
    const valid = Array.isArray(value) && value.length >= count;
    return result(valid, `Please select ${count} items.`)
}