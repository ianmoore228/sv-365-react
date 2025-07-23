import React, { useEffect, useRef } from "react";

const CounterButton = ({ increment, decrement }) => {
  const intervalRef = useRef(null);

  const handleMouseDownUp = (action) => {
    action();
    intervalRef.current = setInterval(action, 50); 
  };

  const handleMouseUp = () => {
    clearInterval(intervalRef.current); 
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current); 
    };
  }, []);

  return (
    <div className="modal__counter-wrapper">
      <button
        type="button"
        className={`modal__counter modal__counter_up`}
        onMouseDown={() => handleMouseDownUp(increment)}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
      <button
        type="button"
        className={`modal__counter modal__counter_down`}
        onMouseDown={() => handleMouseDownUp(decrement)}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      />
    </div>
  );
};

export default CounterButton;
