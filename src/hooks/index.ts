import { useContext, useEffect, useRef, useState } from "react";
import { ValidationContext, ValidatorType } from "../models"
import { v4 as uuid } from "uuid";

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

    useEffect(() => dispatch("register", { id, validators }), [id, validators]);

    const valid = state.components[id]?.valid === true;

    return {
        valid,
        validate: (value: any) => dispatch("validate", { id, value }),
    }
};