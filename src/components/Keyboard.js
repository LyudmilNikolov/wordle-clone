import React, { useState, useCallback, useEffect, useContext } from 'react'
import Key from './Key';
import { AppContext } from '../App';

function Keyboard() {
  const keys1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const keys2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const keys3 = ['Z', 'X', 'C', 'V', 'B', 'N', 'M'];

  const allKeys = [...keys1, ...keys2, ...keys3];

  const { onSelectLetter, onDelete, onEnter, disabledLetters } = useContext(AppContext);

  const [pressedKey, setPressedKey] = useState(null); // Add state variable

  const handleKeyboard = useCallback((event) =>{
    if (event.key === 'Enter') {
      event.preventDefault();
      onEnter();
    } else if (event.key === 'Backspace') {
      event.preventDefault();
      onDelete();
    } else {
      if (allKeys.join('').includes(event.key.toUpperCase())) {
        onSelectLetter(event.key.toUpperCase());
        setPressedKey(event.key.toUpperCase());
      }
    }
  }, [allKeys, onEnter, onDelete, onSelectLetter])

  useEffect(() =>{
    document.addEventListener('keydown', handleKeyboard);

    return () => {
        document.removeEventListener('keydown', handleKeyboard);
    }
  }, [handleKeyboard])

  useEffect(() => {
    const handleKeyUp = (event) => {
      if (allKeys.join('').includes(event.key.toUpperCase())) {
        setPressedKey(null);
      }
    };
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [allKeys]);

  return (
    <div className='keyboard' onKeyDown={handleKeyboard}>
      <div className='line1'>
        {keys1.map((key) => {
          return <Key key={key} keyVal={key} disabled={disabledLetters.includes(key)} />;
        })}
      </div>
      <div className='line2'>
        {keys2.map((key) => {
          return <Key key={key} keyVal={key} disabled={disabledLetters.includes(key)} />;
        })}
      </div>
      <div className='line3'> 
        <Key key="enter" keyVal={"ENTER"} bigKey />
        {keys3.map((key) => {
          return <Key key={key} keyVal={key} disabled={disabledLetters.includes(key)} />;
        })}
        <Key key="delete" keyVal={"DELETE"} bigKey/>
      </div>
    </div>
  );
}


export default Keyboard