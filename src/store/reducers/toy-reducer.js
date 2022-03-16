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
            let toys;
            if (sortBy === 'name') {
                toys = state.toys.sort((t1, t2) => t1.name.localeCompare(t2.name))
            } else {
                toys = state.toys.sort((t1, t2) => t2[sortBy] - t1[sortBy])
            }
            newState = { ...state, toys: toys, sortBy }
            break;
        case 'SET_FILTER':
            newState = { ...state, filterBy: action.filterBy }
            break;
        default:
            newState = state;
    }
    return newState;
}