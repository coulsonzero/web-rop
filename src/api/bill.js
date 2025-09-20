import request from "./request"

export function getBill() {
    return request({
        url: '/bills',
        method: 'get'
    })
}

export function getBillRank() {
    return request({
        url: '/bills/rank',
        method: 'get'
    })
}

export function getBillByName(name) {
    return request({
        url: `/bills/${name}`,
        method: 'get',
    })
}