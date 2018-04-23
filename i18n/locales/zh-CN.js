export default {
  controls: {
    'refresh': '刷新',
    'about': '关于'
  },
  pageStatus: {
    title: {
      loading: '加载中...',
      http: 'HTTP 网站',
      https: 'HTTPS 网站',
      dat: '基于 Dat 协议的 P2P 网站'
    },
    detail: {
      loading: '这个网页依然在加载，尚未完成。',
      http: '这个网页由网站服务器提供，传输过程没有加密。' +
        '任何人都可以监听你与网站服务器之间的通讯，尽管网站可以控制本页对谁可见。此站点在隐私保护' +
        '方面一点也不安全，您应当避免在这个网站上提交任何涉及隐私的信息。',
      https: '这个网页由网站服务器提供，传输过程加密。' +
        '该网站能决定谁能看到这个页面，但是您的数据在其服务器上并不一定得到了妥善的加密。审查者' +
        '依然能够看到您的数据，如果他们掌握了网站服务器。',
      dat: 'This site is delivered to you using Dat protocol. ' +
        'Data is encrypted during peer-to-peer distribution. All data are available to ' +
        'all users who knows the URL of this site. Censors may learn your IP address ' +
        'when you are visiting this site.'
    }
  }
}
