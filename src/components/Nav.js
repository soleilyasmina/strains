import React from 'react';

export default function Nav(props) {
  return (
    <nav>
      <button name="favorites" onClick={props.setView}>Favorites</button>
      <button name="search" onClick={props.setView}>Search</button>
    </nav>
  )
}
