
const User = require('../models/User');
const GridValuesController = require('./GridValuesController');
module.exports = {
    

    async index(req, res) {
        const users = await User.findAll();

        return res.json(users);
    },
    async login(req, res) {
        const users= await User.findOne({
            where:{email: req.body.email}
        });

        if(!users)
        {
            return res.json({value:'not_find'});
        }
        
        if(users.password == req.body.password)
        {
            return res.json({value: users.id});
        }

        return res.json({value:'invalid'});
    },
    async store(req, res) {
        try{
            const { name, email , password } = req.body;

            if(!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/.test(password))
            {
                throw 'type_password_invalid'
            }

            const user = await User.create({ name, email , password });
            console.log('-----------------------------------------------------------')
            console.log(user.dataValues.id)
            console.log('-----------------------------------------------------------')
            GridValuesController.createInter({'userID':user.dataValues.id,'name':'All','date_inform':new Date(),'createDate':new Date()})
            return res.json(user);
        } 
        catch(error)
        {
            console.log(error)
            return res.json(error)
        }
    }
};