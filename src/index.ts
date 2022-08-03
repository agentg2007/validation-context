import { ValidationContextProvider } from "./components";
import { error, log, notEmptyString, warn } from "./helpers";

export { withValidation } from "./hoc";
export { useComponentValidationState, useValidationResult } from "./hooks";
export {
    InputComponentType,
    ValidatorMethod
} from "./models";
export * as Validators from "./validators";

export const Utils = { log, error, warn, notEmptyString };

export default ValidationContextProvider;