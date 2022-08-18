import React, { useState, useContext, useEffect } from 'react';
import styles from '../Styles/GameField.module.css';
import { TimerContext } from './TimerContext';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';
import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAs4GeX2Z7al_5yOQKbG4OPi852PsunYBk',
  authDomain: 'wheres-waldo-66f99.firebaseapp.com',
  projectId: 'wheres-waldo-66f99',
  storageBucket: 'wheres-waldo-66f99.appspot.com',
  messagingSenderId: '328279096571',
  appId: '1:328279096571:web:ec3985028c9053d8c3445e',
  measurementId: 'G-78816RL902',
};

const GameField = () => {
  const [timer, setTimer] = useContext(TimerContext);
  const [seconds, setSeconds] = useState(0);
  const [timerActive, setTimerActive] = useState(true);

  const [coordinates, setCoordinates] = useState({});
  const [selected, setSelected] = useState('waldo');
  const [formVisibility, setFormVisibility] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const storage = getStorage(app);
  const docRef = doc(db, 'Coordinates', 'Waldo Coordinates');

  const test = async () => {
    const docSnap = await getDoc(docRef);
    const waldoCoordinates = docSnap.data()
    console.log(waldoCoordinates['x-max'])
  };

  const handleClick = (e) => {
    setFormVisibility(!formVisibility);
    setCoordinates({
      offsetx: e.nativeEvent.offsetX,
      offsety: e.nativeEvent.offsetY,
    });
    if (timerActive) {
      setInterval(() => {
        setSeconds((seconds) => seconds + 1);
      }, 1000);
    }
  };

  useEffect(() => {
    setTimer(seconds);
  }, [seconds]);

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  useEffect(() => {
    const pathReference = ref(storage, 'WheresWaldo.jpeg');

    const getImage = async () => {
      setImageUrl(await getDownloadURL(pathReference));
    };
    getImage();
    test()
  });
  let viewMode = {};
  let selectBox = {};

  if (formVisibility) {
    viewMode = {
      display: 'block',
      position: 'absolute',
      left: coordinates.offsetx + 10,
      top: coordinates.offsety,
    };
    selectBox = {
      display: 'block',
      position: 'absolute',
      top: coordinates.offsety - 15,
      left: coordinates.offsetx - 15,
      width: '20px',
      height: '35px',
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
      <img src={imageUrl} alt="wheres waldo" />
      <div>
        <form style={viewMode} onSubmit={(e) => e.preventDefault()}>
          <select value={selected} onChange={handleChange}>
            <option value="Waldo">Waldo</option>
            <option value="gohan">Gohan</option>
          </select>
        </form>
      </div>
      <div style={selectBox}></div>
    </div>
  );
};
export default GameField;
