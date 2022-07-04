import React, { ComponentType, forwardRef, useEffect } from "react";
import { useComponent, useValidationComponent } from "../hooks";
import { InputComponentType, ValidationComponentType } from "../models";

export const withValidation = <T extends InputComponentType = any>(
    Component: ComponentType<T>,
    displayName?: string
) => {
    const view = forwardRef((e: Omit<T, "componentId"> & Partial<ValidationComponentType>, ref: any) => {
        const {
            validators,
            value,
            onChange,
            onValidate,
            ...TProps
        } = e;
        const props = TProps as T;
        const { id, loaded } = useComponent();
        const { valid, messages, validate } = useValidationComponent(
            id,
            Array.isArray(validators) ? validators : []
        );

        useEffect(() => {
            loaded && validate(value, null);
        }, [loaded]);

        useEffect(() => {
            loaded && onValidate?.(valid, messages);
        }, [valid]);

        return <Component {...props}
            componentId={id}
            ref={ref}
            value={value}
            onChange={(newValue: any) => {
                validate(newValue, value);
                onChange(newValue);
            }}
        />
    });
    view.displayName = `${displayName ?? Component.displayName ?? "UnknownInput"}WithValidation`;
    return view;
}; 
