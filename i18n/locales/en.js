export default {
  controls: {
    'refresh': 'Refresh',
    'about': 'About'
  },
  pageStatus: {
    title: {
      loading: 'Loading...',
      http: 'HTTP Site',
      https: 'HTTPS Site',
      dat: 'P2P site through Dat'
    },
    detail: {
      loading: 'This site is not ready yet. It\'s still being loaded.',
      http: 'This site is served by its servers, unencrypted. ' +
        'Sites decides who can see this page, but anyone can simply capture what ' +
        'you are seeing or submitting on its way to site servers. This site is not ' +
        'safe in privacy at all, and you should avoid submitting any sensitive data ' +
        'on this site.',
      https: 'This site is served by its servers, encrypted. ' +
        'Sites decides who can see this page, but your data may not be encrypted on ' +
        'their servers. Censors may be able to see your data if they have access to ' +
        'site servers.',
      dat: 'This site is delivered to you using Dat protocol. ' +
        'Data is encrypted during peer-to-peer distribution. All data are available to ' +
        'all users who knows the URL of this site. Censors may learn your IP address ' +
        'when you are visiting this site.'
    }
  }
}
