import React from "react";
import { ACTIONS } from "./components/List/List";

export const getSortedEmployees = function(employees, property, order) {
  if (!order[property]) {
    employees.sort((a, b) => {
      if (a[property] > b[property] || a[property] === null) {
        return 1;
      }
      if (a[property] < b[property] || b[property] === null) {
        return -1;
      }
      return 0;
    }) 
  } else {
    employees.sort((a, b) => {
      if (a[property] < b[property] || b[property] === null) {
        return 1;
      }
      if (a[property] > b[property] || a[property] === null) {
        return -1;
      }
      return 0;
    }) 
  }
}

export const displayData = function(array, searchTerm, dispatch, ListElement, view) {
  return array.filter((element) => {
    if (searchTerm == "") {
      return true
    } else {
      return `${element.name} ${element.account} ${element.email} ${element.group} ${element.phone.replace(" ", "")}`.toLowerCase().includes(searchTerm.toLowerCase().trim())
    }
  }).map(employee => 
    <ListElement key={ employee.id } employee={ employee } handleChange={ () => dispatch({type: ACTIONS.SELECT_ONE, payload: employee.id}) } view={ view } />
  )
}