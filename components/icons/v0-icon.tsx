import * as React from "react";
import {IconProps} from "@/types";
import iconPng from "./icon.png";

const v0Icon = ({size, className, ...props}: IconProps) => (
    <img
        src={iconPng.src}
        alt="v0 icon"
        height={size}
        width={size}
        className={className}
        {...props}
    />
);
export default v0Icon;
