import React, { useRef, useState, useEffect} from 'react'

const Canvas = () => {
    const canvasRef = useRef(null)
    return(
        <>
        <canvas ref={canvasRef}/>
        </>
    )
}

export default Canvas