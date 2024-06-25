import { useState, useEffect, useRef } from 'react'
import './App.css'
import { getPadTime } from './helpers/getPadTime';

function App() {
  const [timeLeft, setTimeLeft] = useState(2 * 60);
  const [isCounting, setIsCounting] = useState(false);
  const [renderCount, setRenderCount] = useState(0);
  const intervalRef = useRef(null);

  const minutes = getPadTime(Math.floor(timeLeft / 60));
  const seconds = getPadTime(timeLeft - minutes * 60);

  useEffect(() => {
    setRenderCount((count) => count + 1);
    intervalRef.current = setInterval(() => {
      isCounting &&
        setTimeLeft((timeLeft) => (timeLeft >= 1 ? timeLeft - 1 : 0));
    }, 1000);
    if (timeLeft === 0) setIsCounting(false)
    return () => {
      clearInterval(intervalRef.current);
    }
  }, [timeLeft, isCounting]);

  const handlePlay = () => {
    if (timeLeft === 0) setTimeLeft(2 * 60)

    setIsCounting(true);
  };
  const handlePause = () => {
    setIsCounting(false)
  };
  const handleReset = () => {
    setIsCounting(false);
    setTimeLeft(2 * 60)
  };
  return (
    <div className="app" >
      <div className="timer">
        <span>{minutes}</span>
        <span>:</span>
        <span>{seconds}</span>
      </div>
      <div><span className='renders'>Number of component renders: {renderCount}</span></div>
      <div className="buttons">
        {isCounting ? (
          <>
            <button className='pause' onClick={handlePause}><img src=".\img\Icon.png" alt="#" />Pause</button>
            <button className='reset' onClick={handleReset}>Reset</button>
          </>
        ) : (
          <button className='play' onClick={handlePlay}><img src=".\img\Vector.svg" alt="#" />Play</button>
        )}
      </div>
    </div >
  )
}

export default App
