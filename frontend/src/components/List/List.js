import React, { useEffect, useState } from "react";
import axios from "axios";
import ListElement from "../ListElement/ListElement";
import Menu from "../Menu/Menu";
import {formGroups, getSelectedEmployees, getSortedEmployees } from "../../utils";
import classes from "./List.module.scss";
import Group from "../Group/Group";
import scrollToTop from "./up.svg";
import sortDown from "./sort_down.svg";
import sortUp from "./sort_up.svg";

export default function List() { 
  const [employeesList, setEmployeesList] = useState([]);
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
  const [elementsEnd, setElementsEnd] = useState(70);
  const [groupsEnd, setGroupsEnd] = useState(20);
  const [propertySorted, setPropertySorted] = useState({
    name: true,
    account: false,
    email: false,
    group: false,
    phone: false
  });

  function handleChangeAll() {
    setEmployeesList(employeesList.map(element => ({
      ...element,
      checked: !checkAll
    })));
    setCheckAll(!checkAll);
  }

  function handleChange(id) {
    setEmployeesList(employeesList.map(element => element.id === id ? ({
      ...element,
      checked: !element.checked
    }): element))
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

    setPropertySorted({
      name: false,
      account: false,
      email: false,
      group: false,
      phone: false,
      [property]: true
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
        for (const element of data) {
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
        setEmployeesList(data);
      })
      .catch(error => console.err(error));
    
  }, []);

  window.onscroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
      if (employeesList.length >= elementsEnd + 70) {
        setElementsEnd(elementsEnd + 70);
      } else {
        setElementsEnd(employeesList.length);
      }
      if (Object.keys(createGroups()).length >= groupsEnd + 20) {
        setGroupsEnd(groupsEnd + 20)
      } else {
        setGroupsEnd(Object.keys(createGroups()).length);
      }
    }
    console.log(groupsEnd);
  };

  return (
    <div className={ classes.listPage }>
      <Menu handleSearch={ handleSearch } setView={ setView } view={ view } checkAll={ checkAll } handleChangeAll={ handleChangeAll } setGroupsEnd={ setGroupsEnd } setElementsEnd={ setElementsEnd } sortEmployees={ () => {
        setOrder({
          name: true,
          account: false,
          email: false,
          group: false,
          phone: false,
        });
        setPropertySorted({
          name: true,
          account: false,
          email: false,
          group: false,
          phone: false
        });
        getSortedEmployees(employeesList, "name", {
          name: false,
          account: false,
          email: false,
          group: false,
          phone: false,
        })} } />
      <div className={ classes[`list_${view}`]}>
        { view == "table" &&
          <div className={ classes[`list_${view}__head`] }>
            <input type="checkbox" checked={ checkAll } onChange={ () => handleChangeAll() } />
            <button onClick={ () => sortEmployees('name') }>
              <span>Полное имя</span>
              { propertySorted.name && order.name && <img src={ sortUp } alt="" width="20" /> }
              { propertySorted.name && !order.name && <img src={ sortDown } alt="" width="20" /> }
            </button>
            <button onClick={ () => sortEmployees('account') }>
              <span>Учетная запись</span>
              { propertySorted.account && order.account && <img src={ sortUp } alt="" width="20" /> }
              { propertySorted.account && !order.account && <img src={ sortDown } alt="" width="20" /> }
            </button>
            <button onClick={ () => sortEmployees('email') }>
              <span>Электронная почта</span>
              { propertySorted.email && order.email && <img src={ sortUp } alt="" width="20" /> }
              { propertySorted.email && !order.email && <img src={ sortDown } alt="" width="20" /> }
            </button>
            <button onClick={ () => sortEmployees('group') }>
              <span>Группа</span>
              { propertySorted.group && order.group && <img src={ sortUp } alt="" width="20" /> }
              { propertySorted.group && !order.group && <img src={ sortDown } alt="" width="20" /> }
            </button>
            <button onClick={ () => sortEmployees('phone') }>
              <span>Номер телефона</span>
              { propertySorted.phone && order.phone && <img src={ sortUp } alt="" width="20" /> }
              { propertySorted.phone && !order.phone && <img src={ sortDown } alt="" width="20" /> }
            </button>
          </div>
        }
        
        { view !== "groups" ?
          getSelectedEmployees(employeesList, searchTerm).slice(0, elementsEnd).map(employee => 
            <ListElement key={ employee.id } employee={ employee } handleChange={ () => handleChange(employee.id) } view={ view } />
        )
          : 
          Object.keys(createGroups()).slice(0, groupsEnd).map(key =>
            <Group key={key} group={ createGroups()[key] } name={ createGroups()[key][0].group } handleChange={handleChange} view={ view } />
          )
        }
      </div>
      <button className={ classes.scrollToTopButton } onClick={ () => window.scrollTo(0, 0) }> 
        <img src={scrollToTop} alt="" /> 
      </button>
    </div>
  );
}