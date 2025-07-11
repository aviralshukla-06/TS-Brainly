// iconSize.ts
export type Size = "sm" | "md" | "lg";

export interface SizeStyles {
    size: Size;
}

export const sizeClasses: Record<Size, string> = {
    sm: "w-5 h-5 text-4", // You can customize width/height or padding
    md: "w-6 h-6",
    lg: "w-8 h-8",
};
