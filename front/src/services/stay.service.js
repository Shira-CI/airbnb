import axios from 'axios';


import { httpService } from './http.service.js'
import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'
import { userService } from './user.service.js'

const BASE_URL = '/'
const STORAGE_KEY = 'stay'

export const stayService = {
    getStays,
    getById,
    save,
    remove,
    getEmptyStay,
    addStayMsg,
    getDefaultFilter,
}
window.cs = stayService

function getDefaultFilter() {
    return { txt: '', location: '', guests: 1, checkIn: '', checkOut: '', type: '', price: '' }
}
async function getStays(filterBy = getDefaultFilter()) {
    return await httpService.get(BASE_URL, filterBy)
}

function getById(stayId) {
    return httpService.get(BASE_URL + stayId)
}

async function remove(stayId) {
    return httpService.delete(BASE_URL + stayId)
}
async function save(stay) {
    var savedStay
    if (stay._id) {
        savedStay = await httpService.put(BASE_URL + stay._id, stay)

    } else {
        savedStay = await httpService.post(BASE_URL, stay)
    }
    return savedStay
}

async function addStayMsg(stayId, txt) {
    const savedMsg = await httpService.post(`/${stayId}/msg`, { txt })
    return savedMsg
}



function getEmptyStay() {
    const stay = {
        name: '',
        type: '',
        imgUrls: '',
        price: '',
        summary: '',
        capacity: '',
        amenities: [],
        labels: [],
        host: {
            _id: 'u101',
            fullname: 'Davit Pok',
            imgUrl: '',
        },
        loc: {
            country: '',
            countryCode: '',
            city: '',
            address: '',
            lat: '',
            lng: '',
        },
        reviews: [],
        likedByUsers: [],
    }

    return stay
}





