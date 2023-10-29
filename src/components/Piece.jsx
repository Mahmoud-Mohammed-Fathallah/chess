import React from 'react'
import { useDrag, DragPreviewImage } from 'react-dnd'

function Piece({ piece }) {
    const [{isDragging}, drag, preview] = useDrag({
        type: `piece`,
        item: () => ({ piece }),
        collect: (monitor)=>{
            return {isDragging: !!monitor.isDragging()}
        }
    })
    const img = `../images/chess pieces/${piece.color[0]}${piece.type}.png`
    return (
        <>
            <div  className='piece-wrapper'  >
                <img ref={drag} src={img} alt="piece" className='piece-img' style={{opacity:isDragging?0:1}} />
            </div>
        </>
    )
}

export default Piece
