import React, { useState, useContext, useEffect } from 'react';
import styles from '../Styles/GameField.module.css';
import { TimerContext } from './TimerContext';

const GameField = () => {
  const [timer, setTimer] = useContext(TimerContext);
  const [seconds, setSeconds] = useState(0);
  const [coordinates, setCoordinates] = useState({});
  const [selected, setSelected] = useState('goku');
  const [formVisibility, setFormVisibility] = useState(false);

  const handleClick = (e) => {
    setFormVisibility(!formVisibility);
    setCoordinates({
      offsetx: e.nativeEvent.offsetX,
      offsety: e.nativeEvent.offsetY,
    });
    setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
  };
  useEffect(() => {
    setTimer(seconds);
  }, [seconds]);
  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  let viewMode = {};
  let selectBox = {};

  if (formVisibility) {
    viewMode = {
      display: 'block',
      position: 'absolute',
      left: coordinates.offsetx,
      top: coordinates.offsety,
    };
    selectBox = {
      display: 'block',
      position: 'absolute',
      top: coordinates.offsety - 15,
      left: coordinates.offsetx - 25,
      width: '20px',
      height: '20px',
      border: '1px solid black',
    };
  } else {
    viewMode = {
      display: 'none',
    };
    selectBox = {
      display: 'none',
    };
  }

  return (
    <div onClick={(e) => handleClick(e)} className={styles.container}>
      <div>
        <p>offset x: {coordinates.offsetx}</p>
        <p>offset y: {coordinates.offsety}</p>
        <p>clientx: {coordinates.clientx}</p>
        <p>clienty: {coordinates.clienty}</p>
      </div>
      <div>
        <form style={viewMode} onSubmit={(e) => e.preventDefault()}>
          <select value={selected} onChange={handleChange}>
            <option value="goku">Goku</option>
            <option value="gohan">Gohan</option>
          </select>
        </form>
      </div>
      <div style={selectBox}></div>
    </div>
  );
};
export default GameField;
