import React, { useRef } from 'react';
import './Chessboard.css'
import Tile from "../Tile/Tile"

const horizontal_axis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const vertical_axis = ['1', '2', '3', '4', '5', '6', '7', '8'];

export default function Chessboard() {
    const chessboardRef = useRef<HTMLDivElement>(null);

    let activePiece: HTMLElement | null = null;
    
    /* Grabs piece and follows mouse's initial movement. */
    function grabPiece(e: React.MouseEvent) {
        const element = e.target as HTMLElement;
        if (element.classList.contains("chess-piece")) {
            const mouseX = e.clientX - 50;
            const mouseY = e.clientY - 50;
            element.style.position = "absolute";
            element.style.left = `${mouseX}px`
            element.style.top = `${mouseY}px`
            activePiece = element;
        }
    }

    /* Moves piece by following mouse movement. */
    function movePiece(e: React.MouseEvent) {
        if (activePiece && chessboardRef.current) {
            const minX = chessboardRef.current.offsetLeft - 25;
            const minY = chessboardRef.current.offsetTop - 25;
            const maxX = chessboardRef.current.offsetLeft + chessboardRef.current.clientWidth - 75;
            const maxY = chessboardRef.current.offsetTop + chessboardRef.current.clientHeight - 75;

            const mouseX = e.clientX - 50;
            const mouseY = e.clientY - 50;
            activePiece.style.position = "absolute";

            if (mouseX < minX) {
                // trying to piece move out of bounds, control movement to right edge of board
                activePiece.style.left = `${minX}px`;
            } else if (mouseX > maxX) {
                // trying to piece move out of bounds, control movement to left edge of board
                activePiece.style.left = `${maxX}px`;
            } else {
                // within bounds
                activePiece.style.left = `${mouseX}px`;
            }

            if (mouseY < minY) {
                // trying to piece move out of bounds, control movement to top edge of board
                activePiece.style.top = `${minY}px`;
            } else if (mouseY > maxY) {
                // trying to piece move out of bounds, control movement to bottom edge of board
                activePiece.style.top = `${maxY}px`;
            } else {
                // within bounds
                activePiece.style.top = `${mouseY}px`;
            }
        }

    }

    /* Drops piece at current location of mouse. */
    function dropPiece(e: React.MouseEvent) {
        if (activePiece) {
            activePiece = null;
        }
    }

    let board = [];
    for (let j = vertical_axis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontal_axis.length; i++) {
            
            let tile_color = "white"
            if ((i + j) % 2 === 0) {tile_color = "black"}

            let curr_image = undefined;
            let piece_color = j < 4 ? "white" : "black";
            
            // add pawns
            if (j === 1 || j === 6) {curr_image = `images/${piece_color}_pawn.png`;}

            // add all other pieces
            if (j === 0 || j === 7) {
                if (i === 0 || i === 7) {curr_image = `images/${piece_color}_rook.png`;}
                if (i === 1 || i === 6) {curr_image = `images/${piece_color}_knight.png`;}
                if (i === 2 || i === 5) {curr_image = `images/${piece_color}_bishop.png`;}
                if (i === 3) {curr_image = `images/${piece_color}_queen.png`;}
                if (i === 4) {curr_image = `images/${piece_color}_king.png`;}
            }

            // add pieces to board
            board.push(<Tile key={`${j},${i}`} piece={curr_image} color={tile_color}/>);
        }
    }

    return (
        <div 
            onMouseMove={e => movePiece(e)} 
            onMouseDown={e => grabPiece(e)}
            onMouseUp={e => dropPiece(e)} 
            id="chessboard"
            ref={chessboardRef}>
            {board}
        </div>
    );
}