import history from '../history'
import { CREATE_ENTRY, EDIT_ENTRY, FETCH_ENTRIES, FETCH_ENTRY } from './types' 
import entry from '../apis/entry'

export const createEntry = formValues => async (dispatch) => {
    const response = await entry.post('/entries', { ...formValues })
    dispatch ({
        type: CREATE_ENTRY,
        payload: response.data
    })

    history.push('/');
}

export const fetchEntries = (link) => async (dispatch) => {
    const response = await entry.get(link)

    dispatch ({
        type: FETCH_ENTRIES,
        payload: response
    })
}

export const fetchEntry = (id) => async (dispatch) => {
    try {
        const response = await entry.get(`/entries/${id}`)
        
        dispatch ({
            type: FETCH_ENTRY,
            payload: response.data
        })
    }catch(err) {
        history.push('/')
    } 
}

export const editEntry = (id, formValues) => async (dispatch) => {
    const response = await entry.patch(`/entries/${id}`, formValues)

    dispatch({ type: EDIT_ENTRY, payload: response.data })
    history.push('/')
}