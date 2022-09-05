const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase: true,
        require: true
    },
    lastName: {
        type: String,
        lowercase: true,
        require: true
    },
    program: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        index: {unique: true}
    },
    password: {
        type: String,
        require: true,
    },
    token: {
        type: String,
        default: null
    },
    comfirm: {
        type: Boolean,
        default: false,
    },
    img: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

// hashear la password
userSchema.pre('save', function(next) {
    const user = this;
    if (user.isModified('password')) {
        bcryptjs.genSalt(10, function(err, salt) {
            if (err) return next(err);

            bcryptjs.hash(user.password, salt, function(err, hash) {
                if (err) return next(err);
                user.password = hash;
                next();
            });
        });
    } else {
        next();
    }
});

userSchema.methods.comparePassword = function(password) {
    return bcryptjs.compareSync(password, this.password);
}

const User = mongoose.model("User", userSchema);

module.exports = User;