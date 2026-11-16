import express from 'express';
import routes from './endpoints/index.js';

import cors from 'cors';
const app = express();
const port = process.env.PORT || 8081;
const BASE = process.env.BASE || "/homelab";

app.use(cors());

app.use(express.json());

// no cache
/*BreederRouter.use((request, response, next) => {
    response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    response.setHeader('Pragma', 'no-cache');
    response.setHeader('Expires', '0');
    next();
});*/

//========
// Routes
app.use(`${BASE}/api`, routes);

/*app.use(`${BASE}/api/settings`,  settingsRouter);
app.use(`${BASE}/api/categories`, categoriesRouter);*/

app.listen(port, () => {
  console.log(`📡 Server running smoothly on http://0.0.0.0:${port}`);
});
