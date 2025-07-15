import type { ReactElement } from "react";

// type Variants = "primary" | "secondary";

interface buttonProps {
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick: () => void;
}

const variantStyles = {
    "primary": "bg-purple-600 text-white",
    "secondary": "bg-purple-300 text-white"
}

const sizeStyles = {
    "sm": "px-2 py-1 text-sm",
    "md": "px-4 py-1 text-xl",
    "lg": "px-6 py-2 text-lg",
}

const defaultStyles = "rounded-md flex item-center w-52  h-10 align-center"

export const Button = (props: buttonProps) => {
    return <button className={`${variantStyles[props.variant]} ${sizeStyles[props.size]} ${defaultStyles}`}>
        {props.startIcon ? <div className="p-1">{props.startIcon}</div> : null}  {props.text}</button>
}

{/* <Button variant="primary" size="lg" text="Add"  onClick={() => { }} /> */ }