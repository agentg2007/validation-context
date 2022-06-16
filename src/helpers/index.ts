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