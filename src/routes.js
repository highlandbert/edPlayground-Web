import express from 'express'

// Add Routes Here
const setup = (app) => {

    addRoute(app, '/', 'landing', { title: 'Landing' });

};

const addRoute = (app, route, template, params = {}) => app.get(route, (req, res) => res.render(template, params));

export default setup;