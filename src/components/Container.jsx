import { cloneElement } from "react"

const style = {
    width: '100%',
    maxWidth: 2000,
    marginLeft: 'auto',
    marginRight: 'auto',
}

export default ({children, renderer=<div />})=>{
    const newElement = cloneElement(renderer, {
        style: Object.assign({}, renderer.props.style, style),
        children,
    })

    //console.log(newElement)
    return newElement
}