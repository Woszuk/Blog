import _ from 'lodash'
import { CREATE_ENTRY, EDIT_ENTRY, FETCH_ENTRIES, FETCH_ENTRY } from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_ENTRY:
        case CREATE_ENTRY:
        case EDIT_ENTRY:
            return { ...state, [action.payload.id]: action.payload }
        case FETCH_ENTRIES:
            return { ..._.mapKeys(action.payload.data, 'id'), link: action.payload.headers.link}
        default:
            return state;
    }
}