import path from 'path'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import handlebars from 'express-handlebars'
import setRoutes from './routes'
import setWebapps from './webapps'
import setPublic from './public'

const app = express();
app.use(helmet());
app.use(morgan('tiny'));

app.engine('handlebars', handlebars({ defaultLayout: 'main', layoutsDir: 'src/views/layouts'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'handlebars');

setPublic(app);
setRoutes(app);
setWebapps(app);

export default app;