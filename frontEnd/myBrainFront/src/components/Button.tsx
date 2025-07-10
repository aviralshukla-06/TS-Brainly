import type { ReactElement } from "react";

type Variants = "primary" | "secondary";

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
    "sm": "px-2 py-1",
    "md": "px-4 py-1",
    "lg": "px-6 py-2",
}

const defaultStyles = "rounded-md"

export const Button = (props: buttonProps) => {
    return <button className={`${variantStyles[props.variant]} ${sizeStyles[props.size]} ${defaultStyles} `}>{props.text}</button>
}

{/* <Button variant="primary" size="lg" text="Add"  onClick={() => { }} /> */ }