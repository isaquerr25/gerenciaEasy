const Grids = require('../models/Grids');
const Manager = require('../models/ManagerValues');
const { Op } = require('sequelize')
module.exports = {
    async index(req, res) {
        const { user_id, grid_id } = req.params;

        const grids = await Grids.findByPk(grid_id, {
            include: { association: 'manager_values' }
        });

        return res.json(grids.manager_values);
    },

    async store(req, res) {
        const { user_id, grid_id } = req.params;
        const { name, price, date_inform, create_at } = req.body;

        const _grids = await Grids.findByPk(grid_id);

        if (!_grids) {
            return res.status(400).json({ error: 'User not found' });
        }

        const _manager = await Manager.create({
            name,
            price,
            date_inform,
            create_at,
            grid_id,
        });
        return res.json(_manager);
    },

    async dell(req, res) {
        const { user_id, grid_id } = req.params;
        const { id_delet } = req.body;
        console.log(id_delet)
        const _grids = await Grids.findByPk(grid_id);

        if (!_grids) {
            return res.status(400).json({ error: 'User not found' });
        }
        Manager.destroy({
            where: {
                id: id_delet //this will be your id that you want to delete
            }
        }).then(function (rowDeleted) { // rowDeleted will return number of rows deleted
            if (rowDeleted === 1) {
                return res.status(200).json({ value: 'delete' });
            }
        }, function (err) {
            console.log(err);
        });

    },
    async createTrasitionByName(req, res) {
        const { userpras, namepras } = req.params;
        console.log(req.body)
        const { name, grid, price, date_inform, create_at } = req.body;

        //const {date_inform, create_at } = req.body;
        const userFilter = await Grids.findOne({ where: { user_id: userpras, name: namepras } });

        if (!userFilter) {
            return res.status(400).json({ error: 'User not found' });
        }
        let grid_id = userFilter.dataValues.id;
        console.log(grid_id)
        console.log(name)
        console.log(price)
        console.log(date_inform)
        console.log(create_at)

        try {
            const _manager = await Manager.create({
                name,
                price,
                date_inform,
                create_at,
                grid_id,
            });
            return res.json(_manager);
        }
        catch {
            return res.status(400).json({ error: 'User not found' });
        }
    },
    async findByUser(req, res) {
        
        console.log('aaaa')
        const { userpras } = req.params;
        const { start ,finish } = req.body;

        let startDate = new Date(start)
        let finishDate = new Date(finish)
        
        if(     !(startDate instanceof Date && !isNaN(startDate))    ){
            startDate = new Date('1500-01-01');
        }
        if(     !(finishDate instanceof Date && !isNaN(finishDate))    ){
            finishDate = new Date('9999-01-01');
        }
        console.log(startDate, startDate instanceof Date && !isNaN(startDate))
        console.log(finishDate,finishDate instanceof Date && !isNaN(finishDate))

        try {
            const gridFilter = await Grids.findAll({ 
                
                where: { user_id: userpras }, 
                include: [{ 
                    
                    model: Manager, 
                    as: 'manager_values' ,
                    where: {
                        date_inform:{[Op.between]:[startDate,finishDate]}
                    },
                    separate:true
                    
                }]
            
            });
            console.log(gridFilter)
            return res.json(gridFilter);
        }
        catch (err) {
            console.log(err)
            return res.status(400).json({ error: 'User not found' });
        }
    },
};