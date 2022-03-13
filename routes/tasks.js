const express = require('express'); //import express
const router = express.Router();
const tasksController = require('../controllers/tasks');

router.post('/checkin', async (req, res, next) => {
    const result = await tasksController.checkin(req.body.user, req.body.task)
        .catch(err => next(err));
    handlePostResult(result,res);
});
router.post('/checkout/:user', async (req, res, next) => {
    const result = await tasksController.checkout(req.params.user)
        .catch(err => next(err)) ;
    handlePostResult(result, res);
});
router.get('/report', async (req, res, next) => {
    const result = await tasksController.report()
        .catch(err => next(err)) ;
    res.status(200).json(result)
});

function handlePostResult(result, res) {
    if (result) {
         res.status(400).json(result);
    } else {
        res.status(200).json("OK");
    }
}

module.exports = router;
