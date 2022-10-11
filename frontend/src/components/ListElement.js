import React from "react";

export default function ListElement(props) {
  const employee = props.employee;

  return (
    <div className="list__item">
      <form action="">
        <input type="checkbox" checked={employee.checked} onChange={() => props.handleChange(employee.id)} name="" id="" />
      </form>
      <span>{ employee.name }</span>
      <span>{ employee.account }</span>
      <span>{ employee.email }</span>
      <span>{ employee.group ? employee.group : "Unmanaged" }</span>
      <span>{ employee.phone }</span>
    </div>
  );
}