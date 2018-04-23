import path from 'path'
import express from 'express'

const setup = (app) => app.use('/', express.static(path.join(__dirname, 'public')));

export default setup;