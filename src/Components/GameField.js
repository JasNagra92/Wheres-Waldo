import React, { useState } from 'react';
import styles from '../Styles/GameField.module.css';

const GameField = () => {
  const [coordinates, setCoordinates] = useState({});
  const [selected, setSelected] = useState('goku');
  const [formVisibility, setFormVisibility] = useState(false);

  const handleClick = (e) => {
    setFormVisibility(!formVisibility);
    setCoordinates({
      offsetx: e.nativeEvent.offsetX,
      offsety: e.nativeEvent.offsetY,
      clientx: e.clientX,
      clienty: e.clientY,
    });
  };
  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  let viewMode = {};

  if (formVisibility) {
    viewMode = {
      display: 'block',
      position: 'absolute'
    };
  } else {
    viewMode = {
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
    </div>
  );
};
export default GameField;
