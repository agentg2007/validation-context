const writeLog = (
    type: "default" | "warn" | "error" = "default",
    ...e: any[]
) => {
    const format = `color: white;background: blue;font-weight: bold;font-size: 20px;`;
    if (type === "error") {
        console.error("%cNthity-Validator", format, e);
    } else if (type === "warn") {
        console.warn("%cNthity-Validator", format, e);
    } else {
        console.log("%cNthity-Validator", format, e);
    }
}
export const log = (...e: any[]) => writeLog("default", e);
export const error = (...e: any[]) => writeLog("error", e);
export const warn = (...e: any[]) => writeLog("warn", e);