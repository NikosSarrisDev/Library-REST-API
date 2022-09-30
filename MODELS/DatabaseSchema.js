// module.exports = [
//     {"id" : "1","name" : "Rules of nature", "game" : "Mgr"},
//     {"id" : "2","name" : "It is My Own Master Now", "game" : "Mgr"},
//     {"id" : "3","name" : "A Stranger I Remain","game" : "Mgr"},
//     {"id" : "4","name" : "Strains Of Time","game" : "Mgr"},
//     {"id" : "5","name" : "Red Sun","game": "Mgr"},
//     {"id" : "6","name" : "The Only Thing I Ever Known","game": "Mgr"},
//     {"id" : "7","name" : "Collective Consiousness","game" : "Mgr"},
//     {"id" : "8","name" : "It Has to Be This Way","game" : "Mgr"}

// ]

//  THIS   IS    DATABASE   SCHEMA  //
const mongoose = require('mongoose');

const library_schema = new mongoose.Schema({
    Id : {
        type : String,//Ειναι τυπου string 
        required : true//Ειναι απαρετητο να υπαρξει
    },
    name : {
        type : String,
        require : true
    },
    game : {
        type : String,
        required : true
    }
})


//export schema
module.exports = mongoose.model('Library', library_schema);

