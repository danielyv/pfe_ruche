const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('./cors');
var authenticate = require('../authenticate');

const Ruche = require('../models/ruche');
const Record = require('../models/record');

const rucheRouter = express.Router();
rucheRouter.use(bodyParser.json());

rucheRouter.route('/')
    .options( (req, res) => { res.sendStatus(200); })
    .get( (req, res, next) => {
        Ruche.find({})
            .populate('records')
            .then((ruche) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(ruche);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post( authenticate.verifyUser,  (req, res, next) => {
        Ruche.create(req.body)
            .then((ruche) => {
                console.log('Ruche Created ', ruche);
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(ruche);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .put( authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /ruche');
    })
    .delete( authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Ruche.remove({})
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

rucheRouter.route('/:rucheId')
    .options( (req, res) => { res.sendStatus(200); })
    .get( (req, res, next) => {
        Ruche.findById(req.params.rucheId)
            .populate('records')
            .then((ruche) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(ruche);
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post( authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /ruche/' + req.params.rucheId);
    })
    .put( authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /ruche/' + req.params.rucheId);
    })
    .delete( authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        Ruche.findByIdAndRemove(req.params.rucheId)
            .then((resp) => {
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.json(resp);
            }, (err) => next(err))
            .catch((err) => next(err));
    });

rucheRouter.route('/:rucheId/records')
    .options( (req, res) => { res.sendStatus(200); })
    .get( (req, res, next) => {
        Ruche.findById(req.params.rucheId)
            .populate('records')
            .then((ruche) => {
                if (ruche != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(ruche.records);
                }
                else {
                    err = new Error('Ruche ' + req.params.rucheId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post( authenticate.verifyUser, (req, res, next) => {
        Record.create(req.body)
            .then((record) => {
                Ruche.findById(req.params.rucheId)
                    .then((ruche) => {
                        if (ruche != null) {
                            ruche.records.push(record._id);
                            ruche.save()
                                .then((ruche) => {
                                    Ruche.findById(ruche._id)
                                        .populate('records')
                                        .then((ruche) => {
                                            res.statusCode = 200;
                                            res.setHeader('Content-Type', 'application/json');
                                            res.json(ruche);
                                        })
                                }, (err) => next(err));
                        }
                        else {
                            err = new Error('Ruche ' + req.params.rucheId + ' not found');
                            err.status = 404;
                            return next(err);
                        }
                    }, (err) => next(err))
                    .catch((err) => next(err));
            },(err)=>next(err)).catch((err)=>next(err));

    })
    .put( authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /ruche/'
            + req.params.rucheId + '/records');
    })
    .delete( authenticate.verifyUser, authenticate.verifyAdmin, (req, res, next) => {
        res.statusCode = 403;
        res.end('DELETE operation not supported on /ruche/'
            + req.params.rucheId + '/records');
    });

rucheRouter.route('/:rucheId/records/:recordId')
    .options( (req, res) => { res.sendStatus(200); })
    .get( (req, res, next) => {
        Ruche.findById(req.params.rucheId)
            .populate('records')
            .then((ruche) => {
                if (ruche != null && ruche.records.id(req.params.recordId) != null) {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(ruche.records.id(req.params.recordId));
                }
                else if (ruche == null) {
                    err = new Error('Ruche ' + req.params.rucheId + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else {
                    err = new Error('Record ' + req.params.recordId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    })
    .post( authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST operation not supported on /ruche/' + req.params.rucheId
            + '/records/' + req.params.recordId);
    })
    .put( authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT operation not supported on /ruche/' + req.params.rucheId
            + '/records/' + req.params.recordId);
    })
    .delete( authenticate.verifyUser, (req, res, next) => {
        Ruche.findById(req.params.rucheId)
            .then((ruche) => {
                if (ruche != null && ruche.records.id(req.params.recordId) != null) {

                    ruche.records.id(req.params.recordId).remove();
                    ruche.save()
                        .then((ruche) => {
                            Ruche.findById(ruche._id)
                                .populate('records')
                                .then((ruche) => {
                                    res.statusCode = 200;
                                    res.setHeader('Content-Type', 'application/json');
                                    res.json(ruche);
                                })
                        }, (err) => next(err));
                }
                else if (ruche == null) {
                    err = new Error('Ruche ' + req.params.rucheId + ' not found');
                    err.status = 404;
                    return next(err);
                }
                else if (ruche.records.id(req.params.recordId) == null) {
                    err = new Error('Record ' + req.params.recordId + ' not found');
                    err.status = 404;
                    return next(err);
                }
            }, (err) => next(err))
            .catch((err) => next(err));
    });

module.exports = rucheRouter;