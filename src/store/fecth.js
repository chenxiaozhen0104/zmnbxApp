import config from 'config'

const stream = weex.requireModule('stream')
const storage = weex.requireModule('storage')
//const BASE_URI = require('config').server
const BASE_URI = config.server

function serialize(obj, prefix) {
    var str = [],
        p;
    for (p in obj) {
        if (obj.hasOwnProperty(p)) {
            var k = prefix ? prefix + "[" + p + "]" : p,
                v = obj[p];
            str.push((v !== null && typeof v === "object") ?
                serialize(v, k) :
                encodeURIComponent(k) + "=" + encodeURIComponent(v));
        }
    }
    return str.join("&");
}

function streamCallback(success, error, response) {
    if (response.ok) {
        if (response.data.error) {
            error({ error: response.data.error })
        } else {
            success(response.data)
        }
    } else {
        error({ error: '网络不稳定，服务器连接失败' })
    }
}

function ajax({ method, url, data, success, error }) {
    storage.getItem('token', e => {
        let body = ''
        data = data || {}
        data.token = e.data
        url = config.server + url
        url = `${url}?${serialize(data)}`
        stream.fetch({
            method: method,
            type: 'json',
            url: url
        }, streamCallback.bind(this, success, error))
    })
}
function get(url, data) {
    return new Promise((resolve, reject) => {
        ajax({ method: 'GET', url, data, success: resolve, error: reject })
    })
}

function post(url, data) {
    return new Promise((resolve, reject) => {
        ajax({ method: 'POST', url, data, success: resolve, error: reject })
    })
}

export function _getDeviceInitData() {
    return get("/api/device/initdata",{type:1})
}

export function _getUser() {
    return get('/api/user/info')
}

export function _getDevices(searchKey, areaId, categoryId, brandId, pageIndex, pageSize) {
    return get('/api/device/search', { searchKey, areaId, categoryId, brandId, pageIndex, pageSize })
}

export function _getCompanyInfo() {
    return post('/api/user/companyinfo')
}

export function _setPassword(oldPassword, newPassword) {
    return post('/api/user/ResetPassword', { oldPassword, newPassword })
}

export function _getDeviceById(deviceId) {
    return get('/api/device/get', { deviceId })
}
export function _getDeviceInfo(deviceId) {
    return get('/api/device/GetDeviceInfo', { deviceId })
}

export function _getDeviceByQRCode(qrcode) {
    return get('/api/device/getByQRcode', { qrcode })
}
export function _getDeviceInfoByQRCode(qrcode) {
    return get('/api/device/GetDeviceInfoByQRCode', { qrcode })
}

export function _setDeviceQRCode(deviceId, qrCode, address) {
    return post('/api/device/setQRCode', { deviceId, qrCode, address })
}

export function _setDeviceServerCompany(deviceId, qrCode, address,ServiceCompanyId) {
    return post('/api/device/SetQRCodeWithServerCompany', { deviceId, qrCode, address,ServiceCompanyId })
}

export function _forgetPassword(mobile, password, smsCode) {
    return post('/api/user/forgetPassword', { mobile, password, smsCode })
}

export function _smsLogin(smsCode, mobile) {
    return post('/api/user/SMSLogin', { smsCode, mobile })
}

export function _login(userName, password) {
    return post('/api/user/PasswordLogin', { userName, password })
}