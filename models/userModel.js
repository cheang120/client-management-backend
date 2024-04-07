const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:[true, "PLease add a name!"]
    },
    email:{
        type:String,
        required:[true, "PLease add an email!"],
        unique:true,
        trim:true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid email!"
        ]
    },
    password:{
        type:String,
        required:[true, "PLease add a password!"],
        minLength:[6, "Password must be up to 6 characters!"],
        // maxLength:[200, "Password must not be more than 200 characters!"],
    },
    photo:{
        type:String,
        required:[false, "PLease enter a photo!"],
        default:""
    },
    phone:{
        type:String,
        default:"+853"
    },
    bio:{
        type:String,
        maxLength:[350, "Bio must not be more than 250 characters!"],
        default:"bio"
    }
},
{
    timestamps:true
})
    // Encrypt password before saving to DB
    userSchema.pre("save", async function(next){
        if (!this.isModified("password")){
            return next()
        }

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    })
const User = mongoose.model("User", userSchema)
module.exports = User