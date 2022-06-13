import React, { ComponentType, forwardRef, useEffect } from "react";
import { Utils } from "..";
import { useComponent, useValidationComponent } from "../hooks";
import { InputComponentType, ValidationComponentType } from "../models";

export const withValidation = <T extends InputComponentType = any>(
    Component: ComponentType<T>,
    displayName?: string
) => {
    const view = forwardRef((e: T & Partial<ValidationComponentType>, ref: any) => {
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
        const { valid, css, validate } = useValidationComponent(
            id,
            Array.isArray(validators) ? validators : []
        );

        useEffect(() => {
            loaded && validate(value, null);
        }, [loaded]);

        useEffect(() => {
            loaded && onValidate?.(valid);
        }, [valid]);

        return <Component {...props}
            ref={ref}
            className={[className, valid === true ? null : css]
                .filter(i => Utils.notEmptyString(i))
                .join(" ")}
            value={value}
            onChange={(newValue: any) => {
                validate(newValue, value);
                onChange(newValue);
            }}
        />
    });
    view.displayName = `${displayName ?? Component.displayName}WithValidation`;
    return view;
}; 
