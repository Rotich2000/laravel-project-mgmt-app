import { forwardRef, useRef } from "react";

export default forwardRef(function SelectInput(
    { className = "", children, isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    return (
        <select
            {...props}
            className={
                "border-gray-300 focus:border-gray-300 focus:ring-gray-200 rounded-md shadow-sm " +
                className
            }
            ref={input}
        >
            {children}
        </select>
    );
});
