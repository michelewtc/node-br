const assert = require('assert')
const { internal, unauthorized } = require('boom')
const api = require('../api')
const Context = require('./../db/strategies/base/contextStrategy')
const Postgres = require('./../db/strategies/postgres/postgres')
const UsuarioSchema = require('./../db/strategies/postgres/schemas/usuarioSchema')

let app = {}

const USER = {
    username: 'xuxadasilva',
    password: '123456'
}

const USER_DB = {
    username: USER.username.toLowerCase(),
    password: '$2b$04$A7RAweYnDlsWP6GzeaIQ9utQGO6yQtIT1mbJSzjOPJQXz6Rkz6zo.'
}

describe('Auth test suite', function () {
    this.beforeAll(async () => {
        app = await api

        const connectionPostgres = await Postgres.connect()
        const model = await Postgres.defineModel(connectionPostgres, UsuarioSchema)
        const postgres = new Context(new Postgres(connectionPostgres, model))
        await postgres.update(null, USER_DB, true)
    })

    it('Deve obter um token', async () => {
        const result = await app.inject({
            method: 'POST',
            url: '/login',
            payload: USER
        })

        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 200)
        assert.ok(dados.token.length > 10)

    })

    it('deve retornar nao autorizado ao tentar obter um login errado', async () => {
        const result = await app.inject({
            method: 'POST', 
            url: '/login',
            payload: {
                username: 'michelewtc',
                password: '123456'
            }
        })
        
        const statusCode = result.statusCode
        const dados = JSON.parse(result.payload)

        assert.deepEqual(statusCode, 401)
        assert.deepEqual(dados.error, "Unauthorized") 
    })

})