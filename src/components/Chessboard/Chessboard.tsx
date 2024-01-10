import React, { useEffect, useRef, useState } from 'react';
import './Chessboard.css'
import Tile from "../Tile/Tile"
import { assert } from 'console';

const horizontal_axis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const vertical_axis = ['1', '2', '3', '4', '5', '6', '7', '8'];
const initial_board_state: Piece[] = [];

interface Piece {
    image: string;
    x: number;
    y: number;
}

export default function Chessboard() {
    const [pieces, setPieces] = useState<Piece[]>(initial_board_state);
    const chessboardRef = useRef<HTMLDivElement>(null);

    let activePiece: HTMLElement | null = null;

    for (let i = 0; i < 2; i++) {
        const piece_color  = i === 0 ? "black" : "white";
        const y = i === 0 ? 7 : 0;
        console.log("im here");
        // add all major pieces (rook, bishop, knight), queen, and king
        initial_board_state.push({ image: `images/${piece_color}_rook.png`, x: 0, y})
        console.log("im her pt 2");
        initial_board_state.push({ image: `images/${piece_color}_rook.png`, x: 7, y})
        initial_board_state.push({ image: `images/${piece_color}_bishop.png`, x: 1, y})
        initial_board_state.push({ image: `images/${piece_color}_bishop.png`, x: 6, y})
        initial_board_state.push({ image: `images/${piece_color}_knight.png`, x: 2, y})
        initial_board_state.push({ image: `images/${piece_color}_knight.png`, x: 5, y})
        initial_board_state.push({ image: `images/${piece_color}_queen.png`, x: 3, y})
        initial_board_state.push({ image: `images/${piece_color}_king.png`, x: 4, y})

        for (let j = 0; j < 8; j++) {
            const pawn_y = y === 0 ? 1 : 6;
            initial_board_state.push({ image: `images/${piece_color}_pawn.png`, x: j, y: pawn_y})
        }
    }
    
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
            setPieces((value) => {
                const pieces = value.map((p) => {
                    if (p.x === 1 && p.y === 0) {
                        p.x = 0;
                    }
                    return p;
                });
                return pieces;
            })
            activePiece = null;
        }
    }

    let board = [];
    for (let i = vertical_axis.length - 1; i >= 0; i--) {
        for (let j = horizontal_axis.length - 1; j >= 0; j--) {
            const number = j + i + 2;
            let image = undefined;
            pieces.forEach((p) => {
                if (p.x === j && p.y === i) {
                    image = p.image;
                }
            });
            board.push(<Tile key={`${i}, ${j}`} piece={image} idx_sum={i+j}/>)
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