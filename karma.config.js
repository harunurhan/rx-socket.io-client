module.exports = function (config) {
  config.set({
    frameworks: ["socketio-server", "jasmine", "karma-typescript"],
    files: [
      { pattern: "src/**/*.ts" },
    ],
    preprocessors: {
      "**/*.ts": ["karma-typescript"],
    },
    karmaTypescriptConfig: {
      tsconfig: "./tsconfig.spec.json",
    },
    socketioServer: {
      port: 8080,
      onConnect: function (socket) {
        socket.on('karma-mirror-event', function (data) {
          socket.emit('karma-mirror-event', data);
        });
      }
    },
    browsers: ["Chrome"]
  });
};