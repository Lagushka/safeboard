import React from "react";
import styles from "./ListElement.module.scss";
import personImage from "./person.svg";

export default function ListElement(props) {
  const employee = props.employee;

  return (
    <div className={ styles[`item_${props.view}`] }>
      <input type="checkbox" checked={ employee.checked } onChange={ () => props.handleChange(employee.id) } />
      <span className={ styles.name }>{ employee.name }</span>
      { props.view == "table" && <span>{ employee.account }</span> }
      { props.view == "table" && <span>{ employee.email }</span> }
      { props.view == "tiles" && <img src={ personImage } alt="" width="130" height="130" /> }
      <span className={ `${styles.group} ${!employee.group ? styles.groupUnmanaged : false}` }>{ employee.group ? employee.group : "Unmanaged" }</span>
      <span className={ styles.phone }>{ employee.phone }</span>
    </div>
  );
}