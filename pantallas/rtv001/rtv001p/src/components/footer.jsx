import { useState, useEffect } from "react";
import './Footer.css';
export default function Footer() {
    const [pagina, setPagina] = useState(0);
    function moverPagina(direccion) {
        setPagina(prev => Math.max(0, prev + direccion));
    }

    
    return (
        <footer>
            
           <button id="anterior" onClick={() => moverPagina(-1)}>&lt;</button>
            <span>{pagina}</span>
            <button id="siguiente" onClick={() => moverPagina(1)}>&gt;</button>
            

        </footer>
    )
}