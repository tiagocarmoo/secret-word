import './StartScreen.css'

export const StartScreen = ({startGame}) => {
  return (
    <div className="StartScreen">
        <h1>Adivinhe a palavra</h1>
        <p>Clique no botão abaixo para iniciar o jogo</p>
        <button onClick={startGame}>Começar o jogo</button>
    </div>
  )
}
