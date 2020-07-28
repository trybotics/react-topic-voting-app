var mongoose = require('mongoose')
var Schema = mongoose.Schema
var autoIncrement = require('mongoose-auto-increment')

const TopicSchema = new Schema({
    id: {
        type:Number,
        require:true,
        unique:true,
        ref: 'id'
    },
    title:{
        type:String,
        unique:true,
    },
    imageUrl:{
        type:String
    },
    description:{
        type:String
    },
    category:{
        type:String
    },
    subCategory:{
        type:String
    },
    videoId:{
        type:String
    },
    siteLink:{
        type:String
    },
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    isDeleted: {
        type: Boolean, 
        default: false
    },
    comments: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }, 
        comment: String, 
        createdAt: { type: Date, default: Date.now }, 
        updatedAt: { type: Date, default: Date.now }
    }],
    likes: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }, 
        like: Boolean, 
        createdAt: { type: Date, default: Date.now } , 
        updatedAt: { type: Date, default: Date.now }
    }],
    disLikes: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }, 
        disLike: Boolean, 
        createdAt: { type: Date, default: Date.now } , 
        updatedAt: { type: Date, default: Date.now }
    }],
    shares: [{
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }, 
        share: Boolean, 
        createdAt: { type: Date, default: Date.now } , 
        updatedAt: { type: Date, default: Date.now }
    }]
    
},{collection: 'Topic',timestamps:true})

autoIncrement.initialize(mongoose.connection)
TopicSchema.plugin(autoIncrement.plugin, { model: 'Topic', field: 'id',startAt:1,incrementBy:1})
var Topic = mongoose.model('Topic',TopicSchema)
module.exports = Topic
