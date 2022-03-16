export const storageService = {
    load: loadFromStorage,
    save: saveToStorage
}

function saveToStorage(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
    return Promise.resolve();
}

function loadFromStorage(key, filterBy) {
    const val = localStorage.getItem(key);
    let toys = JSON.parse(val)
    if (filterBy) { toys = _getFilteredToys(toys, filterBy) }
    return Promise.resolve(toys)
}

function _getFilteredToys(toys, filterBy) {
    const filteredToys = toys.filter(toy => { return ((toy.name.toLowerCase().includes(filterBy.name.toLowerCase())) && ((filterBy.inStock === "all") || (toy.inStock === filterBy.inStock)) && (_isLabelsMatch(toy, filterBy.labels))) })
    return filteredToys;
}

function _isLabelsMatch(toy, labels) {
    if ((labels.length === 1) && (labels[0] === "")) return true;
    return labels.every(label => toy.labels.includes(label));
}