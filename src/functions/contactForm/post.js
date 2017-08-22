'use strict'
const https = require('https')
const {config} = require('../../config/')

exports.postRequest = (data) => {
    const relayBody = JSON.stringify({
        channel: '#_test-lab_',
        username: 'Cactus',
        text: `${data.info} has sent us a message\n Name: ${data.body.name}\n Email: ${data.body.email}\n Subject: ${data.body.subject}\n Message: ${data.body.message}`,
        icon_emoji: ':cactus:'
    })

    const headers = {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(relayBody, 'utf8')
    }

    const options = {
        method: 'POST',
        host: config.hookHost,
        path: config.hookPath,
        port: 443,
        headers: headers
    }

    return new Promise((resolve, reject) => {
        const post = https.request(options, (res) => {
            (res.statusCode !== 200)
                ? reject(new Error('Connection to Webhook failed!'))
                : resolve(res.statusCode)
        })

        post.write(relayBody)
        post.on('error', (err) => reject(err))
        post.end()
    })
}
