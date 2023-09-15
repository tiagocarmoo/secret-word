import './EndScreen.css'

export const EndScreen = ({restartGame, pontos}) => {
    return (
        <div>
            <h1>Você perdeu!</h1>
            <h2>sua pontuação foi: <span>{pontos}</span></h2>
            <button onClick={restartGame}>Tentar novamente</button>
        </div>
    )
}
