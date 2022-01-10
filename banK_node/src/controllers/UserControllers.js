const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');
const Grids = require('../models/Grids');

const createAuthToken = user => {
    const privateKey = process.env.JWT_KEY;
    const tokenData = {
        userId: user.id,
    };

    const token = jwt.sign(tokenData, privateKey);
    return token;
}

module.exports = {
    async index(req, res) {
        const users = await User.findAll();

        return res.json(users);
    },
    async login(req, res) {
        const users= await User.findOne({
            where:{email: req.body.email}
        });
        console.log(users);

        if(!users)
        {
            return res.status(404).send();
        }

        if (await bcrypt.compare(req.body.password, users.password))
        {
            res.header("access-control-allow-origin", "*");
            res.header("access-control-expose-headers", "Authorization");
            res.header("access-control-allow-headers", "Authorization");
            res.header('Authorization',`Bearer ${createAuthToken(users)}`);
            return res.status(200).send();
        }

        return res.status(401).send();
    },
    async store(req, res) {
        try{
            const { name, email , password } = req.body;

            if(!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(password))
            {
                throw 'Your password is not strong enough'
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const user = await User.create({ name, email, password: hashedPassword });
            console.log('-----------------------------------------------------------')
            console.log(user.dataValues.id)
            console.log('-----------------------------------------------------------')
            await Grids.create({
                name: 'All',
                date_inform: new Date(),
                create_at: new Date(),
                user_id: user.dataValues.id,
            });
            
            res.header("access-control-allow-origin", "*");
            res.header("access-control-expose-headers", "Authorization");
            res.header("access-control-allow-headers", "Authorization");
            res.header('Authorization', `Bearer ${createAuthToken(users)}`);
            return res.status(200).send();
        } catch(error) {   
            console.log(error);
            return res.status(400).send(error.message);
        }
    }
};