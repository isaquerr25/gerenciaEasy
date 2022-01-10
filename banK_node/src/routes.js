const express = require('express');
const verifyToken = require('./controllers/tokenController');
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

routes.get('/addresses', verifyToken, AddressController.index);
routes.post('/addresses', verifyToken, AddressController.store);

routes.get('/techs', verifyToken, TechController.index);
routes.post('/techs', verifyToken, TechController.store);
routes.delete('/techs', verifyToken, TechController.delete);

routes.get('/report', ReportController.show);

routes.get('/gridvalues', verifyToken, GridValuesController.index);
routes.post('/gridvalues', verifyToken, GridValuesController.store);
routes.post('/gridvaluesdell', verifyToken, GridValuesController.dell);

routes.get('/gridvalues/:grid_id/managergrids', verifyToken, ManagerValuesController.index);
routes.post('/gridvalues/:grid_id/managergrids', verifyToken, ManagerValuesController.store);
routes.post('/gridvalues/:grid_id/managergrids_dell', verifyToken, ManagerValuesController.dell);
routes.post('/gridvalues/:namepras/managergridsapp', verifyToken, ManagerValuesController.createTrasitionByName);
routes.post('/managergridfindByUser', verifyToken, ManagerValuesController.findByUser);
module.exports = routes;


