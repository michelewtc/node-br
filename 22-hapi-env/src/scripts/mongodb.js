//databases
//show dbs

//mudando o contexto para uma database
//use herois

//mostra tables (colecoes)
//show collections

db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

db.herois.find()
db.herois.find().pretty()

for (let i=0; i<= 10000; i ++) {
    db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Velocidade',
        dataNascimento: '1998-01-01'
    })
}

db.herois.count()
db.herois.findOne()
db.herois.find().limit(1000).sort({ nome: -1 })
db.herois.find({}, { poder: 1, _id: 0 })

db.herois.find({ nome: 'Flash' })
//create 
db.herois.insert({
    nome: 'Flash',
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
})

//read
db.herois.find()

//update
db.herois.update({ _id: ObjectId("5ffb558f9442064f1e5f5b24") },
                 { nome: 'Mulher Maravilha'})

db.herois.update({ _id: ObjectId("5ffb56699442064f1e5f822b") },
                 { $set: { nome: 'Lanterna Verde'} })

db.herois.update({ poder: 'Velocidade' },
                 { $set: { poder: 'super força'} })

db.herois.find({ poder: 'super força'}).sort({ nome: -1})

//delete 
db.herois.remove({})