import axios from 'axios';
import { storageService } from './async-storage-service.js';

export const toyService = {
    query,
    getById
}

function query(filterBy) {
    return (storageService.load('toyDB', filterBy));
}

async function getById(toyId) {
    const toys = await query();
    const toy = toys.find(toy => (toy._id === toyId));
    return toy;
}