import React from "react";
import classes from "./ListElement.module.scss";
import personImage from "./person.svg";

export default function ListElement(props) {
  const employee = props.employee;

  return (
    <div className={ classes[`item_${props.view}`] }>
      <input type="checkbox" checked={ employee.checked } onChange={ () => props.handleChange() } />
      <span className={ classes.name }>{ employee.name }</span>
      { props.view == "table" && <span>{ employee.account }</span> }
      { props.view == "table" && <span>{ employee.email }</span> }
      { props.view == "tiles" && <img src={ personImage } alt="" width="130" height="130" /> }
      <span className={ `${classes.group} ${!employee.group ? classes.groupUnmanaged : false}` }>{ employee.group ? employee.group : "Unmanaged" }</span>
      { props.view !== "groups" && <span className={ classes.phone }>{ employee.phone }</span> }
    </div>
  );
}