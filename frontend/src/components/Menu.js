import React from "react";

export default function Menu(props) {
  return (
    <div className="list__menu">
      <input type="text" name="" id="" placeholder="Search..." onChange={event => props.setSearchTerm(event.target.value)} />
    </div>
  )
}