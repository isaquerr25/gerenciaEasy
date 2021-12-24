const express = require('express');
const UserController = require('./controllers/UserControllers');
const AddressController = require('./controllers/AddressController');
const TechController = require('./controllers/TechController');
const ReportController = require('./controllers/ReportController');
const GridValuesController = require('./controllers/GridValuesController');
const ManagerValuesController = require('./controllers/ManagerValuesController');
const routes = express.Router();

//routes.get('/',(rea,res) =>{
//    return res.json({hello:'Word'});
//})

routes.get('/users', UserController.index);
routes.post('/create', UserController.store);
routes.post('/auth', UserController.login);

routes.get('/users/:user_id/addresses', AddressController.index);
routes.post('/users/:user_id/addresses', AddressController.store);

routes.get('/users/:user_id/techs', TechController.index);
routes.post('/users/:user_id/techs', TechController.store);
routes.delete('/users/:user_id/techs', TechController.delete);

routes.get('/report', ReportController.show);

routes.get('/users/:user_id/gridvalues', GridValuesController.index);
routes.post('/users/:user_id/gridvalues', GridValuesController.store);
routes.post('/users/:user_id/gridvaluesdell', GridValuesController.dell);


routes.get('/users/:user_id/gridvalues/:grid_id/managergrids', ManagerValuesController.index);
routes.post('/users/:user_id/gridvalues/:grid_id/managergrids', ManagerValuesController.store);
routes.post('/users/:user_id/gridvalues/:grid_id/managergrids_dell', ManagerValuesController.dell);
routes.post('/users/:userpras/gridvalues/:namepras/managergridsapp', ManagerValuesController.createTrasitionByName);
routes.post('/users/:userpras/managergridfindByUser', ManagerValuesController.findByUser);
module.exports = routes;


