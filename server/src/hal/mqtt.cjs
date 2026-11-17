const mqtt = require('mqtt');

const MQTT_URL=process.env.MQTT_URL || "mqtt://localhost:1883";
const MQTT_TOPIC=process.env.MQTT_TOPIC || "homelab";

const messageListeners = new Map();

/*
 * MQTT communication module.
 *
 * Receives messages from mqtt.
 * 
 */
module.exports = {
  connect: function(messageCallback) {
    const client = mqtt.connect(MQTT_URL);
    client.on('connect', function () {
      console.log(`Connected to MQTT broker at ${MQTT_URL}`);
      client.subscribe(MQTT_TOPIC, function (err) {
        if (!err) {
          console.log(`Subscribed to topic ${MQTT_TOPIC}`);
        } else {
          console.error(`Failed to subscribe to topic ${MQTT_TOPIC}:`, err);
        }
      });
    });

    client.on('message', function (topic, message) {
      // Check message type
      try {
        // Get message string and parse JSON
        const json = JSON.parse(message.toString());
        const messageType = json.messageType;
        if (messageType) {
          const listener = messageListeners.get(messageType);
          // Call the listener, use default callback function if not found
          if (listener) {
            listener(json.message);
          } else {
            if (messageCallback) {
              messageCallback(topic, json);
            }
          }
        }
      } catch (error) {
        console.error(error);
      }
    });

    return client;
  },
  addListener: function (messageType, listener) {
    messageListeners.set(messageType, listener);
  },
  removeListener: function(messageType) {
    messageListeners.delete(messageType);
  },
  /*
   * Register listeners
   */
  registerListener: function(listeners) {
    if (Array.isArray(listeners)) {
      listeners.map(listener => {
        if (listener.messageType && listener.listener) {
          console.log('registering listener for message type', listener.messageType, ' listener', listener.listener);
          this.addListener(listener.messageType, listener.listener);
        } else {
          console.warn('message type or listener function missing', listener.messageType, listener.listener);
        }
      });
    } else {
      throw new Error('Listeners must be array');
    }
  }
};