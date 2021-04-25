const express = require('express');
const route = express.Router();

route.get('/', (req, res) => {
    res.render('index');
});
route.get('/account/login', (req, res) => {
    res.render('account');
});
route.get('/account/sighn_up', (req, res) => {
    res.render('account');
})
route.get('/ebook', (req, res) => {
    res.render('ebook');
});
route.get('/ebook/ebookCart', (req, res) => {
    res.render('ebookCart');
});
route.get('/bookshelfhome', (req, res) => {
    res.render('bookshelfhome');
});
route.get('/novelsBookshelf', (req, res) => {
    res.render('novelsBookshelf');
});
route.get('/thillerBookshelf', (req, res) => {
    res.render('thillerBookshelf');
});
route.get('/adventureBookshelf', (req, res) => {
    res.render('adventureBookshelf');
});
route.get('/biographyBookshelf', (req, res) => {
    res.render('biographyBookshelf');
});
route.get('/schoolBookshelf', (req, res) => {
    res.render('schoolBookshelf');
});
route.get('/collageBookshelf', (req, res) => {
    res.render('collageBookshelf');
});
route.get('*', function (req, res) {
    res.status(404).render('error');
});

module.exports = route;

