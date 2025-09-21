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

export function getBillByPage(queryForm) {
    return request({
        url: '/bills/list',
        method: 'post',
        data: {
            "page_num": queryForm.pageNum,
            "page_size": queryForm.pageSize,
        }
    })
}