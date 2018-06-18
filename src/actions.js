import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
const SECTION_URL = "http://localhost:3000/api/v1/sections";
const ELEMENT_URL = `http://localhost:3000/api/v1/elements`;
const SITE_URL = `http://localhost:3000/api/v1/sites`;

export const handleChangeComplete = (color, element) => {
  let key = Object.keys(element).find(key => key.includes("_style"));
  const thunk = dispatch => {
    elementUpdator(dispatch, {
      key: key,
      background_color: color.hex,
      element: element
    });
  };
  [...document.querySelectorAll(".circle-picker")].forEach(cp => cp.remove());
  return thunk;
};

export const dragEnd = e => {
  const thunk = dispatch => {
    console.log("end");
    this.dragged.style.opacity = "1";
    let data;
    if (this.over) {
      switch (this.dragged.dataset.type) {
        case "molecule":
          data = {
            section: this.over.dataset.id,
            site: this.dragged.dataset.site,
            key: this.dragged.dataset.id
          };

          fetch(SECTION_URL, {
            body: JSON.stringify(data),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            method: "POST"
          })
            .then(resp => console.log(resp))
            .then(() =>
              fetch(`${SITE_URL}/1`)
                .then(resp => resp.json())
                .then(json => {
                  dispatch(updateSite(siteWithEditors(json)));
                })
            );
          break;
        case "atom":
          console.log(this.dragged.dataset);
          data = {
            section: this.over.dataset.id,
            site: this.dragged.dataset.site,
            key: this.dragged.dataset.id
          };

          fetch(ELEMENT_URL, {
            body: JSON.stringify(data),
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            method: "POST"
          })
            .then(resp => console.log(resp))
            .then(() =>
              fetch(`${SITE_URL}/1`)
                .then(resp => resp.json())
                .then(json => {
                  dispatch(updateSite(siteWithEditors(json)));
                })
            );
          break;
        default:
      }
      console.log(
        `"${this.dragged.dataset.id}" dragged over Section ${
          this.over.dataset.id
        }`
      );

      console.log(this.dragged.dataset.id);
      console.log(this.over.dataset.id);
    }
  };
  return thunk;
};

export const dragStart = e => {
  const thunk = dispatch => {
    console.log("start");
    this.dragged = e.currentTarget;
    this.dragged.style.opacity = "0.5";
  };
  return thunk;
};
export const dragOver = e => {
  const thunk = dispatch => {
    console.log("over");
    e.preventDefault();
    let classList = [...e.target.classList];
    let bool = classList.find(c => c.includes("section-"));
    console.log(bool);
    if (!bool) return;
    if (bool) {
      this.over = e.target;
      dragEnd(e);
    }
    console.log(e.target.tagName);

    console.log(this.over.tagName, this.over.className);
    console.log(this.over.dataset.id);
  };
  return thunk;
};

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
          id: json.id,
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
export function updateSite(site) {
  return { type: "UPDATE_SITE", site };
}

export const fetchSites = () => {
  const thunk = dispatch => {
    sitesFetcher(dispatch);
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

export function fetchSite() {
  const thunk = dispatch => {
    siteFetcher(dispatch);
  };

  return thunk;
}

export const cloneOrganism = object => {
  const thunk = dispatch => {
    organismCloner(dispatch, object);
  };

  return thunk;
};

const organismCloner = (dispatch, object) => {
  let data = {
    site: object.site,
    key: object.key
  };
  console.log("gonna clone template");

  fetch(`${SITE_URL}`, {
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST"
  })
    .then(resp => console.log(resp))
    .then(() =>
      fetch(`${SITE_URL}/1`)
        .then(resp => {
          return resp.json();
        })
        .then(json => {
          dispatch(updateSite(siteWithEditors(json)));
        })
    );
};

export const cloneElement = object => {
  const thunk = dispatch => {
    elementCloner(dispatch, object);
  };

  return thunk;
};

const elementCloner = (dispatch, object) => {
  let data = {
    id: object.element.id,
    key: "clone"
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
    .then(() =>
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
    data = {
      id: object.id,
      inner_text: JSON.stringify(
        convertToRaw(object.editorState.getCurrentContent())
      )
    };

    fetchToElement(object, data, object.element.id, dispatch);
  } else if ("src" in object) {
    object.key = "element";
    data = {
      element: object.element,
      src: object.src
    };

    fetchToElement(object, data, object.element.id, dispatch);
  } else if ("background_image" in object) {
    object.key = "section";
    data = {
      element: object.element,
      background_image: object.background_image
    };

    fetchToElement(object, data, object.element.id, dispatch);
  } else if ("background_color" in object) {
    id = object.element[object.key].id;
    data = {
      background_color: object.background_color
    };

    fetchToStyle(object, data, id, dispatch);
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
    .then(() =>
      fetch(`${SITE_URL}/1`).then(resp => {
        return resp.json();
      })
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
    .then(() =>
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
    elementDeleter(dispatch, object);
  };

  return thunk;
};

const elementDeleter = (dispatch, object) => {
  const ELEMENT_URL = `http://localhost:3000/api/v1/elements`;

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
    .then(() =>
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

const siteWithEditors = json => {
  return {
    id: json.id,
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

// editorState: EditorState.createWithContent(
//   convertFromRaw(element.inner_text)
// )
// editorState: EditorState.createWithContent(
//   ContentState.createFromText(element.inner_text)
// )
// console.log(object.editorState.getCurrentContent().getPlainText());

// e.dataTransfer.effectAllowed = "move";
// e.dataTransfer.setData("text/html", e.currentTarget);
