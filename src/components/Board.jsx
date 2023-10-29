import React from 'react'
import BoardSquare from './BoardSquare'

const getColor = (num)=>{
    let x = num % 8
    let y = Math.abs(Math.floor(num / 8) - 7)
    return (x+y)%2 === 0 ? 'white' : 'black'
}
function Board({ board }) {
    let gameBord = board.flat().map((item,i)=>{
        return (
            <div key={i}>
                <BoardSquare piece={item} color={getColor(i)} index={i}/>
            </div>
        )
    })
    return (
        <div className='board'>
            {gameBord}
        </div>
    )
}

export default Board
