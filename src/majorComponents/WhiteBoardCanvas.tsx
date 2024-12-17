import React, { useEffect, useRef, useState } from "react";
import { EventEmitter } from "stream";

interface Coordinate {
    x: number,
    y: number
}

export default function WhiteBoardCanvas(): JSX.Element {
    const refToCanvas = useRef<HTMLCanvasElement>(null)
    const [lastCoord, setLastCoord] = useState<Coordinate>({x:0, y:0})
    const [startLine, setStartLine] = useState<boolean>(true)
    let canvas: HTMLCanvasElement | null
    let context: CanvasRenderingContext2D | null
    const pointOnHover = ( event: React.MouseEvent<HTMLCanvasElement, MouseEvent> ) => {
        const target: EventTarget | null = event.target
        if(canvas == null) return
        let boudingData = canvas.getBoundingClientRect()
        let startX: number = event.clientX - boudingData.left
        let startY: number = event.clientY - boudingData.top
        if(startX < 0 || startY < 0) return;
        let startCoordinates: Coordinate
        if(lastCoord == undefined) {
            console.log("first")
            startCoordinates = {x: startX, y: startY}
        } else {
            console.log("Second")
            startCoordinates = lastCoord
        }
        if(startLine)
        singlePointer(startX, startY)
    }

    const pointOnClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        setStartLine(!startLine) 
        pointOnHover(event)
    }


    const singlePointer = (x: number, y: number) => {
        console.log(x + " " + y)
        if(context) {
            
            context.fillStyle = '#000000'
            context.beginPath()
            context.arc(x, y, 3, 0, 2*Math.PI)
            context.fill()
            setStartLine(true)
            
        }
    }



    useEffect(() => {
        canvas = refToCanvas.current;
        if(canvas) {
        let width = canvas.width
        let height = canvas.height
        
        canvas.setAttribute('width', (canvas.width*window.devicePixelRatio)+'')
        canvas.setAttribute('height', (canvas.height*window.devicePixelRatio)+'')
        canvas.setAttribute('style', 'width:'+100%+'px; height:'+100%+'px;')
        context = canvas.getContext('2d')
        context?.scale(window.devicePixelRatio, window.devicePixelRatio)
        }
    }, [pointOnClick, pointOnHover])

    return(
        <>
            <canvas className="main-canvas" ref={refToCanvas} onClick={(e) => pointOnClick(e)} onMouseOver={(e) => pointOnHover(e)}></canvas>
        </>
    )
}