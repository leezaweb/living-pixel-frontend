const SITE_URL = "http://localhost:3000/api/v1/sites";

const siteFetcher = dispatch => {
  fetch(`${SITE_URL}/1`)
    .then(resp => resp.json())
    .then(json => {
      setTimeout(
        () =>
          dispatch(
            updateSite({
              version: json.version,
              url: json.url,
              title: json.title,
              team: json.teams,
              sections: json.sections,
              body: json.body,
              header: json.header,
              footer: json.footer
            })
          ),
        100
      );
    });
};

const sitesFetcher = dispatch => {
  console.log("updating");
  fetch(SITE_URL)
    .then(resp => resp.json())
    .then(json => {
      dispatch(
        updateSites({
          version: json.version,
          url: json.url,
          title: json.title,
          team: json.teams,
          sections: json.sections,
          body: json.body,
          header: json.header,
          footer: json.footer
        })
      );
    });
};

export function updateSites(sites) {
  console.log("updating");
  return { type: "UPDATE_SITES", sites };
}

export const fetchSites = () => {
  const thunk = dispatch => {
    sitesFetcher(dispatch);
    dispatch({ type: "FETCH_SITES" });
  };

  return thunk;
};

export function createSite() {
  return {
    type: "CREATE_SITE"
  };
}

export function deleteSite() {
  return {
    type: "DELETE_SITE"
  };
}

export function updateSite(site) {
  return { type: "UPDATE_SITE", site };
}

export function fetchSite() {
  const thunk = dispatch => {
    siteFetcher(dispatch);

    dispatch({ type: "FETCH_SITES" });
  };

  return thunk;
}

export function addElement() {
  return {
    type: "ADD_ELEMENT"
  };
}

// export function updateElement() {
//   return {
//     type: "UPDATE_ELEMENT"
//   };
// }

export const updateElement = object => {
  // debugger;

  const thunk = dispatch => {
    elementUpdator(dispatch, object);
  };

  return thunk;
};

const elementUpdator = (dispatch, object) => {
  let id = object.element[object.key].id;

  const ELEMENT_STYLE_URL = `http://localhost:3000/api/v1/${object.key}s`;

  let data =
    "value" in object
      ? {
          id: object.element[object.key].id,
          [object.name]: object.value
        }
      : {
          grid_column_start: object.grid_column_start,
          grid_column_end: object.grid_column_end,
          grid_row_start: object.grid_row_start,
          grid_row_end: object.grid_row_end
        };

  fetch(`${ELEMENT_STYLE_URL}/${id}`, {
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "PATCH"
  })
    .then(resp => console.log(resp))
    .then(
      fetch(`${SITE_URL}/1`)
        .then(resp => {
          return resp.json();
        })
        .then(json => {
          dispatch(
            updateSite({
              version: json.version,
              url: json.url,
              title: json.title,
              team: json.teams,
              sections: json.sections,
              body: json.body,
              header: json.header,
              footer: json.footer
            })
          );
        })
    );
};

export function deleteElement() {
  return {
    type: "DELETE_ELEMENT"
  };
}

export function selectElement(element) {
  return {
    type: "SELECT_ELEMENT",
    element
  };
}
