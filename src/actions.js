import { EditorState, convertToRaw, convertFromRaw } from "draft-js";

const SITE_URL = "http://localhost:3000/api/v1/sites";

const mapSectionsToEditors = json => {
  return json.sections.map(section => {
    let elems = section.elements.map(element => {
      if (element.inner_text) {
        let stub = convertFromRaw(JSON.parse(element.inner_text));

        return {
          ...element,
          editorState: EditorState.createWithContent(stub)
        };
      } else {
        return element;
      }
    });

    return { ...section, elements: elems };
  });
};

const siteFetcher = dispatch => {
  fetch(`${SITE_URL}/1`)
    .then(resp => resp.json())
    .then(json => {
      dispatch(updateSite(siteWithEditors(json)));
    });
};

const sitesFetcher = dispatch => {
  fetch(SITE_URL)
    .then(resp => resp.json())
    .then(json => {
      dispatch(
        updateSites({
          version: json.version,
          url: json.url,
          title: json.title,
          team: json.teams,
          sections: mapSectionsToEditors(json),
          body: json.body,
          header: {
            ...json.header,
            editorState: EditorState.createWithContent(
              convertFromRaw(JSON.parse(json.header.inner_text))
            )
          },
          footer: {
            ...json.footer,
            editorState: EditorState.createWithContent(
              convertFromRaw(JSON.parse(json.footer.inner_text))
            )
          }
        })
      );
    });
};

export function updateSites(sites) {
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

export const cloneElement = object => {
  const thunk = dispatch => {
    // dispatch({
    //   type: "CLONE_ELEMENT",
    //   element: object.element
    // });

    elementCloner(dispatch, object);
  };

  return thunk;
};

const elementCloner = (dispatch, object) => {
  const ELEMENT_URL = `http://localhost:3000/api/v1/elements`;

  let data = {
    id: object.element.id
  };
  console.log("gonna clone");

  fetch(`${ELEMENT_URL}`, {
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST"
  })
    .then(resp => console.log(resp))
    .then(
      fetch(`${SITE_URL}/1`)
        .then(resp => {
          return resp.json();
        })
        .then(json => {
          dispatch(updateSite(siteWithEditors(json)));
        })
    );
};

export const updateElement = object => {
  const thunk = dispatch => {
    if ("editorState" in object) {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: { editorState: object.editorState, element: object.element }
      });
    }

    elementUpdator(dispatch, object);
  };

  return thunk;
};

const elementUpdator = (dispatch, object) => {
  let id;
  let data;

  if ("editorState" in object) {
    // console.log(object.editorState.getCurrentContent().getPlainText());
    data = {
      id: object.id,
      inner_text: JSON.stringify(
        convertToRaw(object.editorState.getCurrentContent())
      )
    };

    fetchToElement(object, data, object.element.id, dispatch);
  } else {
    if ("value" in object) {
      id = object.element[object.key].id;
      data = {
        id: object.element[object.key].id,
        [object.name]: object.value
      };
    } else {
      id = object.element[object.key].id;
      data = {
        grid_column_start: object.grid_column_start,
        grid_column_end: object.grid_column_end,
        grid_row_start: object.grid_row_start,
        grid_row_end: object.grid_row_end
      };
    }

    fetchToStyle(object, data, id, dispatch);
  }
};

const fetchToElement = (object, data, id, dispatch) => {
  const ELEMENT_URL = `http://localhost:3000/api/v1/${object.key.replace(
    "_style",
    ""
  )}s`;

  fetch(`${ELEMENT_URL}/${id}`, {
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "PATCH"
  })
    .then(resp => console.log(resp))
    .then(
      fetch(`${SITE_URL}/1`).then(resp => {
        return resp.json();
      })
      // .then(json => {
      //   dispatch(
      //     updateSite({
      //       version: json.version,
      //       url: json.url,
      //       title: json.title,
      //       team: json.teams,
      //       sections: mapSectionsToEditors(json),
      //       body: json.body,
      //       header: json.header,
      //       footer:  {
      //   ...json.footer,
      //   editorState: EditorState.createWithContent(
      //     convertFromRaw(JSON.parse(json.footer.inner_text))
      //   )
      // }
      //     })
      //   );
      // })
    );
};

const fetchToStyle = (object, data, id, dispatch) => {
  const ELEMENT_STYLE_URL = `http://localhost:3000/api/v1/${object.key}s`;

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
          dispatch(updateSite(siteWithEditors(json)));
        })
    );
};

export const deleteElement = object => {
  const thunk = dispatch => {
    // dispatch({
    //   type: "DELETE_ELEMENT",
    //   payload: {element: object.element }
    // });

    elementDeleter(dispatch, object);
  };

  return thunk;
};

const elementDeleter = (dispatch, object) => {
  debugger;
  const ELEMENT_URL = `http://localhost:3000/api/v1/elements/`;

  let id = object.element.id;

  let data = {
    id: object.element.id
  };

  fetch(`${ELEMENT_URL}/${id}`, {
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "DELETE"
  })
    .then(resp => console.log(resp))
    .then(
      fetch(`${SITE_URL}/1`)
        .then(resp => {
          return resp.json();
        })
        .then(json => {
          dispatch(updateSite(siteWithEditors(json)));
        })
    );
};

export function selectElement(element) {
  console.log("id", element.id);
  return {
    type: "SELECT_ELEMENT",
    element
  };
}

export function updateEditing(event, element, editing) {
  return {
    type: "UPDATE_EDITING",
    editing
  };
}

// editorState: EditorState.createWithContent(
//   convertFromRaw(element.inner_text)
// )
// editorState: EditorState.createWithContent(
//   ContentState.createFromText(element.inner_text)
// )

const siteWithEditors = json => {
  return {
    version: json.version,
    url: json.url,
    title: json.title,
    team: json.teams,
    sections: mapSectionsToEditors(json),
    body: json.body,
    header: {
      ...json.header,
      editorState: EditorState.createWithContent(
        convertFromRaw(JSON.parse(json.header.inner_text))
      )
    },
    footer: {
      ...json.footer,
      editorState: EditorState.createWithContent(
        convertFromRaw(JSON.parse(json.footer.inner_text))
      )
    }
  };
};
