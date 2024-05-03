import { forwardRef, useEffect, useRef } from "react";

export default forwardRef(function TextAreaInput(
    { className = "", isFocused = false, children, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    return (
        <textarea
            {...props}
            className={
                "border-gray-300 focus:border-gray-300 focus:ring-gray-200 rounded-md shadow-sm " +
                className
            }
            ref={input}
        >
            {children}
        </textarea>
    );
});
