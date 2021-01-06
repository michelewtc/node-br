const assert = require('assert')
const Postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_HEROI_CADASTRAR = { 
    nome: 'Gaviao Negro',
    poder: 'flexas'
}

describe('Postgres Strategy', function() {
    this.timeout(Infinity)
    this.beforeAll(async function() {
        await context.connect()
    })
    it('PostgresSQL Connection', async function() {
        const result = await context.isConnected()
        assert.equal(result, true)
    })
    it('cadastrar', async function() {
        const result = await context.create(MOCK_HEROI_CADASTRAR)
        delete result.id
        //console.log('result', result)
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('listar', async function() {
        const [result] = await context.read({ nome: MOCK_HEROI_CADASTRAR.nome })
        delete result.id
        //pegar a primeira posicao 
        //const posicaoZero = result[0]
        //const [posicao1, posicao2] = ['esse e o 1', 'esse e o 2']
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
})