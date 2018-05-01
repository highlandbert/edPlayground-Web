import app from './app'

const port = process.env.PORT || 80;
app.listen(port);

console.log(`Magic happens on port: ${ port }`);