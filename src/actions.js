import { EditorState, convertToRaw, convertFromRaw } from "draft-js";

const SECTION_URL = "http://localhost:3000/api/v1/sections";
const PUBLISHED_URL = "http://localhost:3000/api/v1/published-sites";
const ELEMENT_URL = `http://localhost:3000/api/v1/elements`;
const SITE_URL = `http://localhost:3000/api/v1/sites`;

export const updateSite = object => {
  const thunk = (dispatch, getState) => {
    siteUpdater(object, dispatch, getState);
  };
  return thunk;
};

const siteUpdater = (object, dispatch, getState) => {
  let data = {
    url: object.url,
    title: object.title,
    id: getState().activeSite.id
  };
  console.log(data, getState().activeSite.id);
  fetch(`${SITE_URL}/${data.id}`, {
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "PATCH"
  })
    .then(resp => console.log(resp))
    .then(() =>
      fetch(`${SITE_URL}/${data.id}`)
        .then(resp => {
          return resp.json();
        })
        .then(json => {
          dispatch(renderSite(siteWithEditors(json)));
        })
    );
};

export const handleChangeComplete = (color, element) => {
  let key = Object.keys(element).find(k => k.includes("style"));
  const thunk = (dispatch, getState) => {
    elementUpdator(
      {
        key: key,
        background_color: color.hex,
        element: element
      },
      dispatch,
      getState
    );
  };
  [...document.querySelectorAll(".circle-picker")].forEach(cp => cp.remove());
  return thunk;
};

export const dragEnd = e => {
  const thunk = (dispatch, getState) => {
    console.log("end");
    if (e.screenX > 970 || e.target.dataset.type) {
      this.dragged.style.opacity = "1";
      let data;
      if (this.over) {
        switch (this.dragged.dataset.type) {
          case "section":
            data = {
              id: this.dragged.dataset.id,
              over: this.over.dataset.id,
              site: this.dragged.dataset.site,
              key: this.dragged.dataset.id
            };
            // debugger;

            fetch(`${SECTION_URL}/${this.dragged.dataset.id}`, {
              body: JSON.stringify(data),
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
              },
              method: "PATCH"
            })
              .then(resp => console.log(resp))
              .then(() =>
                fetch(`${SITE_URL}/${getState().activeSite.id}`)
                  .then(resp => resp.json())
                  .then(json => {
                    dispatch(renderSite(siteWithEditors(json)));
                  })
              );
            break;
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
                fetch(`${SITE_URL}/${getState().activeSite.id}`)
                  .then(resp => resp.json())
                  .then(json => {
                    dispatch(renderSite(siteWithEditors(json)));
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
                fetch(`${SITE_URL}/${getState().activeSite.id}`)
                  .then(resp => resp.json())
                  .then(json => {
                    dispatch(renderSite(siteWithEditors(json)));
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
    }
  };
  return thunk;
};

export const dragStart = e => {
  e.stopPropagation();
  const thunk = (dispatch, getState) => {
    console.log("start");

    if (e.screenX > 970 || e.target.dataset.type) {
      this.dragged = e.currentTarget;
      this.dragged.style.opacity = "0.5";
    }
  };
  return thunk;
};
export const dragOver = e => {
  const thunk = (dispatch, getState) => {
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

const siteFetcher = (object, dispatch, getState) => {
  if (object.id) {
    fetch(`${SITE_URL}/${object.id}`)
      .then(resp => resp.json())
      .then(json => {
        dispatch(renderSite(siteWithEditors(json)));
      });
  } else {
    fetch(`${PUBLISHED_URL}/${object.url}`)
      .then(resp => resp.json())
      .then(json => {
        dispatch(renderSite(siteWithEditors(json)));
      });
  }
};

const sitesFetcher = (dispatch, getState) => {
  fetch(SITE_URL)
    .then(resp => resp.json())
    .then(json => {
      dispatch(
        renderSites({
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

export function renderSites(sites) {
  return { type: "UPDATE_SITES", sites };
}
export function renderSite(site) {
  return { type: "UPDATE_SITE", site };
}

export const fetchSites = () => {
  const thunk = (dispatch, getState) => {
    sitesFetcher(dispatch, getState);
  };

  return thunk;
};

export function createSite() {
  const thunk = (dispatch, getState) => {
    siteCreator(dispatch, getState);
  };

  return thunk;
}

const siteCreator = (dispatch, getState) => {
  fetch(`${SITE_URL}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "POST"
  })
    .then(resp => resp.json())
    .then(json => {
      dispatch(renderSite(siteWithEditors(json)));
    });
};

export function deleteSite() {
  return {
    type: "DELETE_SITE"
  };
}

export function fetchSite(object) {
  const thunk = (dispatch, getState) => {
    siteFetcher(object, dispatch, getState);
  };

  return thunk;
}

export const cloneOrganism = object => {
  const thunk = (dispatch, getState) => {
    organismCloner(object, dispatch, getState);
  };

  return thunk;
};

const organismCloner = (object, dispatch, getState) => {
  let data = {
    key: object.key,
    site: getState().activeSite.id
  };
  console.log("gonna clone template");

  fetch(`${SITE_URL}/${getState().activeSite.id}`, {
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "PATCH"
  })
    .then(resp => console.log(resp))
    .then(() =>
      fetch(`${SITE_URL}/${getState().activeSite.id}`)
        .then(resp => {
          return resp.json();
        })
        .then(json => {
          dispatch(renderSite(siteWithEditors(json)));
        })
    );
};

export const cloneElement = object => {
  const thunk = (dispatch, getState) => {
    elementCloner(object, dispatch, getState);
  };

  return thunk;
};

const elementCloner = (object, dispatch, getState) => {
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
      fetch(`${SITE_URL}/${getState().activeSite.id}`)
        .then(resp => {
          return resp.json();
        })
        .then(json => {
          dispatch(renderSite(siteWithEditors(json)));
        })
    );
};

export const updateElement = object => {
  const thunk = (dispatch, getState) => {
    if ("editorState" in object) {
      dispatch({
        type: "UPDATE_ELEMENT",
        payload: { editorState: object.editorState, element: object.element }
      });
    }

    elementUpdator(object, dispatch, getState);
  };

  return thunk;
};

export const updateElementGrid = object => {
  const thunk = (dispatch, getState) => {
    elementGridUpdator(object, dispatch, getState);
  };

  return thunk;
};

const elementGridUpdator = (object, dispatch, getState) => {
  let id = object.element[object.key].id;
  let data = {
    grid_column_start: object.grid_column_start,
    grid_column_end: object.grid_column_end,
    grid_row_start: object.grid_row_start,
    grid_row_end: object.grid_row_end
  };

  fetchToStyleGrid(object, data, id, dispatch, getState);
};

const elementUpdator = (object, dispatch, getState) => {
  let id;
  let data;

  if ("editorState" in object) {
    // debugger;
    data = {
      id: object.element.id,
      inner_text: JSON.stringify(
        convertToRaw(object.editorState.getCurrentContent())
      )
    };

    fetchToElementText(object, data, object.element.id, dispatch, getState);
  } else if ("src" in object) {
    object.key = "element";
    data = {
      element: object.element,
      src: object.src
    };

    fetchToElement(object, data, object.element.id, dispatch, getState);
  } else if ("background_image" in object) {
    object.key = "section";
    data = {
      element: object.element,
      background_image: object.background_image
    };

    fetchToElement(object, data, object.element.id, dispatch, getState);
  } else if ("background_color" in object) {
    id = object.element[object.key].id;
    data = {
      background_color: object.background_color
    };

    fetchToStyle(object, data, id, dispatch, getState);
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

    fetchToStyle(object, data, id, dispatch, getState);
  }
};

const fetchToElementText = (object, data, id, dispatch, getState) => {
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
  }).then(resp => console.log(resp));
};

const fetchToElement = (object, data, id, dispatch, getState) => {
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
    .then(() => {
      fetch(`${SITE_URL}/${getState().activeSite.id}`)
        .then(resp => {
          console.log(resp);
          return resp.json();
        })
        .then(json => {
          dispatch(renderSite(siteWithEditors(json)));
        });
    });
};

const fetchToStyleGrid = (object, data, id, dispatch, getState) => {
  const ELEMENT_STYLE_URL = `http://localhost:3000/api/v1/${object.key}s`;

  fetch(`${ELEMENT_STYLE_URL}/${id}`, {
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    method: "PATCH"
  }).then(resp => console.log(resp));
};

const fetchToStyle = (object, data, id, dispatch, getState) => {
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
      fetch(`${SITE_URL}/${getState().activeSite.id}`)
        .then(resp => {
          return resp.json();
        })
        .then(json => {
          dispatch(renderSite(siteWithEditors(json)));
        })
    );
};

export const deleteElement = object => {
  const thunk = (dispatch, getState) => {
    elementDeleter(object, dispatch, getState);
  };

  return thunk;
};

const elementDeleter = (object, dispatch, getState) => {
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
      fetch(`${SITE_URL}/${getState().activeSite.id}`)
        .then(resp => {
          return resp.json();
        })
        .then(json => {
          dispatch(renderSite(siteWithEditors(json)));
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
  const thunk = (dispatch, getState) => {
    dispatch({
      type: "UPDATE_EDITING",
      editing
    });
    let object = { id: getState().activeSite.id };
    siteFetcher(object, dispatch, getState);
  };

  return thunk;
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
