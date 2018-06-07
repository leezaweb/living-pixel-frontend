import { combineReducers } from "redux";

const initialState = {
  sites: [],
  elements: [],
  activeElement: null,
  loggedInSite: null
};

const sitesReducer = (state = initialState.sites, action) => {
  switch (action.type) {
    case "FETCH_SITES":
      return state;
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
      return state;
    case "ADD_ELEMENT":
      return state;
    case "DELETE_ELEMENT":
      return state;
    case "UPDATE_ELEMENT":
      return state;
    case "UPDATE_PROPERTY":
      return state;
    default:
      return state;
  }
};

const loggedInSiteReducer = (state = initialState.loggedInSite, action) => {
  switch (action.type) {
    case "LOG_INTO_SITE":
      return state;
    case "CREATE_SITE":
      return state;
    case "DELETE_SITE":
      return state;
    case "UPDATE_SITE_INFO":
      return state;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  sites: sitesReducer,
  elements: elementsReducer,
  activeElement: activeElementReducer,
  loggedInSite: loggedInSiteReducer
});

export default rootReducer;
