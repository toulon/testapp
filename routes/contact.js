var Contact = require('../models/contact'),
    mapper = require('../lib/model-mapper');

module.exports = function(app) {

    app.param('contactId', function(req, res, next, id) {
        Contact.findById(id, function(err, contact) {
            if (err) {
                next(err);
            } else {
                res.locals.contact = contact;
                next();
            }
        });
    });
    
    app.get('/contacts', function(req, res) {
        Contact.find({}, function(err, contacts) {
            res.render('contact/index', { contacts : contacts });
        });
    });

    app.get('/contacts/create', function(req, res) {
        res.render('contact/create', { contact : new Contact() });
    });

    app.post('/contacts/create', function(req, res) { 
        var contact = new Contact(req.body);

        contact.save(function(err) {
            if (err) {
                res.render('contact/create', {
                    contact : contact
                });
            } else {
                res.redirect('/contacts');
            }
        });
    });

    app.get('/contacts/:contactId/edit', function(req, res) {
        res.render('contact/edit');
    });

    app.post('/contacts/:contactId/edit', function(req, res) {
        mapper.map(req.body).to(res.locals.contact);

        res.locals.contact.save(function(err) {
            if (err) {
                res.render('contact/edit');
            } else {
                res.redirect('/contacts');
            }
        });
    });

    app.get('/contacts/:contactId/detail', function(req, res) {
        res.render('contact/detail');
    });

    app.get('/contacts/:contactId/delete', function(req, res) {
        res.render('contact/delete');
    });

    app.post('/contacts/:contactId/delete', function(req, res) {
        Contact.remove({ _id : req.params.contactId }, function(err) {
            res.redirect('/contacts');
        });
    });
}

// Used to build the index page. Can be safely removed!
module.exports.meta = {
    name : 'Contact',
    route : '/contacts'
}
