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
            if ((i + j) % 2 === 0) {
                tile_color = "black"
            }
            board.push(<Tile color={tile_color}/>);
        }
    }

    return <div id="chessboard">{board}</div>;
}