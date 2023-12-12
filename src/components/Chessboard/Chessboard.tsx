import React from 'react';
import './Chessboard.css'
import Tile from "../Tile/Tile"

const horizontal_axis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const vertical_axis = ['1', '2', '3', '4', '5', '6', '7', '8'];

export default function Chessboard() {
    let board = [];
    for (let j = vertical_axis.length - 1; j >= 0; j--) {
        for (let i = 0; i < horizontal_axis.length; i++) {
            
            let tile_color = "white"
            if ((i + j) % 2 === 0) {tile_color = "black"}

            let curr_image = undefined;
            let piece_color = j < 4 ? "white" : "black";
            
            // add pawns
            if (j == 1 || j == 6) {curr_image = `images/${piece_color}_pawn.png`;}

            // add all other pieces
            if (j == 0 || j == 7) {
                if (i == 0 || i == 7) {curr_image = `images/${piece_color}_rook.png`;}
                if (i == 1 || i == 6) {curr_image = `images/${piece_color}_knight.png`;}
                if (i == 2 || i == 5) {curr_image = `images/${piece_color}_bishop.png`;}
                if (i == 3) {curr_image = `images/${piece_color}_queen.png`;}
                if (i == 4) {curr_image = `images/${piece_color}_king.png`;}
            }

            // add pieces to board
            board.push(<Tile piece={curr_image} color={tile_color}/>);
        }
    }

    return <div id="chessboard">{board}</div>;
}