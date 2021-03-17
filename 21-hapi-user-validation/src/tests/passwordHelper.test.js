const assert = require('assert')
const PasswordHelper = require('../helpers/passwordHelper')

const SENHA = 'Michelewtc@32123123'
const HASH = '$2b$04$YUsQZ7jYo2MDhNVw8T1xPuTiGasUNTZ4Y.t.LdivjbXVMUNlLyln6'

describe.only('UserHelper test suite', function () {
    it('deve gerar um hash a partir de uma senha', async () => {
        const result = await PasswordHelper.hashPassword(SENHA)
        assert.ok(result.length > 10)
    })

    it('deve comparar uma senha e seu hash', async () => {
        const result = await PasswordHelper.comparePassword(SENHA, HASH)
        assert.ok(result)
    })
})