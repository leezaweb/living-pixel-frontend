import { combineReducers } from "redux";

const initialState = {
  editing: false,
  loading: true,
  sites: [],
  elements: [],
  users: [],
  activeElement: null,
  activeSite: {},
  activeUser: null
};

const sitesReducer = (state = initialState.sites, action) => {
  switch (action.type) {
    case "UPDATE_SITES":
      return action.sites;
    default:
      return state;
  }
};

const loadingReducer = (state = initialState.loading, action) => {
  switch (action.type) {
    case "FETCH_SITES":
      return true;
    case "UPDATE_SITES":
      return false;
    case "SHOW_SITE":
      return true;
    case "UPDATE_SITE":
      return false;
    default:
      return state;
  }
};

const elementsReducer = (state = initialState.elements, action) => {
  switch (action.type) {
    case "FETCH_ELEMENTS":
      return state;
    default:
      return state;
  }
};

const activeElementReducer = (state = initialState.activeElement, action) => {
  switch (action.type) {
    case "SELECT_ELEMENT":
      return action.element;
    case "ADD_ELEMENT":
      return state;
    case "DELETE_ELEMENT":
      return state;
    case "UPDATE_ELEMENT":
      return { ...state, editorState: action.payload.editorState };
    default:
      return state;
  }
};

const activeSiteReducer = (state = initialState.activeSite, action) => {
  switch (action.type) {
    case "UPDATE_SITE":
      return action.site;
    case "CREATE_SITE":
      return state;
    case "DELETE_SITE":
      return state;

    case "UPDATE_ELEMENT":
      let key = Object.keys(action.payload.element).find(key =>
        key.includes("_style")
      );

      if (key.includes("element")) {
        let sections = state.sections.map(section => {
          let elems = section.elements.map(element => {
            if (element.id === action.payload.element.id) {
              return {
                ...element,
                editorState: action.payload.editorState
              };
            } else {
              return element;
            }
          });

          return { ...section, elements: elems };
        });

        return { ...state, sections: sections };
      } else if (key.includes("header")) {
        let header = {
          ...state.header,
          editorState: action.payload.editorState
        };
        return { ...state, header: header };
      } else if (key.includes("footer")) {
        let footer = {
          ...state.footer,
          editorState: action.payload.editorState
        };
        return { ...state, footer: footer };
      } else {
        return state;
      }

    default:
      return state;
  }
};

const editingReducer = (state = initialState.editing, action) => {
  switch (action.type) {
    case "UPDATE_EDITING":
      return action.editing;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  editing: editingReducer,
  loading: loadingReducer,
  sites: sitesReducer,
  elements: elementsReducer,
  activeElement: activeElementReducer,
  activeSite: activeSiteReducer
});

export default rootReducer;
