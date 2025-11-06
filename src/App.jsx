import { useState } from 'react';
import './App.css';

import Header from './components/header/header';
import Quadrado from './components/quadrado/Quadrado';
import Footer from './components/footer/footer';

import AudioBolha1 from "../src/assets/audio-effects/bubble-1.mp3"
import AudioBolha2 from "../src/assets/audio-effects/bubble-2.mp3"
import AudioWIN from "../src/assets/audio-effects/audio-win.mp3"
import AudioDEFEAT from "../src/assets/audio-effects/audio-defeat.mp3"

import IconWINNER from "../src/assets/icons/winner.png"
import IconDEFEAT from "../src/assets/icons/defeat.png"


import { FaUser } from "react-icons/fa6";

function App() {

  const [Board, setBoard] = useState(Array(9).fill(""))
  const [JogadorAtual, setJogadorAtual] = useState("Jogador 01")
  const [JogadorVencedor, setJogadorVencedor] = useState(null)

  const [ContVitorias, setContVitorias] = useState({
    Jogador01: 0,
    Jogador02: 0
  })

  const indiceVitoria = [
    [0, 1, 2], // Linha de cima
    [3, 4, 5], // Linha do meio
    [6, 7, 8], // Linha de baixo
    [0, 3, 6], // Coluna da esquerda
    [1, 4, 7], // Coluna do meio
    [2, 5, 8], // Coluna da direita
    [0, 4, 8], // Diagonal principal
    [2, 4, 6], // Diagonal inversa
  ];

  function handleClick(index) {
    if (Board[index]) return

    const copiaBoard = [...Board]
    copiaBoard[index] = JogadorAtual
    playAudioBolha(JogadorAtual)
    setBoard(copiaBoard)
    setJogadorAtual(JogadorAtual === "Jogador 01" ? "Jogador 02" : "Jogador 01")

    checkWinner(copiaBoard)
  }

  function playAudioBolha(jogador) {
    const audio = new Audio(jogador === 'Jogador 01' ? AudioBolha1 : AudioBolha2)
    audio.volume = 0.2
    audio.play()
  }

  function checkWinner(copiaBoard) {
    for (let [a, b, c] of indiceVitoria) {
      if (copiaBoard[a] && copiaBoard[a] === copiaBoard[b] && copiaBoard[a] === copiaBoard[c]) {
        setJogadorVencedor(copiaBoard[a])
        if (copiaBoard[a] === "Jogador 01") { setContVitorias((prev) => ({ ...prev, Jogador01: ContVitorias.Jogador01 + 1 })) }
        if (copiaBoard[a] === "Jogador 02") { setContVitorias((prev) => ({ ...prev, Jogador02: ContVitorias.Jogador02 + 1 })) }

        const audio = new Audio(AudioWIN)
        audio.play()
        return
      }
    }

    if (!copiaBoard.includes("")) {
      setJogadorVencedor("Velha")
      const audio = new Audio(AudioDEFEAT)
      audio.play()
    }
  }

  function reiniciarPartida() {
    setBoard(Array(9).fill(""));
    setJogadorVencedor(null);
    setJogadorAtual("Jogador 01");
  }


  return (
    <>
      <Header />

      <main>

        <div className='box-square' style={{ pointerEvents: JogadorVencedor != null ? "none" : "auto" }}>
          {Board.map((value, index) => (
            <Quadrado key={index} index={index} onFunction={handleClick} Jogador={value} />
          ))

          }
        </div>





        <div className='placar-jogadores'>
          <p className='placar jogador1'> <FaUser /> {ContVitorias.Jogador01}</p>
          <p className='placar jogador2'> <FaUser /> {ContVitorias.Jogador02}</p>
        </div>




        <div className='box-infos'>
          {JogadorVencedor != null ?
            (<div className='box-winner'>
              {JogadorVencedor === "Velha" ?
                (<div className='winner-result'><img src={IconDEFEAT} alt="" /> <p>Deu velha</p> <img src={IconDEFEAT} alt="" /></div>)

                :
                (<div className='winner-vencedor'>
                  <div>
                    <div className='winner-result'><img src={IconWINNER} alt="" /> <p>Vencedor</p> <img src={IconWINNER} alt="" /></div>
                    <p style={{ color: JogadorVencedor === 'Jogador 01' ? "rgb(0, 140, 255)" : "rgb(0, 255, 98)" }}>{JogadorVencedor}</p>
                  </div>
                </div>)}

              <button id='btn-jogar-novamente' onClick={() => reiniciarPartida()}>Jogar novamente</button>

            </div>)
            :
            (<p id='jogador-atual'>Vez do: <strong style={{ color: JogadorAtual === 'Jogador 01' ? "rgb(0, 140, 255)" : "rgb(0, 255, 98)" }} id='jogador'>{JogadorAtual}</strong></p>)}
        </div>
      </main>

      <Footer />
    </>


  );
}

export default App;
