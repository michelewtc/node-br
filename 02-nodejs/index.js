/*
0 obter um usuario 
1 obter o numero de telefone de um usuario a partir de seu id
2 oter o endereco do usuario pelo id
*/ 

//importamos um módulo interno do node.js
const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario() {
    // quando der OK -> resolvePromise 
    // quando der algum problema -> reject(ERRO)

    return new Promise(function resolvePromise(resolve, reject) {
        setTimeout(function () {
            //return reject(new Error('DEU RUIM DE VERDADE!'))

            return resolve({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)

    })
}

function obterTelefone(idUsuario) {
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(() => {
            return resolve({
                telefone: '1199000101',
                ddd: 11
            })
        }, 2000);
    })

}

function obterEndereco(idUsuario, callback) {
    setTimeout(() => {
        return callback (null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000);
}

const usuarioPromise = obterUsuario()
//para manipular o sucesso usamos a função .then
//para manipular erros usamos o .catch
usuarioPromise
    .then(function (usuario) {
        return obterTelefone(usuario.id)
            .then(function resolverTelefone(result) {
                return {
                    usuario: {
                        nome: usuario.nome,
                        id: usuario.id
                    },
                    telefone: result
                }
            })
    })
    .then(function (resultado) {
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result) {
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function (resultado) {
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
        `)
    })
    .catch(function (error) {
        console.error('DEU RUIM', error)
    })

// obterUsuario(function resolverUsuario(error, usuario) {
//     //null || "" || 0 === false
//     if (error) {
//         console.error('DEU RUIM em USUARIO', error)
//         return;
//     }

//     obterTelefone(usuario.id, function resolverTelefone(error1, telefone) {
//         if (error1) {
//             console.error('DEU RUIM em TELEFONE', error)
//             return;
//         }
//         obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
//             if (error2) {
//                 console.error('DEU RUIM em TELEFONE', error)
//                 return;
//             }

//             console.log(`
//              Nome: ${usuario.nome},
//              Endereco: ${endereco.rua}, ${endereco.numero}
//              Telefone: (${telefone.ddd})${telefone.telefone}
//             `)
//         })
//     })

// })

//const telefone = obterTelefone(usuario.id)
//console.log('telefone', telefone)