import React from "react";
import styles from "./ViewsMenu.module.scss";

export default function ViewsMenu({hideMenu, setView}) {
  function handleClick(property) {
    hideMenu();
    setView(property);
  }

  return (
    <div className={ styles.views }>
      <button onClick={ () => handleClick("table") }>Table</button>
      <button onClick={ () => handleClick("tiles") }>Tiles</button>
      <button onClick={ () => handleClick("groups") }>Groups</button>
    </div>
  );
}