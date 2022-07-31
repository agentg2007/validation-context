import _ from "lodash";
import { useContext, useEffect, useRef, useState } from "react";
import { uuid } from "../helpers";
import { ValidationContext, ValidatorType } from "../models";

export const useComponent = () => {
    const id = useRef(uuid());
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
        return () => setLoaded(false);
    }, []);
    return ({ id: id.current, loaded });
};

export const useValidationComponent = (id: string, validators: ValidatorType[]) => {
    const { state, dispatch } = useContext(ValidationContext);

    useEffect(() => {
        if (!_.isEqual(validators, state.components[id]?.validators)) {
            dispatch("register", { id, validators })
        }
    }, [id, validators]);

    const valid = state.components[id]?.valid === true;

    return {
        valid,
        messages: state.components[id]?.messages,
        validate: (value: any, oldValue: any) => dispatch("validate", { id, newValue: value, oldValue }),
    }
};

export const useValidationResult = () => {
    const { state } = useContext(ValidationContext);
    return ({
        valid: state.valid,
        messages: state.messages
    })
};

export const useValidationState = (componentId: string) => {
    const { state } = useContext(ValidationContext);
    return { ...state.components[componentId] };
};