import { PropsWithChildren } from "react"
import style from "./component.module.css"
import {AppComponentProps} from "@/common";

export type IconButtonProps = AppComponentProps & PropsWithChildren & {
    onClick?: () => void
}

export const IconButton = (props: IconButtonProps) => {
    return (
        <button className={`${style.button} ${props.className}`} style={props.sx} onClick={props.onClick}>
            {props.children}
        </button>
    );
}
