import _ from "lodash";
import { useContext, useEffect, useRef, useState } from "react";
import { ValidationContext, ValidatorType } from "../models"

export const useComponent = () => {
    const id = useRef(_.uniqueId());
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        setLoaded(true);
        return () => setLoaded(false);
    }, []);
    return ({ id: id.current, loaded });
};

export const useValidationComponent = (id: string, validators: ValidatorType[]) => {
    const { state, dispatch } = useContext(ValidationContext);

    useEffect(() => dispatch("register", { id, validators }), [id, validators]);

    const valid = state.components[id]?.valid === true;

    return {
        valid,
        validate: (value: any, oldValue: any) => dispatch("validate", { id, newValue: value, oldValue }),
    }
};