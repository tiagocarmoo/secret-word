import { useState, useRef } from 'react'
import './GameScreen.css'

export const GameScreen = ({
    verificarLetra,
    pegarCategoria,
    pegarLetra,
    letras,
    adivinharLetras,
    letrasErradas,
    tentativas,
    pontos,
}) => {
    const [letra, setLetra] = useState("")
    const letraInputRef = useRef(null)

    const handleSubmit = (e) => {
        e.preventDefault()

        verificarLetra(letra)

        setLetra("")

        letraInputRef.current.focus()
    }

    return (
        <div className="game">
            <p className="pontos">
                <span>Pontuação: {pontos}</span>
            </p>
            <h1>Adivinhe a palavra</h1>
            <h3 className="dica">
                Dica da palavra: <span>{pegarCategoria}</span>
            </h3>
            <p>Você ainda tem {tentativas} tentativa(s)..</p>
            <div className="palavraContainer">
                {letras.map((letras, i) => (
                    adivinharLetras.includes(letras) ? (
                        <span key={i} className="letra">{letras}</span>
                    ) : (
                        <span key={i} className="quadradoBranco"></span>
                    )

                ))}
            </div>
            <div className="letraContainer">
                <p>Tente adivinhar uma letra da palavra</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="letter"
                        maxLength={1}
                        required
                        onChange={(e) => setLetra(e.target.value)}
                        value={letra}
                        ref={ letraInputRef}
                    />
                    <button>jogar</button>
                </form>
            </div>
            <div className="letrasErradasContainer">
                <p>Letras utilizadas</p>
                {letrasErradas.map((letras, i) => (
                    <span key={i}>{letras}, </span>
                ))}
            </div>
        </div>
    )
}
