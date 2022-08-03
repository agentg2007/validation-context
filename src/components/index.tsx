import _, { Dictionary } from "lodash";
import React, { ReactNode, Reducer, useEffect, useReducer } from "react";
import { log } from "../helpers";
import {
    ValidationContext,
    ValidationContextActions,
    ValidationContextInitialState,
    ValidationContextState,
    ValidationMessage,
    ValidatorMethod
} from "../models";

type ValidationContextProviderProps = {
    validators: Dictionary<ValidatorMethod>;
    children: ReactNode | ReactNode[];
}
export const ValidationContextProvider = ({
    children,
    validators
}: ValidationContextProviderProps) => {
    const [state, dispatch] = useReducer(
        ValidationContextProviderReducer,
        ValidationContextInitialState
    );
    useEffect(() => dispatch({
        type: "init",
        payload: { validators }
    }), []);
    return <ValidationContext.Provider
        value={{
            state,
            dispatch: (type, payload) => dispatch({ type, payload })
        }}
        children={children}
    />
};
ValidationContextProvider.displayName = "ValidationContextProvider";

type ReducerActionType = {
    type: ValidationContextActions,
    payload?: any;
}
const ValidationContextProviderReducer: Reducer<
    ValidationContextState,
    ReducerActionType
> = (state, { type, payload }) => {
    const upst = (newState: Partial<ValidationContextState>) => ({ ...state, ...newState });
    switch (type) {
        case "clear":
            return upst({
                valid: true,
                messages: [],
            });
        case "init": {
            const { validators } = payload;
            return upst({
                valid: true,
                messages: [],
                validators,
            });
        };
        case "register": {
            const { id, validators } = payload;
            return upst({
                components: {
                    ...state.components,
                    [id]: {
                        valid: true,
                        validators,
                        messages: [],
                    },
                },
            });
        };
        case "validate": {
            const { id, newValue, oldValue } = payload;
            const component = state.components[id];
            if (!_.isNil(component)) {
                log(`Validating component#${id}.`, { newValue, oldValue }, ...component.validators);
                component.valid = true;
                component.messages = [];
                Array.isArray(component.validators) && component.validators
                    .filter(c => _.isFunction(state.validators[c.name]))
                    .forEach(({ name, ...c }) => {
                        const result = state.validators[name](newValue, oldValue, c);
                        component.valid = component.valid && result.valid === true;
                        result.valid === false
                            && !_.isNil(result.message)
                            && component.messages.push({
                                type: result.message.type,
                                message: c.message ?? result.message.message ?? "Invalid value!"
                            });
                    });
                const messages: ValidationMessage[] = [];
                _.toArray(state.components).filter(i => i.valid === false).forEach(i => {
                    i.messages.forEach(m => messages.push(m));
                });
                return upst({
                    valid: _.toArray(state.components).map(i => i.valid).every(i => i === true),
                    messages,
                    components: {
                        ...state.components,
                        [id]: component
                    }
                })
            } else {
                return state;
            }
        };
        default:
            return state;
    }
}; 