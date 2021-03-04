const Mongoose = require('mongoose')
Mongoose.connect('mongodb://michelewtc:minhasenhasecreta@localhost:27017/herois',
    { userNewUrlParser: true}, function (error) {
        if(!error) return;
        console.log('Falha na conexao!', error)
    })

const connection = Mongoose.connection

// funtion nomeFuncao() {}
// const minhaFuncao = function() {}
// const minhaFuncaoArrow = () => {}
// const minhaFuncaoArrow = (params) => console.log(params)

connection.once('open', () => console.log('database rodando !'))

// setTimeout(() => {
//     const state = connection.readyState
//     console.log('state', state)
// }, 1000)

// 0: Disconectado / 1: Conectado / 2: Conectando / 3: Disconectando 

const heroiSchema = new Mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    poder: {
        type: String,
        required: true
    },
    insertedAt: {
        type: Date,
        default: new Date()
    }
})
const model = Mongoose.model('herois', heroiSchema)

async function main() {
    const resultCadastrar = await model.create({
        nome: 'Batman',
        poder: 'Dinheiro'
    })
    console.log('result cadastrar', resultCadastrar)

    const listItens = await model.find()
    console.log('items', listItens)
}
main()