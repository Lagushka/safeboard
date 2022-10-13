import React from "react";
import ListElement from "../ListElement/ListElement";
import classes from "./Group.module.scss";

export default function Group(props) {
  return (
    <div className={ classes.group }>
      <span className={ classes.groupName }>{ props.name }</span>
      <div className={ classes.groupList }>
        { props.group.map(employee => 
          <ListElement key={ employee.id } employee={ employee } handleChange={ () => props.handleChange(employee.id) } view={ props.view } />) 
        }
      </div>
    </div>
  );
}