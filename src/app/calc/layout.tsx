import {PropsWithChildren, Suspense} from "react";

export default function (props: PropsWithChildren){
    return (<Suspense>
        {props.children}
    </Suspense>)
}