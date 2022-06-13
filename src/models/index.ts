import { Dictionary } from "lodash";
import { createContext } from "react";

export type InputComponentType<T = any> = {
    className?: string;
    value: T;
    onChange(newValue: T): void;
};

export type ValidatorType = {
    name: string;
    message?: string;
    configuration?: any;
};

export type ValidatorMethodResult = {
    valid: boolean;
    message?: ValidationMessage;
};

export type ValidatorMethod = (
    newValue: any,
    oldValue: any,
    configuration: any
) => ValidatorMethodResult;

export type ValidationComponentType = {
    validators: ValidatorType[];
    onValidate(valid: boolean): void;
};

export type ValidationMessage = {
    type: "info" | "warning" | "error";
    message: string;
};

export type ValidationContextClasses = {
    error: string;
}

export type ValidationContextState = {
    valid: boolean;
    messages: ValidationMessage[];
    components: Dictionary<{
        valid: boolean;
        validators: ValidatorType[];
        messages: ValidationMessage[];
    }>;
    classes: Partial<ValidationContextClasses>;
    validators: Dictionary<ValidatorMethod>;
};

export type ValidationContextActions = "clear"
    | "init"
    | "register"
    | "validate";

export type ValidationContextType = {
    state: ValidationContextState;
    dispatch(action: ValidationContextActions, payload?: any): void;
};

export const ValidationContextInitialState: ValidationContextState = {
    valid: true,
    messages: [],
    components: {},
    classes: {
        error: "error"
    },
    validators: {},
};

export const ValidationContext = createContext<ValidationContextType>({
    state: ValidationContextInitialState,
    dispatch: () => { },
});
