import axios from 'axios';
import { storageService } from './async-storage-service.js';
import { utilService } from './util.service.js';

export const toyService = {
    query,
    saveToy,
    removeToy
}

function query(filterBy) {
    return (storageService.load('toyDB', filterBy));
}

function saveToy(toy) {
    if (!toy._id) _addToy(toy)
    else _updateToy(toy);
}

function _addToy(toy) {
    toy._id = utilService.makeId();
    storageService.addToy(toy);
}

function _updateToy(toy) {
    storageService.updateToy(toy);
}

function removeToy(id) {
    storageService.removeToy(id);
}