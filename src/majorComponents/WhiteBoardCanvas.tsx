import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import { EventEmitter } from "stream";

interface Coordinate {
    x: number,
    y: number
}

export default function WhiteBoardCanvas(): JSX.Element {
    const refToCanvas = useRef<HTMLCanvasElement>(null)
    let lastCoordinate: Coordinate | null = null;
    let startLine:boolean = true
    let canvas: HTMLCanvasElement | null
    let context: CanvasRenderingContext2D | null
    const mouseWidth: number = 2
    const pointOnHover = ( newCoordinate: Coordinate) => {
        singlePointer(newCoordinate)
    }

    const getRelativeCoordinate = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>): Coordinate | null => {
        if(canvas == null) return null;
        let boudingData = canvas.getBoundingClientRect()
        let startX: number = event.clientX - boudingData.left
        let startY: number = event.clientY - boudingData.top
        return {x: startX, y: startY}
    }

    const pointOnClick = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void => {
        if(startLine) {
            lastCoordinate = null
        }
        startLine = !startLine
        const newCoordinate: Coordinate | null = getRelativeCoordinate(event)
        if(newCoordinate == null) return;
        if(newCoordinate.x < 0 || newCoordinate.y < 0) return;
        lastCoordinate = newCoordinate
        pointOnHover(newCoordinate)
    }


    const singlePointer = (coordinate: Coordinate): void => {
        if(context) {
            context.fillStyle = '#000000'
            context.beginPath()
            if(!startLine) {
            context.arc(coordinate.x, coordinate.y, mouseWidth/2, 0, 2*Math.PI)
            }
            context.fill()
        }
    }

    const drawLine = (coordinate: Coordinate): void => {
        if(context) {
            if(coordinate === null || startLine) return
            context.beginPath()
            context.lineWidth = mouseWidth
            if(lastCoordinate === null) {
                context.lineTo(coordinate.x, coordinate.y)
                lastCoordinate = coordinate
            } 
            context.lineTo(lastCoordinate.x, lastCoordinate.y);
            context.lineTo(coordinate.x, coordinate.y)
            lastCoordinate = coordinate
            context.stroke();
        }
    }

    const onClickdrawLine = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>): void => {
        if(context) {
            let coordinate: Coordinate | null = getRelativeCoordinate(event) 
            if(coordinate == null) return
            drawLine(coordinate)
        }
    }



    useEffect(() => {
        canvas = refToCanvas.current;
        if(canvas) {
        canvas.style.width = '100%'
        canvas.style.height = '100%'
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight
        context = canvas.getContext('2d')
        }
    }, [pointOnClick, pointOnHover])

    return(
        <>
            <canvas className="main-canvas" ref={refToCanvas} onClick={(e) => pointOnClick(e)} onMouseMove={(e) => onClickdrawLine(e)}  ></canvas>
        </>
    )
}