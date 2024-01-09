import './Tile.css'

interface Props {
    color: string;
    piece?: string;
}

export default function Tile({color, piece}: Props) {
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