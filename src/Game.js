import { Chess } from 'chess.js';
import { BehaviorSubject} from 'rxjs';
console.log(Chess)

let audio = new Audio('./sounds/chessmove.wav')
// initialize a game
const chess = new Chess();
let initialBoard = localStorage.getItem("saved_game")
if(initialBoard){
    chess.load(initialBoard)
}
export const gameSubject = new BehaviorSubject({
    board: chess.board()
})

export const move = (from, to) => {
    console.log(from + ' to ' + to)
    try {
        chess.move({ from: from, to: to })
        const gameOver = chess.isGameOver()
        audio.play()
        gameSubject.next({ board: chess.board(), gameOver, result: gameOver ? getResult() : null })
    } catch (error) {
        console.log("invalid")
    }

}

const getResult = ()=>{
    let result = "Draw"
    if(chess.isCheckmate()){
        const winner = chess.turn()==='w'? 'BLACK' : 'WHITE'
        result = `CHECKMATE-${winner}-WINS`
    }
    return result
}

export const handleMove = (from, to, prom) => {
    // let moves = chess.moves({verbose:false,square:from})
    const piece = chess.get(from)
    //white promotion
    if (((from.charAt(1) === '7' && piece.color === 'w') || (from.charAt(1) === '2' && piece.color === 'b')) && piece.type === 'p') {
        let input = window.prompt("input your choice:\nn, r, b, q")
        console.log(from + ' to ' + to)
        try {
            chess.move({ from: from, to: to,promotion: input })
            gameSubject.next({ board: chess.board() })
        } catch (error) {
            console.log("invalid")
        }
    }else{
        move(from, to)
    }
    localStorage.setItem('saved_game',chess.fen())
}

export const newGame = ()=>{
    localStorage.removeItem('saved_game')
    chess.reset()
    gameSubject.next({ board: chess.board() })
}

export const getCaptured = (color) => {
    const captured = {'p': 0, 'n': 0, 'b': 0, 'r': 0, 'q': 0}

    for (const move of chess.history({ verbose: true })) {
        if (move.hasOwnProperty("captured") && move.color !== color[0]) {
            captured[move.captured]++
        }
    }

    return captured
}