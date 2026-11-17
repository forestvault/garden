import express from 'express';
import routes from './endpoints/index.js';
import listeners from './listeners/index.cjs';

import mqttServer from './hal/mqtt.cjs';

import cors from 'cors';
const app = express();
const port = process.env.PORT || 8081;
const BASE = process.env.BASE || "/homelab";

app.use(cors());

app.use(express.json());

//========
// Routes
app.use(`${BASE}/api`, routes);

/*
 * Default message listener
 */
const onMessage=(topic, message)=>{
  console.log('JSON message', message);
}

// Register all protocol based message listeners
mqttServer.registerListener(listeners.getListners());

// connect  mqtt
mqttServer.connect(onMessage);

// Strart server.
app.listen(port, () => {
  console.log(`📡 Server running smoothly on http://0.0.0.0:${port}`);
});
