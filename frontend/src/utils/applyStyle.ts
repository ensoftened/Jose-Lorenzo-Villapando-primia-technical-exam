import { CSSProperties } from "react";

const applyStyle = (
    currentStyle : any,
    newStyle : CSSProperties
) => {
    Object.keys(newStyle).forEach((key) => {
        const cssPropertyKey = key as keyof CSSProperties
        currentStyle[key] = newStyle[cssPropertyKey]
    });
}

export default applyStyle