const router = require('express').Router();
const { createNewRecord, upload, readSingleRecord, readManyRecords, updateSingleRecord, deleteSingleRecord, readAllRecords, deleteManyRecords, viewLogo } = require('../controllers/companie.controller');
const { auth } = require('../controllers/auth.controller');

// Create a new record
router.post('/new', auth, upload.single('logo'), createNewRecord);

// Ready companie records
router.get('/findcompanie', auth, readSingleRecord);
router.get('/readmanycompanies', auth, readManyRecords);
router.get('/readallcompanies',auth,readAllRecords);

// View logo
router.get('/viewlogo/:name',viewLogo);

// Update record
router.put('/updatrecord', auth, updateSingleRecord);

// Delete Single record
router.delete('/deleteonecompanie', auth, deleteSingleRecord);
router.delete('/deletemanycompanies',auth,deleteManyRecords);


module.exports = router;