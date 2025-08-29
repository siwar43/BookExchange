const {check , validationResult} = require ("express-validator")

exports.registerRules=() => [
        check("username", "Username is required").notEmpty(),
        check("email", "Email is required").notEmpty(),
        check("email", "Check your email again").isEmail(),
        check("password", "password is required").isLength({
            min : 8 , 
            max : 20,
        }),
    ];

exports.loginRules=() => [
        check("email", "Email is required").notEmpty(),
        check("email", "Check your email again").isEmail(),
        check("password", "Password must contain at least 8 characters").isLength({
            min : 8 , 
            max : 20,
        }),
    ];

exports.validation = (req , res , next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send ({
            errors : errors.array().map((el) => ({
            msg : el.msg ,
        })),
        })
    }
    next();
};

