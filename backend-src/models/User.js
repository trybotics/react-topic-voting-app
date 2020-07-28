var mongoose = require('mongoose')
var Schema = mongoose.Schema
var autoIncrement = require('mongoose-auto-increment')

const UserSchema = new Schema({
    id: {
	   	type:Number,
	   	require:true,
	   	unique:true,
	   	ref: 'id'
    },
    authToken:{
	   	type:String,
	   	require:true
    },
    name:{
        type:String,
        require:true
    },
    email:{
	   	type:String,
		require:false,
	   	unique:true
    },
    phone:{
    	type:Number
    },
    password:{
    	type:String
    },
    socialId:{
    	type:String
    },
    facebookId:{
    	type:String
    },
    googleId:{
    	type:String
    },
    linkedinId:{
    	type:String
    },
    fcmToken:{
    	type:String
    },
    imageUrl:{
    	type:String
    },
    isAdmin:{
        type:Boolean
    },
    isDeleted: {
        type: Boolean, 
        default: false
    }
    
},{collection: 'User',timestamps:true})

autoIncrement.initialize(mongoose.connection)
UserSchema.plugin(autoIncrement.plugin, { model: 'User', field: 'id',startAt:1,incrementBy:1})

var User = mongoose.model('User',UserSchema)
module.exports = User
