import { ComponentType, forwardRef, useEffect } from "react";
import { log } from "../helpers";
import { useComponent, useValidationComponent } from "../hooks";
import { InputComponentType, ValidationComponentType } from "../models";

export const withValidation = <T extends InputComponentType = any>(
    Component: ComponentType<T>,
    displayName?: string
) => {
    const view = forwardRef((e: T & Partial<ValidationComponentType>, ref) => {
        const {
            className,
            validators,
            value,
            onChange,
            onValidate,
            ...TProps
        } = e;
        const props = TProps as T;
        const { id, loaded } = useComponent();
        const { valid, validate } = useValidationComponent(
            id,
            Array.isArray(validators) ? validators : []
        );

        useEffect(() => {
            loaded === true && validate(value, null);
        }, [loaded]);
        
        useEffect(() => {
            onValidate?.(valid);
            log(`Component#${id} validated.`, { valid, OrigValue: value });
        }, [valid]);

        return <Component {...props}
            ref={ref}
            className={`${className} ${valid === true ? "" : "error"}`}
            value={value}
            onChange={newValue => {
                validate(newValue, value);
                onChange(newValue);
            }}
        />
    });
    view.displayName = `${displayName ?? Component.displayName}WithValidation`;
    return view;
}; 
