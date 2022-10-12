import React, { useState } from "react";
import styles from "./Menu.module.scss";
import viewImage from "./view.svg"
import ViewsMenu from "../ViewsMenu/ViewsMenu";

export default function Menu(props) {
  const [openViews, setOpenViews] = useState(false);

  return (
    <div className={styles.menu}>
      <div className="inputs">
        { props.view == "tiles" && <input type="checkbox" checked={props.checkAll} onChange={() => props.handleChangeAll()} /> }
        <input type="text" name="" id="" placeholder="Search..." onChange={ event => props.setSearchTerm(event.target.value) } />
      </div>
      <button className={ styles.openViews } onClick={ () => setOpenViews(!openViews) }>
        <img src={ viewImage } alt="" width="50" />
      </button>
      { openViews && <ViewsMenu hideMenu={ () => setOpenViews(!openViews) } setView={props.setView} /> }
    </div>
  )
}