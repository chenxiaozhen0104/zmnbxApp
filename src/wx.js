fetch('/wx/auth/scanqrcode?url=' + window.location.href.split('#')[0], { method: 'POST' })
    // .then(function (res) {
        res.json().then(function (data) {
            wx.config({
                debug: false,
                appId: res.appId,
                timestamp: res.timestamp,
                nonceStr: res.nnonceStr,
                signature: res.signature,
                jsApiList: [
                    "scanQRCode", "chooseImage", "uploadImage"
                ]
            });
        // });
    })
