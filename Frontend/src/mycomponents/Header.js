// Header.js
import React, {useEffect,useState} from 'react';
import Navb from './NavScrollExample';
const Header = ({st}) => {
  const [state,setState]=useState(st);
  useEffect(() => {
    setState(st); // When `st` changes, update the local state
  }, [st]); // Trigger effect only when `st` changes
  return (
    <header className="nv">
      <Navb login={state} />
    </header>
  );
}

export default Header;
