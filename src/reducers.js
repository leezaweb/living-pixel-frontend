import { combineReducers } from "redux";
import { Editor, EditorState, ContentState } from "draft-js";

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
      return action.element;
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
      let as = state;
      state.sections.forEach((s, x) => {
        s.elements.forEach((e, y) => {
          if (e.id === action.element.id) {
            as.sections[x].elements[y].element_style =
              action.element.element_style;
          }
        });
      });

      return as;
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
