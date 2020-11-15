const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    hash: String
});

userSchema.methods.generateJwt = function () {
    let expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 5);
    if (expiry.getMinutes() > 54) {
        expiry.setHours(expiry.getHours() + 1);
    }
    
    return jwt.sign({
        id: this._id,
        email: this.email,
        name: this.name,
        exp: parseInt(expiry.getTime() / 1000),
    }, process.env.JWT_SECRET,
        {
            algorithm: 'HS256'
        });
};

const saltRounds = 12;

userSchema.methods.setPassword = async function (password) {
    this.hash = await bcrypt.hash(password, saltRounds);
}

userSchema.methods.validPassword = async function (password) {
    return await bcrypt.compare(password, this.hash);
};


module.exports = mongoose.model('User', userSchema);