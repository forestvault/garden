/*
 * Listeners
 * New listeners are aded here.
 */
const test = require('./test/TestListener.cjs');

const listeners = test.getListeners();

module.exports = {
    getListners:function() {
        return listeners;
    }
}
