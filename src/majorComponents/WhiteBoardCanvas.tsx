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
    let startTool:boolean = true
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
                startAndEndSymbol(currentCoord, canvas)
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
                drawSymbol(lastCoordinate, currentCoord, "rectangle")
                break
            default:
                return
        }
    }

    // Subscription handler



    /************************************************************************************
     * Get Relative coordinates on current canvas even with zoom and zoom out 
     **********************************************************************************/

    const getRelativeCoordinate = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>): Coordinate | null => {
        if(canvas == null) return null;
        let boundingData = canvas.getBoundingClientRect()
        let startX: number = event.clientX - boundingData.left
        let startY: number = event.clientY - boundingData.top
        let heightGradient = canvas.height/canvas.offsetHeight
        let widthGradient = canvas.width/canvas.offsetWidth
        return {x: startX*widthGradient, y: startY*heightGradient}
    }

    /*************************************************************
     * Used of starting pen type tools and eraser
     ***************************************************************/

    const pointOnClick = (newCoordinate: Coordinate | null): void => {
        if(newCoordinate == null) return;
        if(startTool) {
            lastCoordinate = null
        }
        startTool = !startTool
        if(newCoordinate.x < 0 || newCoordinate.y < 0) return;
        lastCoordinate = newCoordinate
        singlePointer(newCoordinate)
    }


    const singlePointer = (coordinate: Coordinate): void => {
        if(context) {
            context.fillStyle = fillColor
            context.beginPath()
            if(!startTool) {
            context.arc(coordinate.x, coordinate.y, strokeWidth/2, 0, 2*Math.PI)
            }
            context.fill()
        }
    }

    const drawLine = (coordinate: Coordinate): void => {
        if(context) {
            if(coordinate === null || startTool) return
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

    /**************************************************************************
     * Generic way to draw any shape to canvas
     **************************************************************************/

    const drawSymbol = (firstCoordinate: Coordinate | null, secondCoordinate: Coordinate | null, shapeType: string): void => {
        if(firstCoordinate!== null && secondCoordinate !== null && copyContext && !startTool) {
            if(copyCanvas && canvas) {
            copyContext.clearRect(0,0, copyCanvas?.width, copyCanvas?.height)
            copyContext.strokeStyle = fillColor
            }
            copyContext.beginPath()
            copyContext.lineWidth = strokeWidth
            switch(shapeType) {
                case "rectangle":
                    drawRectangle(copyContext, firstCoordinate,secondCoordinate)
                    break
                default:
                    drawRectangle(copyContext, firstCoordinate,secondCoordinate)
            }

            rectCoordinate1 = firstCoordinate
            rectCoordinate2 = secondCoordinate
            copyContext.stroke()
        }
    }

    const drawRectangle = (copyContext: CanvasRenderingContext2D, firstCoordinate: Coordinate, secondCoordinate: Coordinate) => {
        copyContext.rect(firstCoordinate.x, firstCoordinate.y, secondCoordinate.x-firstCoordinate.x, secondCoordinate.y-firstCoordinate.y)
    }   


    const startAndEndSymbol = (startCoordinate: Coordinate | null, mainCanvas?: HTMLCanvasElement | null): void => {
        if(mainCanvas && copyCanvas) {
            setCopyCanvasAndGetContext(mainCanvas, copyCanvas)
            if(copyContext) showOrHideCopyCanvas(copyCanvas)
        }
        
        if(startCoordinate == null) return
        if(startTool) {
            lastCoordinate = startCoordinate
        } else {
            lastCoordinate = null
            if(context) copyCanvasPath(context)
        }
        startTool = !startTool
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

    /**********************************************************
     * Copies shape to main canvas
     *************************************************************/

    const copyCanvasPath = (mainContext: CanvasRenderingContext2D) => {
        if(rectCoordinate1 !== null && rectCoordinate2 !== null) {
        mainContext.beginPath()
        mainContext.strokeStyle = fillColor 
        switch(currentTool) {
            case "rectangle":
                mainContext.rect(rectCoordinate1.x, rectCoordinate1.y, rectCoordinate2.x-rectCoordinate1.x, rectCoordinate2.y-rectCoordinate1.y)
                break
            default:
                return
                
        }
        mainContext.stroke() 
        }
    }

    /***********************************************************************************
     * Handles the initialiatin of canvas and copy canvas
     ********************************************************************************/

    const handleCanvasInitialization = () => {
        canvas = refToCanvas.current
        copyCanvas = refToCopyCanvas.current
        if(canvas) {
            canvas.style.width = '100%'
            canvas.style.height = '100%'
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
            context = canvas.getContext('2d')
            if(copyCanvas ) {
                copyCanvas.width = canvas.offsetWidth
                copyCanvas.height = canvas.offsetHeight
                copyContext = copyCanvas.getContext('2d')
            }
        }
    }

    /***********************************************************************************
     * Handles the subscription to the redux store
     ********************************************************************************/

    const handleSubscription = () => {
        const currentState = store.getState()
        if(currentState) {  
            currentTool = currentState.writeTool.toolName
            fillColor = currentState.writeTool.toolColor
            if(currentState.widthChange) strokeWidth = parseInt(currentState.widthChange)
            if(context) {
                context.lineWidth = strokeWidth
                context.strokeStyle = fillColor
            }
        }
        startTool = true
    }

    useEffect(() => {
        handleCanvasInitialization()
        const unsubscribe = store.subscribe(() => {
            handleSubscription()
        })
    }, [pointOnClick, singlePointer])

    return(
        <>
            <canvas className="main-canvas" ref={refToCanvas} onClick={(e) => handleOnClick(e)} onMouseMove={(e) => handleMouseMove(e)}  ></canvas>
            <canvas className="copy-canvas" ref={refToCopyCanvas} style={{"display":"none"}} onClick={(e) => handleOnClick(e)} onMouseMove={(e) => handleMouseMove(e)}></canvas>
        </>
    )
}