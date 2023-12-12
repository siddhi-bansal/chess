import './Tile.css'

interface Props {
    color: string
}

export default function Tile({color}: Props) {
    if (color === "black") {
        return <div className="tile black-tile"></div>;
    } else {
        return <div className="tile white-tile"></div>;
    }
    
}