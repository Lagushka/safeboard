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

export const getSelectedEmployees = function(array, searchTerm) {
  return array.filter((element) => {
    if (searchTerm == "") {
      return true
    } else {
      return `${element.name} ${element.account} ${element.email} ${element.group} ${element.phone.replace(" ", "")}`.toLowerCase().includes(searchTerm.toLowerCase().trim())
    }
  })
}

export const formGroups = function(selectedEmployees) {
  let groups = {};
  for (let element of selectedEmployees) {
    if (groups[element.group]) {
      groups[element.group].push(element);
    } else if (element.group !== null) {
      groups[element.group] = [element];
    }
  }

  return groups;
}