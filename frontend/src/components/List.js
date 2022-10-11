import React, { useEffect, useReducer, useState } from "react";
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
    setCheckAll(!checkAll);
    dispatch({type: ACTIONS.SELECT_ALL, payload: !checkAll});
  }

  function handleChange(index) {
    dispatch({type: ACTIONS.SELECT_ONE, payload: index});
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
        <span>Полное имя</span>
        <span>Учетная запись</span>
        <span>Электронная почта</span>
        <span>Группа</span>
        <span>Номер телефона</span>
      </div>
      {employeesList.map((employee, index) => 
        <ListElement key={employee.id} employee={employee} handleChange={handleChange} index={index} />
      )}
    </div>
  );
}