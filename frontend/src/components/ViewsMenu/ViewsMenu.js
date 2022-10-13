import React from "react";
import styles from "./ViewsMenu.module.scss";

export default function ViewsMenu(props) {
  function handleClick(property) {
    props.hideMenu();
    props.setView(property);
    props.sortEmployees();
    props.setElementsEnd(70);
    props.setGroupsEnd(20);
    window.scrollTo(0, 0);
  }

  return (
    <div className={ styles.views }>
      <button onClick={ () => handleClick("table") }>Table</button>
      <button onClick={ () => handleClick("tiles") }>Tiles</button>
      <button onClick={ () => handleClick("groups") }>Groups</button>
    </div>
  );
}