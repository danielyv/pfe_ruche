var express = require('express');
var router = express.Router();
const bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');
var authenticate = require('../authenticate');
const cors = require('./cors');

router.use(bodyParser.json());
router.route('/signup')
.options( (req, res) => { res.sendStatus(200); })
.post((req, res, next) => {
  User.register(new User({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.firstname)
        user.firstname = req.body.firstname;
      if (req.body.lastname)
        user.lastname = req.body.lastname;
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
    }
  });
});


router.route('/login')
.options( (req, res) => { res.sendStatus(200); })
.post(passport.authenticate('local'), (req, res) => {
  var token = authenticate.getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
});

router.route('/facebook/token')
.get(passport.authenticate('facebook-token'), (req, res) => {
  if (req.user) {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});
  }
});
/*router.get('/google/token', passport.authenticate('google-token'), (req, res) => {
  if (req.user) {
    var token = authenticate.getToken({_id: req.user._id});
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});
  }
});*/





router.route('/logout')
.options( (req, res) => { res.sendStatus(200); })
.get((req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

/* GET users listing. */
router.route('/')
.options( (req, res) => { res.sendStatus(200); })
.get(authenticate.verifyUser,authenticate.verifyAdmin, function(req, res, next) {
  User.find({})
  .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(user);
  }, (err) => next(err))
  .catch((err) => next(err));})
.post(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /user');
})
.put(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /user');
})
.delete(authenticate.verifyUser||authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /user');  
});

router.route('/:userId')
.options( (req, res) => { res.sendStatus(200); })
.get(authenticate.verifyUser, (req,res,next) => {
    User.findById(req.params.userId)
    .populate('ruche')
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(user);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /user/'+ req.params.userId);
})
.put(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /user/'+ req.params.userId);
})
.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /user/'+ req.params.userId);
});

router.route('/:userId/ruche')
.options( (req, res) => { res.sendStatus(200); })
.get( (req,res,next) => {
    User.findById(req.params.userId)
    .populate('ruche')
    .then((user) => {
        if (user != null) {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json(user.ruche);
        }
        else {
            err = new Error('User ' + req.params.userId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST operation not supported on /user/'+ req.params.userId
        + '/ruche/');
})
.put(authenticate.verifyUser,(req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /user/'
        + req.params.userId + '/ruche');
})
.delete(authenticate.verifyUser,authenticate.verifyAdmin,(req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE operation not supported on /user/'
        + req.params.userId + '/ruche');    
});

router.route('/:userId/ruche/:rucheId')
.options( (req, res) => { res.sendStatus(200); })
.get( (req,res,next) => {
    res.statusCode = 403;
    res.end('GET operation not supported on /user/'+ req.params.userId
        + '/ruche/' + req.params.rucheId);
})
.post(authenticate.verifyUser,(req, res, next) => {
    User.findById(req.params.userId)
    .then((user) => {
        if (user != null) {
            user.ruche.push(req.params.rucheId);
            user.save()
            .then((user) => {
                User.findById(user._id)
                .populate('ruche')
                .then((user) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(user);
                })            
            }, (err) => next(err));
        }
        else {
            err = new Error('User ' + req.params.userId + ' not found');
            err.status = 404;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
    
})
.put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT operation not supported on /user/'+ req.params.userId
        + '/ruche/' + req.params.rucheId);
})
.delete(authenticate.verifyUser, (req, res, next) => {
    User.findById(req.params.userId)
    .then((user) => {
        if (user != null && user.ruche.id(req.params.rucheId) != null && (req.user.admin || req.user._id.equals(user._id))) {

            user.ruche.id(req.params.rucheId).remove();
            user.save()
            .then((user) => {
                User.findById(user._id)
                .populate('ruche')
                .then((user) => {
                    res.statusCode = 200;
                    res.setHeader('Content-Type', 'application/json');
                    res.json(user);  
                })               
            }, (err) => next(err));
        }
        else if (user == null) {
            err = new Error('User ' + req.params.userId + ' not found');
            err.status = 404;
            return next(err);
        }
        else if(user.ruche.id(req.params.rucheId) == null){
            err = new Error('Ruche ' + req.params.rucheId + ' not found');
            err.status = 404;
            return next(err);            
        }else{
            err=new Error("You are notized to perform this operation!");
            err.status = 403;
            return next(err);
        }
    }, (err) => next(err))
    .catch((err) => next(err));
});



module.exports = router;
