const rnBridge = require('rn-bridge')

rnBridge.channel.on('message', msg => {
  rnBridge.channel.send(msg)
})

// Inform react-native node is initialized.
rnBridge.channel.send('DAT server is now ready.')
