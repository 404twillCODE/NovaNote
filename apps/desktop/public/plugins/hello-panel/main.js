(function () {
  const host = window.EditorHost;
  if (!host) return;

  host.call('app.getInfo', undefined).then(function (r) {
    if (r.ok && r.data) {
      document.getElementById('root').innerHTML =
        '<p>NovaNote: ' + r.data.name + ' v' + r.data.version + '</p>' +
        '<button id="toast">Show toast</button>' +
        '<button id="cmd">Register command</button>';
      document.getElementById('toast').onclick = function () {
        host.call('app.showToast', { message: 'Hello from Hello Panel!', type: 'info' });
      };
      document.getElementById('cmd').onclick = function () {
        host.call('commands.register', {
          id: 'hello-panel.sayHi',
          label: 'Say Hi',
          handler: function () {
            host.call('app.showToast', { message: 'Hi from command!', type: 'success' });
          },
        });
      };
    }
  });
})();
