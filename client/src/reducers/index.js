import { combineReducers } from 'redux';
import entryReducer from './entryReducer';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
    entries: entryReducer,
    form: formReducer
});