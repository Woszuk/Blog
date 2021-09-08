import history from '../history'
import { CREATE_ENTRY, FETCH_ENTRIES, FETCH_ENTRY } from './types' 
import entry from '../apis/entry'

export const createEntry = formValues => async (dispatch) => {
    const response = await entry.post('/entries', { ...formValues })
    dispatch ({
        type: CREATE_ENTRY,
        payload: response.data
    })

    history.push('/');
}

export const fetchEntries = () => async (dispatch) => {
    const response = await entry.get('/entries')
    dispatch ({
        type: FETCH_ENTRIES,
        payload: response.data
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