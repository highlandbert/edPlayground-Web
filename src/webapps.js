import path from 'path'
import express from 'express'

// Add Webapps Here
const setup = (app) => {

    addWebapp(app, '/discover', 'webapps/discover');
    addWebapp(app, '/learn', 'webapps/learn');
    addWebapp(app, '/auth', 'webapps/auth');
    addWebapp(app, '/play', 'webapps/play');

};

const addWebapp = (app, name, dir) => {
    const fullpath = path.join(__dirname, dir);
    const notFound = (extension) => app.all(`${ name }/*.${ extension }`, (req, res) => res.status(404).send());
    const defaultsTo = (file) => app.all(`${ name }/*`, (req, res) => res.sendFile(`${ fullpath }/${ file }`));

    app.use(`${ name }`, express.static(fullpath));
    ['png', 'jpg', 'json', 'js', 'css', 'map'].forEach(extension => notFound(extension));
    defaultsTo('index.html');
};

export default setup;