import _ from 'lodash'
import { CREATE_ENTRY, FETCH_ENTRIES, FETCH_ENTRY } from '../actions/types'

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_ENTRY:
        case CREATE_ENTRY:
            return { ...state, [action.payload.id]: action.payload }
        case FETCH_ENTRIES:
            return { ...state, ..._.mapKeys(action.payload, 'id') }
        default:
            return state;
    }
}