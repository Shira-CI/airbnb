import { httpService } from './http.service'

const BASE_URL = 'order/'


export const orderService = {
    query,
    save,
    remove,
    getById,
    getEmptyOrder,
}

async function query(filterBy) {
    return await httpService.get(BASE_URL, filterBy)
}

async function getById(orderId) {
    return await httpService.get(BASE_URL + orderId)
}

async function remove(orderId) {
    return await httpService.delete(BASE_URL + orderId)
}

async function save(order) {
    console.log('order in service', order);
    if (order._id) {
        return await httpService.put(BASE_URL + order._id, order)
    } else {
        return await httpService.post(BASE_URL, order)
    }
}

function getEmptyOrder() {
    return {
        stayId: '',
        stayName: '',
        stayImgUrl: '',
        hostId: '',
        guests: { adults: 0, kids: 0, infants: 0, pets: 0 },
        startDate: '',
        endDate: '',
        nightsPrice: '',
        cleaningFee: '',
        serviceFee: '',
        totalPrice: '',
        msgs: [],
        status: 'pending',
        renter: '',
        createdAt: ''
    }
}



