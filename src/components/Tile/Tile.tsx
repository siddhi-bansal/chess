import './Tile.css'

interface Props {
    piece?: string;
    idx_sum: number;
}

export default function Tile({piece, idx_sum}: Props) {
    let color = undefined;
    if (idx_sum % 2 === 0) {
        color = "white";
    } else {
        color = "black";
    }
    if (color === "black") {
        return (
            <div className="tile black-tile">
                {piece && <div style={{backgroundImage: `url(${piece})`}} className="chess-piece"></div>}
            </div>
        );
    } else {
        return (
            <div className="tile white-tile">
                {piece && <div style={{backgroundImage: `url(${piece})`}} className="chess-piece"></div>}
            </div>
        );
    }    
}