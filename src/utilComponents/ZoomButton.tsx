import React from "react";

export default function ZoomButton() {
    const onAdd = () => {
            const canvas: HTMLCollectionOf<Element> = document.getElementsByClassName("main-canvas")
            const copyCanvas: HTMLCollectionOf<Element> = document.getElementsByClassName("copy-canvas")

            if(canvas.length === 1) {
                const mainCanvas: HTMLCanvasElement = canvas.item(0) as HTMLCanvasElement
                const copyMainCanvas: HTMLCanvasElement = copyCanvas.item(0) as HTMLCanvasElement
                
                const context:CanvasRenderingContext2D  | null = mainCanvas.getContext('2d')
                const copyContext:CanvasRenderingContext2D  | null = copyMainCanvas.getContext('2d')
 
                if(context && copyContext) {
                    let width = mainCanvas.width
                    let height = mainCanvas.height
                    copyMainCanvas.width = width
                    copyMainCanvas.height = height
                    copyContext.drawImage(mainCanvas, 0,0);
                    if(width < height) {
                        let longLen = (height/width)*10
                        mainCanvas.width = width + 10
                        mainCanvas.height = height + longLen
                    } else {
                        let longLen = (width/height)*10
                        mainCanvas.width = width + longLen
                        mainCanvas.height = height + 10
                    }
                    context.drawImage(copyMainCanvas, 0, 0)
                    copyMainCanvas.width = mainCanvas.width
                    copyMainCanvas.height = mainCanvas.height
                }
        }
    }
    const onDelete = () => {
        const canvas: HTMLCollectionOf<Element> = document.getElementsByClassName("main-canvas")
        const copyCanvas: HTMLCollectionOf<Element> = document.getElementsByClassName("copy-canvas")

        if(canvas.length === 1) {
            const mainCanvas: HTMLCanvasElement = canvas.item(0) as HTMLCanvasElement
            const copyMainCanvas: HTMLCanvasElement = copyCanvas.item(0) as HTMLCanvasElement
            
            const context:CanvasRenderingContext2D  | null = mainCanvas.getContext('2d')
            const copyContext:CanvasRenderingContext2D  | null = copyMainCanvas.getContext('2d')

            if(context && copyContext) {
                let width = mainCanvas.width
                let height = mainCanvas.height
                copyMainCanvas.width = width
                copyMainCanvas.height = height
                copyContext.drawImage(mainCanvas, 0,0);
                if(width < height) {
                    let longLen = (height/width)*10
                    mainCanvas.width = width - 10
                    mainCanvas.height = height - longLen
                } else {
                    let longLen = (width/height)*10
                    mainCanvas.width = width - longLen
                    mainCanvas.height = height - 10
                }
                context.drawImage(copyMainCanvas, 0, 0)
                copyMainCanvas.width = mainCanvas.width
                copyMainCanvas.height = mainCanvas.height
            }
    }
}
    return(<>
        <React.StrictMode>
        <div className="zoom-buttons flex-container">
            <div onClick={() => onAdd()}> + </div>
            <div onClick={() =>  onDelete()}> - </div>
        </div>
        </React.StrictMode>
    </>)
}