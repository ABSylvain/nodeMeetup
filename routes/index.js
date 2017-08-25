let express = require('express');
let passport = require('passport');
let Account = require('../models/account');

let router = express.Router();

//client appel l’URL « / », redirect index avec parametre client.
router.get('/', function(req, res) {
    res.render('index', { user: req.user });
});

//Si client existe renvoie vers / ou s'inscrire.
router.get('/register', function(req, res) {
    if (req.session.passport.user != null) {
        res.redirect('/event');
    } else {
        res.render('register', {
            title: 'Sign-up'
        });
    }
});

//Enregistre les données entrer du  si error renvoie avec message
router.post('/register', function(req, res, next) {
    Account.register(new Account({ username: req.body.username }), req.body.password, function(err, account) {
        if (err) {
            return res.render('register', { error: err.message });
        }

        passport.authenticate('local')(req, res, function() {
            req.session.save(function(err) {
                if (err) {
                    return next(err);
                }
                res.redirect('/');
            });
        });
    });
});

//Si Login renvoie vers /event
router.get('/event', function(req, res) {
    if (req.session.passport.user != null) {
        res.redirect('/');
    } else {
        res.render('login', {
            user: req.user,
            title: 'Sign-in',
            subTitle: 'Come back please !'
        });
    }
});

//Vérification si le compte éxiste déjà /event, sinon renvoie vers /
router.post('/login', passport.authenticate('local'), function(req, res) {
    if (req.session.passport.user != null) {
        res.redirect('/');
    } else {
        res.redirect('/event');
    }
});

//Vérifie si la session éxiste, si oui on detruit la session et redirection /event
router.get('/logout', function(req, res) {
    if (req.session.passport.user != null) {
        req.logout();
        res.redirect('/');
    } else {
        res.redirect('/event')
    }
});


module.exports = router;