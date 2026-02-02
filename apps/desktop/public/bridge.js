(function () {
  window.EditorHost = {
    call: function (method, payload) {
      return new Promise(function (resolve) {
        var id = Math.random().toString(36).slice(2);
        function handler(e) {
          if (e.data && e.data.type === 'nova-host-response' && e.data.id === id) {
            window.removeEventListener('message', handler);
            resolve(e.data.response);
          }
        }
        window.addEventListener('message', handler);
        window.parent.postMessage({ type: 'nova-host-call', id: id, method: method, payload: payload }, '*');
      });
    },
    on: function (event, cb) {
      window.addEventListener('nova-host-event-' + event, cb);
    }
  };
})();
