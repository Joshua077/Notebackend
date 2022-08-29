const mongoose = require('mongoose');

const MernNotesSchema = mongoose.Schema({

    title:{
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    user :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "StudentsBlog",
        required : true

    },
}, {timestamps: true})

const MernNote = mongoose.model('MernNote', MernNotesSchema)
module.exports = MernNote