import React, { useState } from "react";
import classes from "./Menu.module.scss";
import viewImage from "./view.svg"
import ViewsMenu from "../ViewsMenu/ViewsMenu";

export default function Menu(props) {
  const [openViews, setOpenViews] = useState(false);

  return (
    <div className={classes.menu}>
      <div className="inputs">
        { props.view != "table" && <input type="checkbox" checked={props.checkAll} onChange={() => props.handleChangeAll()} /> }
        <input type="text" name="" id="" placeholder="Search..." onChange={ event => props.handleSearch(event.target.value) } />
      </div>
      <button className={ classes.openViews } onClick={ () => setOpenViews(!openViews) }>
        <img src={ viewImage } alt="" width="50" />
      </button>
      { openViews && <ViewsMenu hideMenu={ () => setOpenViews(!openViews) } setView={props.setView} /*createGroups={props.createGroups}*/ /> }
    </div>
  )
}