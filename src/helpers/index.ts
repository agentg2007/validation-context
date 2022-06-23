import _ from "lodash";

const writeLog = (
    type: "default" | "warn" | "error" = "default",
    ...e: any[]
) => {
    const header = "%cNthity-Validator"
    const format = (color: string) => `color: ${color};background: #0390fc;font-weight: bold;font-size: 20px; padding: 4px 8px; border-radius: 4px;`;
    if (type === "error") {
        console.error(header, format("red"), ...e);
    } else if (type === "warn") {
        console.warn(header, format("#fcd303"), ...e);
    } else {
        console.log(header, format("white"), ...e);
    }
}
export const log = (...e: any) => writeLog("default", ...e);
export const error = (...e: any[]) => writeLog("error", ...e);
export const warn = (...e: any[]) => writeLog("warn", ...e);

export const between = (value: any, min: any, max: any) => value > min && value < max;
export const notEmptyString = (value: any): value is string => _.isString(value) && value.trim().length > 0;

export const uuid = () => {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-yxxx-yxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};
export const isGuid = (value: any): value is string => {
    return notEmptyString(value) && /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i.test(value.toLowerCase());
};