module.exports = {
    getListeners: function() {
        return [
            { messageType: 'test', listener : function(message) { console.log('message:',message); } }
        ];
    }
}
