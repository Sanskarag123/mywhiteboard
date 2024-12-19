import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { EventEmitter } from "stream";
import store from "../store/store";
interface Coordinate {
    x: number,
    y: number
}

export default function WhiteBoardCanvas(): JSX.Element {
    const refToCanvas = useRef<HTMLCanvasElement>(null)
    const refToCopyCanvas = useRef<HTMLCanvasElement>(null)
    let lastCoordinate: Coordinate | null = null;
    let startLine:boolean = true
    let canvas: HTMLCanvasElement | null
    let copyCanvas: HTMLCanvasElement | null
    let context: CanvasRenderingContext2D | null
    let copyContext: CanvasRenderingContext2D | null
    let currentTool: string = "pen"
    let fillColor: string = "#000000"
    let rectCoordinate1: Coordinate | null = null
    let rectCoordinate2: Coordinate | null = null
    let strokeWidth: number = 2


    // Mouse Handlers

    const handleOnClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const currentCoord: Coordinate | null = getRelativeCoordinate(event)
        switch(currentTool) {
            case "pen":
            case "eraser":
                pointOnClick(currentCoord)
                break
            case "rectangle":
                startAndEndRectangle(currentCoord, canvas)
                break
            default:
                pointOnClick(currentCoord)

        }
    }

    const handleMouseMove = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const currentCoord: Coordinate | null = getRelativeCoordinate(event)
        switch(currentTool) {
            case "pen":
            case "eraser":
                onClickdrawLine(event)
                break
            case "rectangle":
                drawRectangle(lastCoordinate, currentCoord)
                break
            default:
                return
        }
    }

    // Subscription handler

    const handleSubscription = () => {
        
        if(store.getState().writeTool) {
            
            const currentState = store.getState()
            console.log(currentState)
            currentTool = currentState.writeTool.toolName
            fillColor = currentState.writeTool.toolColor
            if(currentState.widthChange) {
            strokeWidth = parseInt(currentState.widthChange)
            if(context) {
            console.log(strokeWidth)
            context.lineWidth = strokeWidth
            }
            }
            if(context) {
            context.strokeStyle = fillColor
            }
        }
        startLine = true
    }

    // Free draw

    const getRelativeCoordinate = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>): Coordinate | null => {
        if(canvas == null) return null;
        let boundingData = canvas.getBoundingClientRect()
        let startX: number = event.clientX - boundingData.left
        let startY: number = event.clientY - boundingData.top
        let heightGradient = canvas.height/canvas.offsetHeight
        let widthGradient = canvas.width/canvas.offsetWidth
        return {x: startX*widthGradient, y: startY*heightGradient}
    }

    const pointOnClick = (newCoordinate: Coordinate | null): void => {
        if(newCoordinate == null) return;
        if(startLine) {
            lastCoordinate = null
        }
        startLine = !startLine
        if(newCoordinate.x < 0 || newCoordinate.y < 0) return;
        lastCoordinate = newCoordinate
        singlePointer(newCoordinate)
    }


    const singlePointer = (coordinate: Coordinate): void => {
        if(context) {
            context.fillStyle = fillColor
            context.beginPath()
            if(!startLine) {
            context.arc(coordinate.x, coordinate.y, strokeWidth/2, 0, 2*Math.PI)
            }
            context.fill()
        }
    }

    const drawLine = (coordinate: Coordinate): void => {
        if(context) {
            if(coordinate === null || startLine) return
            context.beginPath()
            context.strokeStyle = fillColor 
            context.lineWidth = strokeWidth
            if(lastCoordinate === null) {
                lastCoordinate = coordinate
            } 
            context.lineTo(lastCoordinate.x, lastCoordinate.y);
            context.lineTo(coordinate.x, coordinate.y)
            context.lineCap = "round"
            context.stroke()
            lastCoordinate = coordinate

        }
    }

    const onClickdrawLine = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void => {
        if(context) {
            let coordinate: Coordinate | null = getRelativeCoordinate(event) 
            if(coordinate == null) return
            drawLine(coordinate)
        }
    }

    // Rectangle functions

    const drawRectangle = (firstCoordinate: Coordinate | null, secondCoordinate: Coordinate | null): void => {
        if(firstCoordinate!== null && secondCoordinate !== null && copyContext && !startLine) {
            if(copyCanvas && canvas) {
            copyContext.clearRect(0,0, copyCanvas?.width, copyCanvas?.height)
            copyCanvas.style.width = canvas.offsetWidth + "px"
            copyCanvas.style.height = canvas.offsetHeight + "px"
            }
            
            copyContext.beginPath()
            copyContext.lineWidth = strokeWidth
            copyContext.rect(firstCoordinate.x, firstCoordinate.y, secondCoordinate.x-firstCoordinate.x, secondCoordinate.y-firstCoordinate.y)
            rectCoordinate1 = firstCoordinate
            rectCoordinate2 = secondCoordinate
            copyContext.stroke()
        }
    }

    const startAndEndRectangle = (startCoordinate: Coordinate | null, mainCanvas?: HTMLCanvasElement | null): void => {
        copyCanvas = refToCopyCanvas.current
        if(mainCanvas && copyCanvas) {
            setCopyCanvasAndGetContext(mainCanvas, copyCanvas)
            if(copyContext) showOrHideCopyCanvas(copyCanvas)
        }
        
        if(startCoordinate == null) return
        if(startLine) {
            lastCoordinate = startCoordinate
        } else {
            lastCoordinate = null
            if(context) copyCanvasPath(context)
        }
        startLine = !startLine
    }

    const showOrHideCopyCanvas = (copyCanvas: HTMLCanvasElement) => {
        if(copyCanvas.style.display === "none") copyCanvas.style.display = "block"
        else copyCanvas.style.display = "none"
    }

    const setCopyCanvasAndGetContext = (mainCanvas: HTMLCanvasElement, copyCanvas: HTMLCanvasElement) => {
        copyCanvas.width = mainCanvas.width
        copyCanvas.height = mainCanvas.height
        copyContext = copyCanvas.getContext('2d')
    }

    const copyCanvasPath = (mainContext: CanvasRenderingContext2D) => {
        if(rectCoordinate1 !== null && rectCoordinate2 !== null) {
        mainContext.beginPath()
        mainContext.strokeStyle = fillColor  
        mainContext.rect(rectCoordinate1.x, rectCoordinate1.y, rectCoordinate2.x-rectCoordinate1.x, rectCoordinate2.y-rectCoordinate1.y)
        mainContext.stroke() 
        }
    }

    useEffect(() => {
        canvas = refToCanvas.current;
        const unsubscribe = store.subscribe(() => {
            handleSubscription()
        })
        if(canvas) {
        canvas.style.width = '100%'
        canvas.style.height = '100%'
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
        context = canvas.getContext('2d')
        }
    }, [pointOnClick, singlePointer])

    return(
        <>
            <canvas className="main-canvas" ref={refToCanvas} onClick={(e) => handleOnClick(e)} onMouseMove={(e) => handleMouseMove(e)}  ></canvas>
            <canvas className="copy-canvas" ref={refToCopyCanvas} style={{"display":"none"}} onClick={(e) => handleOnClick(e)} onMouseMove={(e) => handleMouseMove(e)}></canvas>
        </>
    )
}