const router = require('express').Router();
const { createNewRecord, readSingleRecord, readManyRecords, updateSingleRecord, deleteSingleRecord, readAllRecords, deleteManyRecords } = require('../controllers/employee.controller');
const { auth } = require('../controllers/auth.controller');

// Create a new record
router.post('/addemployee', auth, createNewRecord);

// Ready companie records
router.get('/readsingleemployee', auth, readSingleRecord);
router.get('/readmanyemoloyee', auth, readManyRecords);
router.get('/readallemployee',auth,readAllRecords);

// Update record
router.put('/updatrecord', auth, updateSingleRecord);

// Delete Single record
router.delete('/deleteoneemployee', auth, deleteSingleRecord);
router.delete('/deletemanyemployies',auth,deleteManyRecords);


module.exports = router;