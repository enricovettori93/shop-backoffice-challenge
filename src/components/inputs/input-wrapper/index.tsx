import {FieldError, Merge} from "react-hook-form";
import React from "react";

interface props {
    error?: FieldError | Merge<any, any>
    children?: React.ReactNode
    className?: string
}

const InputWrapper = ({error, className = "", children}: props) => {
    return (
        <div className={`field-wrapper ${className} ${error ? "field-wrapper--error" : ""}`}>
            {children}
            <small className="text-xs text-red-500 h-4">{error?.message}</small>
        </div>
    )
}

export default InputWrapper;
