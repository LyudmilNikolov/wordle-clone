import React from 'react'

const Modal = props => {
    if (!props.show){
        return null
    }
    return(
        <div className='modal' onClick={props.onClose}>
            <div className='modal-content' onClick={e => e.stopPropagation()}>
                <div className='modal-footer'>
                    <button className='exit' onClick={props.onClose}>Close</button>
                </div>

                <div className='modal-header'>
                    <h1 className='modal-title'>How to Play</h1>
                    <h2 className='modal-subtitle'>Guess the Wordle in 6 tries</h2>
                    <ul>
                        <li>Each guess must be a valid 5-letter word. Hit the enter button to submit.</li>
                        <li>After each guess, the color of the tiles will change to show how close your guess was to the correct word.</li>
                    </ul>
                </div>
                <div className='modal-body'>
                    <h3 className='modal-examples'>Examples</h3>
                    <div className="modal-example-state">
                        <Box value="R" state="C" id="correct"/>
                        <Box value="I" />
                        <Box value="G" />
                        <Box value="H" />
                        <Box value="T" />
                    </div>
                    <p className="modal-paragraph">
                        The letter <b>R</b> is in the word and in the correct spot.
                    </p>
                    <div className="modal-example-state">
                        <Box value="N" />
                        <Box value="U" />
                        <Box value="M" state="A" />
                        <Box value="B" />
                        <Box value="S" />
                    </div>
                    <p className="modal-paragraph">
                        The letter <b>M</b> is in the word and in the correct spot.
                    </p>
                        <div className="modal-example-state">
                        <Box value="F" />
                        <Box value="L" state="E" />
                        <Box value="A" />
                        <Box value="T" />
                        <Box value="S" />
                    </div>
                        <p className="modal-paragraph">
                        The letter <b>L</b> is in the word and in the correct spot.
                        </p>
                </div>
            </div>
        </div>
    )
}

function Box(props) {
    let className = "box";
    if (props.state === "C") className += " correct";
    if (props.state === "A") className += " almost";
    if (props.state === "E") className += " error";

    return (
        <div className={className}>
        {props.value}
        </div>
    );
}

export default Modal