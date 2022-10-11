import React from "react";

export default function ListElement(props) {
  const employee = props.employee;

  return (
    <div className="list__item">
      <form action="">
        <input type="checkbox" checked={employee.checked} onChange={() => props.handleChange(props.index)} name="" id="" />
      </form>
      <span>{ `${employee.first_name} ${employee.last_name}` }</span>
      <span>{ `companydomain/${employee.first_name}${employee.last_name}` }</span>
      <span>{ employee.email }</span>
      <span>{ employee.group ? employee.group : "Unmanaged" }</span>
      <span>{ employee.phone }</span>
    </div>
  );
}