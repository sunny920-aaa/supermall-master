import { request } from './request'
export function CateGory() {
    return request({
        url: "/category"
    })
}
export function getCategoryInfo(maitKey) {
    return request({
        url: '/subcategory',
        params: { maitKey }

    })
}