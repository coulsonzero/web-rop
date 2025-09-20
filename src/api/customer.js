import request from "./request"

export function getCustomers() {
    return request({
        url: '/customer',
    })
}

// export function getCustomer(id) {
//     return request({
//         url: `/customer/${id}`,
//     })
// }

export function createCustomer(data) {
    return request({
        url: '/customer',
        method: 'post',
        data,
    })
}

export function updateCustomer(id, data) {
    return request({
        url: `/customer/${id}`,
        method: 'put',
        data,
    })
}

export function deleteCustomer(id) {
    return request({
        url: `/customer/${id}`,
        method: 'delete',
    })
}

export function deleteCustomerList(data) {
    return request({
        url: '/customer',
        method: 'delete',
        data,
    })
}