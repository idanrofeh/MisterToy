import { toyService } from '../../services/toy-service.js';

export function loadToys() {
    return async (dispatch, getState) => {
        const { toyModule: { filterBy } } = getState();
        const toys = await toyService.query(filterBy);
        dispatch({ type: 'SET_TOYS', toys });
    }
}

export function onSetSort(sortBy) {
    return (dispatch) => {
        dispatch({ type: 'SET_SORT', sortBy })
    };
}

export function onSetFilter(filterBy) {
    return (dispatch) => {
        dispatch({ type: 'SET_FILTER', filterBy })
    };
}
