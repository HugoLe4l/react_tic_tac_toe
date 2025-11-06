import "./Quadrado.css"

import { useRef, useState } from "react";
import { RxCircle } from "react-icons/rx";

import { IoClose } from "react-icons/io5";


export default function Quadrado({ index, onFunction, Jogador }) {

    const icones = { x: <IoClose className="icon jogador1" />, circle: <RxCircle className="icon jogador2" />}

    return (
        <div className="quadrado" onClick={() => onFunction(index)}>
            {Jogador === "Jogador 01" && icones.x}
            {Jogador === "Jogador 02" && icones.circle}

        </div>
    )
 
}