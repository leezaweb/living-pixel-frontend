let site;

const getSites = () =>
  fetch("http://localhost:3000/api/v1/sites")
    .then(resp => resp.json())
    .then(json => {
      // debugger;
      site = {
        version: json[0].version,
        url: json[0].url,
        title: json[0].title,
        team: json[0].teams,
        sections: json[0].sections,
        body: json[0].body,
        header: json[0].header,
        footer: json[0].footer
      };
      return site;
    });

export function fetchSites() {
  return { type: "FETCH_SITES", sites: getSites() };
}

export function createSite() {
  return {
    type: "CREATE_SITE"
  };
}

export function updateSiteInfo() {
  return {
    type: "UPDATE_SITE_INFO"
  };
}

export function deleteSite() {
  return {
    type: "DELETE_SITE"
  };
}

export function logIntoSite() {
  return {
    type: "LOG_INTO_SITE",
    site: getSites()
  };
}

export function addElement() {
  return {
    type: "ADD_ELEMENT"
  };
}

export function updateElement() {
  return {
    type: "UPDATE_ELEMENT"
  };
}

export function updateProperty() {
  return {
    type: "UPDATE_PROPERTY"
  };
}

export function deleteElement() {
  return {
    type: "DELETE_ELEMENT"
  };
}

export function selectElement() {
  return {
    type: "SELECT_ELEMENT"
  };
}
