import history from '../history'
import { CREATE_ENTRY, DELETE_ENTRY, EDIT_ENTRY, FETCH_ENTRIES, FETCH_ENTRY } from './types' 
import entry from '../apis/entry'

export const createEntry = formValues => async (dispatch) => {
    const response = await entry.post('/entries', { ...formValues })

    console.log(response);

    dispatch ({
        type: CREATE_ENTRY,
        payload: response.data
    })

    history.push(`/?page=${response.data.id}`)
}

export const fetchEntries = (page = 1) => async (dispatch) => {
    let response = await entry.get(`/entries?_page=${page}&_limit=4`)

    while(response.data.length === 0 && page !== 1) {
        page = page - 1
        response = await entry.get(`/entries?_page=${page}&_limit=4`)
    }
    history.push(`?page=${page}`)

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

export const deleteEntry = id => async dispatch => {
    await entry.delete(`entries/${id}`);

    dispatch({
        type: DELETE_ENTRY,
    })
}