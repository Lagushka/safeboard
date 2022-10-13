import React, { useEffect, useReducer, useState } from "react";
import axios from "axios";
import ListElement from "../ListElement/ListElement";
import Menu from "../Menu/Menu";
import {formGroups, getSelectedEmployees, getSortedEmployees } from "../../utils";
import classes from "./List.module.scss";
import Group from "../Group/Group";

export const ACTIONS = {
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
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("table");
  // const [groups, setGroups] = useState({});

  function reducer(state, action) {
    switch (action.type) {
      case ACTIONS.SET_ARRAY:
        return action.payload;
      case ACTIONS.SELECT_ALL: {
        return state.map(element => ({
          ...element,
          checked: action.payload
        }));
      }
      case ACTIONS.SELECT_ONE: {
        return state.map(element => element.id === action.payload ? ({
          ...element,
          checked: !element.checked
        }) : element);
      }
    }
  }

  function handleChangeAll() {
    dispatch({type: ACTIONS.SELECT_ALL, payload: !checkAll});
    setCheckAll(!checkAll);
    // if (view == "groups") {
    //   createGroups();
    // }
  }

  function handleChange(id) {
    dispatch({type: ACTIONS.SELECT_ONE, payload: id});
  }

  function sortEmployees(property) {
    getSortedEmployees(employeesList, property, order);
    
    setOrder({
      name: false,
      account: false,
      email: false,
      group: false,
      phone: false,
      [property]: !order[property]
    });
  }

  function createGroups() {
    return formGroups(getSelectedEmployees(employeesList, searchTerm));
  }

  function handleSearch(input) {
    setSearchTerm(input);
  }

  useEffect(() => {
    axios.get('http://localhost:3000/list')
      .then(response => {
        const {data} = response;
        for (let element of data) {
          element.first_name.replace(" ", "");
          element.last_name.replace(" ", "");
          element.email.replace(" ", "");
          element.checked = false;
          element.name = `${element.first_name} ${element.last_name}`
          element.account = `companydomain/${element.first_name}${element.last_name}`;
        }
  
        data.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          return 0;
        });
        dispatch({type: ACTIONS.SET_ARRAY, payload: data});
      })
      .catch(error => console.err(error));
  }, [])

  return (
    <div className={ classes.listPage }>
      <Menu handleSearch={ handleSearch } setView={ setView } view={view} checkAll={checkAll} handleChangeAll={handleChangeAll} /*createGroups={createGroups}*/ />
      <div className={ classes[`list_${view}`]}>
        { view == "table" &&
          <div className={ classes[`list_${view}__head`] }>
            <input type="checkbox" checked={checkAll} onChange={() => handleChangeAll()} />
            <button onClick={ () => sortEmployees('name') }><span>Полное имя</span></button>
            <button onClick={ () => sortEmployees('account') }><span>Учетная запись</span></button>
            <button onClick={ () => sortEmployees('email') }><span>Электронная почта</span></button>
            <button onClick={ () => sortEmployees('group') }><span>Группа</span></button>
            <button onClick={ () => sortEmployees('phone') }><span>Номер телефона</span></button>
          </div>
        }
        
        { view !== "groups" ?
          getSelectedEmployees(employeesList, searchTerm).map(employee => 
            <ListElement key={ employee.id } employee={ employee } handleChange={ () => handleChange(employee.id) } view={ view } />
          )
          : 
          Object.keys(createGroups()).map(key =>
            <Group key={key} group={ createGroups()[key] } name={ createGroups()[key][0].group } handleChange={handleChange} view={ view } />
          )
        }
      </div>
    </div>
  );
}