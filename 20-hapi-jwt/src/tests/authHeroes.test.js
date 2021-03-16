const assert = require('assert')
const { internal } = require('boom')
const api = require('../api')
let app = {}

describe('Auth test suite', function () {
    this.beforeAll(async () => {
        app = await api
    })

    it('Deve obter um token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: {
                username: 'xuxadasilva',
                password: '123456'
            }
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 200)
        assert.ok(dados.token.length > 10)

    })
})