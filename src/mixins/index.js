import AppHeader from '../components/appHeader.vue'
import Footer from '../components/appFooter.vue'
import goingOn from '../components/loading.vue'
import config from 'config'
// import module from './module'
const stream = weex.requireModule('stream')
const storage = weex.requireModule('storage')
const navigator = weex.requireModule('navigator')
//const BASE_URI =  require('config').server

//console.log('BASE_URI',BASE_URI)

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
        success && success(response.data)
    } else {
        error && error(response)
    }
}

function ajax({ method, url, data, success, error }) {
    storage.getItem('token', e => {
        let body = ''
        data = data || {}
        data.token = e.data || '636234887666745801'
        url = config.server + url
        url = `${url}?${serialize(data)}`
        stream.fetch({
            method: method,
            type: 'json',
            url: url,
            body: body
        }, streamCallback.bind(this, success, error))
    })
}

export default {
    components: {
        AppHeader, Footer, goingOn
    },
    methods: {
        pageBack() {
             this.$router.back()
        },
        pageTo(to) {
             this.$router.push(to)
        },
        _get(url, data, success, error) {
            ajax({ method: 'GET', url, data, success, error })
        },
        _post(url, data, success, error) {
            ajax({ method: 'POST', url, data, success, error })
        },
        // 判断微信浏览器类型
        _isWeixin() {
            try {
                return /MicroMessenger/ig.test(window.navigator.userAgent);
            } catch (e) {
                // console.log(e,"============")
                return false;
            }
        }
    },
    created() {
        
    }

}