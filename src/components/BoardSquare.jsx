import React from 'react';
import Square from './Square';
import Piece from './Piece';
import { useDrop } from 'react-dnd'
import { handleMove } from '../Game.js';

function BoardSquare({ piece, color, index }) {
    const getPos = (k) => {
        let x = k % 8
        let y = Math.abs(Math.floor(k / 8) - 7)
        let letter = ['a','b','c','d','e','f','g','h'][x]
        return letter+(y+1)
    }
    const [, drop] = useDrop({
        accept: 'piece',
        drop: (item) => handleMove(item.piece.square,getPos(index))
    })
    return (
        <div className='board-square' ref={drop} >
            <Square color={color}>
                {piece && <Piece piece={piece} />}
            </Square>
        </div>
    )
}

export default BoardSquare
