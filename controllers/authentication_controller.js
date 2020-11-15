const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports.register = async function (req, res) {
    if (!req.body.name || !req.body.email || !req.body.password) {
        res.status(400).json({
            "title": "Invalid format",
            "detail": "All fields required"
        });
    }
    const user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    await user.setPassword(req.body.password);
    user.save(function (err) {
        if (err) {
            res.status(400).json({
                "title": "Failed to create user account",
                "detail": `Failed to create user account because: ${err.message}.`
            });
        } else {
            const token = user.generateJwt();
            res.status(201).json({"token": token});
        }
    });
};

module.exports.login = async function(req, res) {
    const user = await User.findOne({
            email: req.body.username
        })
        .catch(err =>
            res.status(500).json({
                "title": "Failed to find user account",
                "detail": `Failed to find user account because: ${err.message}.`
            })
    );
    if (user) {
			const valid = await user.validPassword(req.body.password);
			if (valid) {
				const token = user.generateJwt();
				res.status(200).json({
					token: token,
				});
			} else {
				res.status(401).json({
					title: "Unauthorized",
					detail: "Wrong password",
				});
			}
		} else {
			res.status(401).json({
				title: "Unauthorized",
				detail: "Uknown user",
			});
		}
    

};

module.exports.logout = async function(req, res) {
    res.status(500).json({
        "title": "Unimplemented",
        "detail": "Wrong password"
    })
}
