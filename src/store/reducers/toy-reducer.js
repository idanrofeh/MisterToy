const initialState = {
    toys: [],
    filterBy: {
        name: '',
        inStock: 'all',
        labels: []
    },
    sortBy: 'createdAt'
}

export function toyReducer(state = initialState, action) {
    let newState;

    switch (action.type) {
        case 'SET_TOYS':
            newState = { ...state, toys: action.toys }
            break;
        case 'SET_SORT':
            const { sortBy } = action;
            // console.log(sortBy);
            let sortedToys;
            if (sortBy === 'name') {
                sortedToys = state.toys.sort((t1, t2) => t1.name.localeCompare(t2.name))
                console.log(sortedToys);
            } else {
                sortedToys = state.toys.sort((t1, t2) => t2[sortBy] - t1[sortBy])
            }
            newState = { ...state, toys: sortedToys, sortBy }
            console.log(newState);
            break;
        case 'SET_FILTER':
            newState = { ...state, filterBy: action.filterBy }
            break;
        default:
            newState = state;
    }
    return newState;
}