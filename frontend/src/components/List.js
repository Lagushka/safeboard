import React, { useEffect, useReducer, useRef, useState } from "react";
import axios from "axios";
import ListElement from "./ListElement.js";

const ACTIONS = {
  SET_ARRAY: 'SET-ARRAY',
  SELECT_ALL: 'SELECT-ALL',
  SELECT_ONE: 'SELECT-ONE',
}

export default function List() {
  const [employeesList, dispatch] = useReducer(reducer, []); 
  const [checkAll, setCheckAll] = useState(false);
  const [order, setOrder] = useState({
    name: true,
    account: false,
    email: false,
    group: false,
    phone: false
  });
  const buttonElements = {
    name: useRef(null),
    account: useRef(null),
    email: useRef(null),
    group: useRef(null),
    phone: useRef(null)
  };

  function reducer(state, action) {
    switch (action.type) {
      case ACTIONS.SET_ARRAY:
        return action.payload;
      case ACTIONS.SELECT_ALL:
        return state.map(element => ({
          ...element,
          checked: action.payload
        }));
      case ACTIONS.SELECT_ONE:
        return state.map((element, index) => index === action.payload ? ({
          ...element,
          checked: !state[action.payload].checked
        }) : element);
    }
  }

  function handleChangeAll() {
    dispatch({type: ACTIONS.SELECT_ALL, payload: !checkAll});
    setCheckAll(!checkAll);
  }

  function handleChange(index) {
    dispatch({type: ACTIONS.SELECT_ONE, payload: index});
  }

  function sortEmployees(property) {
    let bufferArray = employeesList;
    if (!order[property]) {
      bufferArray.sort((a, b) => {
        if (a[property] > b[property] || a[property] === null) {
          return 1;
        }
        if (a[property] < b[property] || b[property] === null) {
          return -1;
        }
        return 0;
      }) 
    } else {
      bufferArray.sort((a, b) => {
        if (a[property] < b[property] || b[property] === null) {
          return 1;
        }
        if (a[property] > b[property] || a[property] === null) {
          return -1;
        }
        return 0;
      }) 
    }

    setOrder({
      name: true,
      account: false,
      email: false,
      group: false,
      phone: false,
      [property]: !order[property]
    });

    dispatch({type: ACTIONS.SET_ARRAY, payload: bufferArray});
    buttonElements[property].current.blur();
  }

  useEffect(() => {
    axios.get('http://localhost:3000/list')
      .then(response => {
        let newArray = response.data;
        for (let element of newArray) {
          element.first_name.replace(" ", "");
          element.last_name.replace(" ", "");
          element.email.replace(" ", "");
          element.checked = false;
          element.name = `${element.first_name} ${element.last_name}`
          element.account = `companydomain/${element.first_name}${element.last_name}`;
        }
  
        newArray.sort((a, b) => {
          if (a.first_name > b.lastName) {
            return 1;
          }
          if (a.first_name < b.first_name) {
            return -1;
          }
          return 0;
        });
        dispatch({type: ACTIONS.SET_ARRAY, payload: newArray});
      })
      .catch(error => console.log(error));
  }, [])

  return (
    <div className="list">
      <div className="list__head">
        <form action="">
          <input type="checkbox" checked={checkAll} onChange={() => handleChangeAll()} name="" id="" />
        </form>
        <button onClick={ () => sortEmployees('name') } ref={buttonElements.name} ><span>Полное имя</span></button>
        <button onClick={ () => sortEmployees('account') } ref={buttonElements.account}><span>Учетная запись</span></button>
        <button onClick={ () => sortEmployees('email') } ref={buttonElements.email}><span>Электронная почта</span></button>
        <button onClick={ () => sortEmployees('group') } ref={buttonElements.group}><span>Группа</span></button>
        <button onClick={ () => sortEmployees('phone') } ref={buttonElements.phone}><span>Номер телефона</span></button>
      </div>
      {employeesList.map((employee, index) => 
        <ListElement key={employee.id} employee={employee} handleChange={handleChange} index={index} />
      )}
    </div>
  );
}