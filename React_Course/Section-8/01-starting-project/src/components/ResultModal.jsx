import React, { forwardRef ,useImperativeHandle, useRef } from 'react'
import { createPortal } from 'react-dom';

const ResultModal = forwardRef(function ResultModal({ timeRemaining, targetTime , onReset}, ref) {
    const dialogRef = useRef()
    const result = timeRemaining <= 0;
    
    useImperativeHandle(ref, () => {
        return {
            openModal() {
                dialogRef.current.showModal();
            }
        }
    })
    return createPortal(
        <dialog ref={dialogRef} className='result-modal' onClose={onReset}>
            <h2>You {result? "Lost" : "Won"}</h2>
            {!result && <h2>Your Score: {Math.round((targetTime - (timeRemaining/1000).toFixed(2)) * 100)}</h2>}
            <p>
                The target time was  <strong> {targetTime} seconds.</strong>
            </p>
            <p>
                You stopped the timer with <strong> {(timeRemaining/1000).toFixed(2)} seconds left.</strong>
            </p>
            <form method='dialog' onSubmit={onReset}>
                <button>
                    Close
                </button>
            </form>
        </dialog>, document.getElementById('modal')
    )
})

export default ResultModal