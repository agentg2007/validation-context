import { Dictionary } from "lodash";
import { createContext } from "react";

export type InputComponentType<T = any> = {
    className?: string;
    componentId?: string;
    value: T;
    onChange(newValue: T): void;
};

export type ValidatorType = {
    name: string;
    message?: string;
};

export type ValidatorMethodResult = {
    valid: boolean;
    message?: ValidationMessage;
};

export type ValidatorMethod = (
    newValue: any,
    oldValue: any,
    e: any
) => ValidatorMethodResult;

export type ValidationComponentType = {
    validators: (ValidatorType & any)[];
    onValidate(valid: boolean, messages: ValidationMessage[]): void;
};

export type ValidationMessage = {
    type: "info" | "warning" | "error";
    message: string;
};

export type ValidationContextClasses = {
    error: string;
};

export type ValidationContextState = {
    valid: boolean;
    messages: ValidationMessage[];
    components: Dictionary<{
        valid: boolean;
        validators: ValidatorType[];
        messages: ValidationMessage[];
    }>;
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
    components: {},
    messages: [],
    valid: true,
    validators: {},
};

export const ValidationContext = createContext<ValidationContextType>({
    state: ValidationContextInitialState,
    dispatch: () => { },
});
