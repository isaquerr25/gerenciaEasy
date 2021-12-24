const User = require('../models/User');
const Grids = require('../models/Grids');

module.exports = {
    async index(req, res) {
        try {
            const { user_id } = req.params;
            const user = await User.findByPk(user_id, {
                include: { association: 'grid_values' }
            });
            console.log(user)
            return res.json(user.grid_values);
        } catch (error) {
            console.log(error)
        }

    },

    async store(req, res) {
        const { user_id } = req.params;
        const { name, date_inform, create_at } = req.body;
        const user = await User.findByPk(user_id, {
            include: { association: 'grid_values' }});


        
        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }
        console.log(name)
        console.log(name.length)
        if(!name || !name.length){
            return res.status(400).json({ error: 'Invalid name' });
        }

        let allNameGrid = user.grid_values.map(grid => grid.name )
        console.log(allNameGrid)
        if (allNameGrid.includes(name)){
            return res.status(400).json({ error: 'Name already exists' });
        }

        try {
            const _grids = await Grids.create({
                name,
                date_inform,
                create_at,
                user_id,
            });
            return res.json(_grids);
        }
        catch (error) {
            return res.status(400).json({ error: 'Grid not create' });
        }



    },

    async dell(req, res) {
        const { user_id } = req.params;
        const { id_delet } = req.body;
        console.log(id_delet)
        const _grids = await Grids.findByPk(id_delet);

        if (!_grids) {
            return res.status(400).json({ error: 'User not foundaaaaa' });
        }
        try {
            Grids.destroy({
                where: {
                    id: id_delet //this will be your id that you want to delete
                }
            })
            return res.status(200).json({ value: 'delete' });
        } catch (err) {
            console.log(err)
            return res.status(400).json({ error: 'User not found' });
        }
    },
};