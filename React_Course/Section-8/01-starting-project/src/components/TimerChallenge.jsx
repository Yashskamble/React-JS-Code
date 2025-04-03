import React, { useRef, useState } from 'react'
import ResultModal from './ResultModal';

function TimerChallenge({ title, targetTime }) {
    const timer = useRef();
    const modal = useRef()
    const [timeRemaining, setTimeRemaning ] = useState(targetTime * 1000);
    const timerIsActive = timeRemaining > 0 && timeRemaining < targetTime * 1000;

    function handleStart() {
        timer.current = setInterval(()=> {
            setTimeRemaning(prev => prev - 10)
        }, 10)
    }
    if(timeRemaining <= 0) {
        clearInterval(timer.current)
        modal.current.openModal();
    }
    function handleReset (){
        setTimeRemaning(targetTime * 1000)
    }   
     function handleStop() {
        modal.current.openModal();
        clearInterval(timer.current)
    }
     return (
        <>
        <ResultModal targetTime={targetTime} timeRemaining={timeRemaining} ref={modal} onReset = {handleReset}/>
        <section className='challenge'>
            <h2>
                {title}
            </h2>
            <p className='challenge-time'>
                {targetTime} second {targetTime > 1 ? "s" : ''}
            </p>
            <p>
                <button onClick={timerIsActive ? handleStop : handleStart}> 
                    {timerIsActive ? 'Stop' : 'Start'} Challenge
                </button>
            </p>
            <p className={timerIsActive ? 'active' : ''}>
            {timerIsActive ? 'Time is running....' : 'Time is inactive'}
            </p>
        </section>
        </>
    )
}

export default TimerChallenge