// CSS
import './App.css';

// React
import { useCallback, useEffect, useState } from 'react';

// data
import { wordsList } from './data/words'

// components
import { StartScreen } from './components/StartScreen';
import { GameScreen } from './components/GameScreen';
import { EndScreen } from './components/EndScreen';

const stage = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
]
const quantidadeTentativas = 3

function App() {
  const [gameStage, setGameStage] = useState(stage[0].name)
  const [words] = useState(wordsList)

  const [pegarLetra, setPegarLetra] = useState("");
  const [pegarCategoria, setPegarCategoria] = useState("");
  const [letras, setLetras] = useState([]);

  const [adivinharLetras, setAdivinharLetras] = useState([]);
  const [letrasErradas, setLetrasErradas] = useState([]);
  const [tentativas, setTentativas] = useState(quantidadeTentativas);
  const [pontos, setPontos] = useState(0);

  // função para escolher categoria aleatoria
  const pickWordAndCategory = useCallback( () => {
    // escolher categoria aleatoria
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    // escolher palavra aleatoria
    const word = words[category][Math.floor(Math.random() * words[category].length)]

    return { word, category }
  }, [words])

  // função para iniciar o jogo
  const startGame = useCallback ( () => {
    // limpar todas as letras
    limparEstadoLetras()

    const { word, category } = pickWordAndCategory()

    // criar arrays das letras
    let wordLetters = word.split("")
    wordLetters = wordLetters.map((l) => l.toLowerCase())

    // console.log(category, word)
    // console.log(wordLetters)

    setPegarCategoria(category);
    setPegarLetra(word);
    setLetras(wordLetters);

    setGameStage(stage[1].name)
  }, [pickWordAndCategory])

  // verificando a letra
  const verificarLetra = (letra) => {

    const normalizarLetra = letra.toLowerCase()

    // checar se a letra ja foi utilizada
    if (
      adivinharLetras.includes(normalizarLetra) || letrasErradas.includes(normalizarLetra)
    ) {
      return
    }

    // colocar letra adivinhada e remover tentativa

    if (letras.includes(normalizarLetra)) {
      setAdivinharLetras((actualAdivinharLetras) => [
        ...actualAdivinharLetras,
        normalizarLetra
      ])

    } else {
      setLetrasErradas((actualLetrasErradas) => [
        ...actualLetrasErradas,
        normalizarLetra,
      ])

      setTentativas((actualTentativas) => actualTentativas - 1)
    }
  }

  const limparEstadoLetras = () => {
    setAdivinharLetras([])
    setLetrasErradas([])
  }

  // checar se as tentativas terminaram
  useEffect(() => {
    if (tentativas <= 0) {
      //resetar todos os estados
      limparEstadoLetras()

      setGameStage(stage[2].name)
    }
  }, [tentativas])

  // checar win condition 
  useEffect(() => {
    const uniqueLetras = [...new Set(letras)]
    
    // win condition
    if(adivinharLetras.length === uniqueLetras.length) {

      // adicionar pontos
      setPontos((actualPontos) => actualPontos +=100)

      // reinicia o jogo com outra palavra
      startGame()
    }
  
  }, [adivinharLetras, letras, startGame])


  //reiniciar o jogo
  const restartGame = () => {
    setPontos(0)
    setTentativas(quantidadeTentativas)

    setGameStage(stage[0].name)
  }

  return (
    <div className="App">
      {gameStage === "start" &&
        <StartScreen
          startGame={startGame}
        />}
      {gameStage === "game" &&
        <GameScreen
          verificarLetra={verificarLetra}
          pegarLetra={pegarLetra}
          pegarCategoria={pegarCategoria}
          letras={letras}
          adivinharLetras={adivinharLetras}
          letrasErradas={letrasErradas}
          tentativas={tentativas}
          pontos={pontos}
        />}
      {gameStage === "end" &&
        <EndScreen
          restartGame={restartGame}
          pontos={pontos}
        />}
    </div>
  );
}

export default App;
