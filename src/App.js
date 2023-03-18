import './App.css';
import Keyboard from './components/Keyboard';
import Board from './components/Board';
import GameOver from './components/GameOver';
import { boardDefault, generateWordSet } from './Words';
import { createContext, useEffect, useState } from 'react';
import Modal from './components/Modal';

export const AppContext = createContext();

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState([]);
  const [correctWord, setCoreectWord] = useState('');
  const [gameOver, setGameOver] = useState({gameOver: false, guessedWord: false});
  const [show, setShow] = useState(true);
  const [guessedWords, setGuessedWords] = useState([]);

  useEffect(() =>{
    generateWordSet().then((words) =>{
      setWordSet(words.wordSet);
      setCoreectWord(words.todaysWord);
    })
  }, [])

  const onSelectLetter = (keyVal) => {
    if (currAttempt.letterPos > 4 || show) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1});
  }; 

  const onDelete = () => {
    if(currAttempt.letterPos === 0 || show) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos - 1 });
  };

  const onEnter = () => {
    if(currAttempt.letterPos !== 5)return;
    
    let currWord = "";
    
    for(let i = 0; i < 5; i++){
      currWord += board[currAttempt.attempt][i];
    }

    if (disabledLetters.includes(currWord)) {
      alert("You've already guessed this word!");
      return;
    }

    if (wordSet.has(currWord.toLocaleLowerCase())){
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
      setDisabledLetters([...disabledLetters, currWord]);
    }else{
      alert('word not found');
    }

    if (currWord === correctWord){
      setGameOver({gameOver: true, guessedWord: true})
      return;
    }

    if(currAttempt.attempt === 5){
      setGameOver({gameOver:true, guessedWord: false})
    }
    
  };

  return (
    
    <div className="App">
      <nav className='navbar'>
        <div className='left-menu'></div>
        <div className='title'>
          <h1>Wordle</h1>
        </div>
        <div className='nav-menu'>
          <a className="linkedin-logo" href="https://www.linkedin.com/in/lyudmil-nikolov-4822ba1bb/" target="_blank" rel="noopener noreferrer">
          <svg fill="#ffffff" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-143 145 512 512" xmlSpace="preserve">

          <g id="SVGRepo_bgCarrier" strokeWidth="0"/>

          <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"/>

          <g id="SVGRepo_iconCarrier"> <g> <path d="M113,145c-141.4,0-256,114.6-256,256s114.6,256,256,256s256-114.6,256-256S254.4,145,113,145z M272.8,560.7 c-20.8,20.8-44.9,37.1-71.8,48.4c-27.8,11.8-57.4,17.7-88,17.7c-30.5,0-60.1-6-88-17.7c-26.9-11.4-51.1-27.7-71.8-48.4 c-20.8-20.8-37.1-44.9-48.4-71.8C-107,461.1-113,431.5-113,401s6-60.1,17.7-88c11.4-26.9,27.7-51.1,48.4-71.8 c20.9-20.8,45-37.1,71.9-48.5C52.9,181,82.5,175,113,175s60.1,6,88,17.7c26.9,11.4,51.1,27.7,71.8,48.4 c20.8,20.8,37.1,44.9,48.4,71.8c11.8,27.8,17.7,57.4,17.7,88c0,30.5-6,60.1-17.7,88C309.8,515.8,293.5,540,272.8,560.7z"/> <rect x="-8.5" y="348.4" width="49.9" height="159.7"/> <path d="M15.4,273c-18.4,0-30.5,11.9-30.5,27.7c0,15.5,11.7,27.7,29.8,27.7h0.4c18.8,0,30.5-12.3,30.4-27.7 C45.1,284.9,33.8,273,15.4,273z"/> <path d="M177.7,346.9c-28.6,0-46.5,15.6-49.8,26.6v-25.1H71.8c0.7,13.3,0,159.7,0,159.7h56.1v-86.3c0-4.9-0.2-9.7,1.2-13.1 c3.8-9.6,12.1-19.6,27-19.6c19.5,0,28.3,14.8,28.3,36.4v82.6H241v-88.8C241,369.9,213.2,346.9,177.7,346.9z"/> </g> </g>

          </svg>
          </a>
          <button className="help-button" onClick={() => setShow(true)} show={show.toString()} >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16"> <path d="M8.05 9.6c.336 0 .504-.24.554-.627.04-.534.198-.815.847-1.26.673-.475 1.049-1.09 1.049-1.986 0-1.325-.92-2.227-2.262-2.227-1.02 0-1.792.492-2.1 1.29A1.71 1.71 0 0 0 6 5.48c0 .393.203.64.545.64.272 0 .455-.147.564-.51.158-.592.525-.915 1.074-.915.61 0 1.03.446 1.03 1.084 0 .563-.208.885-.822 1.325-.619.433-.926.914-.926 1.64v.111c0 .428.208.745.585.745z" fill="white"></path> <path d="m10.273 2.513-.921-.944.715-.698.622.637.89-.011a2.89 2.89 0 0 1 2.924 2.924l-.01.89.636.622a2.89 2.89 0 0 1 0 4.134l-.637.622.011.89a2.89 2.89 0 0 1-2.924 2.924l-.89-.01-.622.636a2.89 2.89 0 0 1-4.134 0l-.622-.637-.89.011a2.89 2.89 0 0 1-2.924-2.924l.01-.89-.636-.622a2.89 2.89 0 0 1 0-4.134l.637-.622-.011-.89a2.89 2.89 0 0 1 2.924-2.924l.89.01.622-.636a2.89 2.89 0 0 1 4.134 0l-.715.698a1.89 1.89 0 0 0-2.704 0l-.92.944-1.32-.016a1.89 1.89 0 0 0-1.911 1.912l.016 1.318-.944.921a1.89 1.89 0 0 0 0 2.704l.944.92-.016 1.32a1.89 1.89 0 0 0 1.912 1.911l1.318-.016.921.944a1.89 1.89 0 0 0 2.704 0l.92-.944 1.32.016a1.89 1.89 0 0 0 1.911-1.912l-.016-1.318.944-.921a1.89 1.89 0 0 0 0-2.704l-.944-.92.016-1.32a1.89 1.89 0 0 0-1.912-1.911l-1.318.016z" fill="white"></path> <path d="M7.001 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0z" fill="white"></path> </svg>
          </button>
        </div>
        <Modal onClose={() => setShow(false)} show={show} />
      </nav>
      <AppContext.Provider value={{ board, setBoard, currAttempt, setCurrAttempt, onSelectLetter, onDelete, onEnter, correctWord, disabledLetters, setDisabledLetters, gameOver, setGameOver }}>
        
        <div className='game'>
        <Board/>
        {gameOver.gameOver ? (
            <GameOver />
          ) : (
            <Keyboard disabled={show} />
        )}  
        </div>
      </AppContext.Provider>
      
    </div>
  );
}

export default App;
