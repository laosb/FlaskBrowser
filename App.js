import React from 'react'
import { ActivityIndicator, StyleSheet, Text, TextInput, View, SafeAreaView, StatusBar, WebView } from 'react-native'
import Menu, { MenuProvider, MenuOptions, MenuOption, MenuTrigger, Popover } from 'react-native-popup-menu'
import { Icon } from 'react-native-elements'

export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      typingUrl: '',
      updatedUrl: '',
      url: 'https://google.com',
      status: 'loading'
    }
    this.onNavigation = this.onNavigation.bind(this)
  }
  onNavigation ({ url, loading }) {
    this.setState({ url, typingUrl: url })
    this.setState({ status: 'http' })
    if (url.startsWith('dat://')) this.setState({ status: 'dat' })
    if (url.startsWith('https://')) this.setState({ status: 'https' })
    if (loading) this.setState({ status: 'loading' })
  }
  render () {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <MenuProvider>
          <View style={styles.navbar}>
            <Menu renderer={Popover}>
              <MenuTrigger>
                {this.state.status !== 'loading'
                  ? <Icon
                    name={statusIconMap[this.state.status]}
                    color='#fff'
                    style={styles.indicator}
                  />
                  : <ActivityIndicator size='small' color='#fff' />
                }
              </MenuTrigger>
              <MenuOptions>
                {this.state.status === 'loading' &&
                  <View style={styles.popover}>
                    <Text style={[styles.font, { fontWeight: 'bold' }]}>
                      Loading
                    </Text>
                    <Text>
                      The page is in progress of being loaded.
                    </Text>
                  </View>
                }
                {this.state.status === 'dat' &&
                  <View style={styles.popover}>
                    <Text style={[styles.font, { fontWeight: 'bold', color: '#3498db' }]}>
                      P2P site through Dat
                    </Text>
                    <Text>
                      This site is delivered to you using Dat protocol. Data is encrypted
                      during peer-to-peer distribution. All data are available to all users
                      who knows the URL of this site. Censors may learn your IP address when
                      you are visiting this site.
                    </Text>
                  </View>
                }
                {this.state.status === 'https' &&
                  <View style={styles.popover}>
                    <Text style={[styles.font, { fontWeight: 'bold', color: '#2cbe4e' }]}>
                      HTTPS site
                    </Text>
                    <Text>
                      This site is served by its servers, encrypted. Sites decides who can
                      see this page, but your data may not be encrypted on their servers.
                      Censors may be able to see your data if they have access to site servers.
                    </Text>
                  </View>
                }
                {this.state.status === 'http' &&
                  <View style={styles.popover}>
                    <Text style={[styles.font, { fontWeight: 'bold', color: '#cb2431' }]}>
                      HTTP site
                    </Text>
                    <Text>
                      This site is served by its servers, unencrypted. Sites decides who can
                      see this page, but anyone can simply capture what you are seeing or
                      submitting on its way to site servers. This site is not safe in privacy
                      at all, and you should avoid submitting any sensitive data on this site.
                    </Text>
                  </View>
                }
              </MenuOptions>
            </Menu>

            <TextInput
              style={[styles.font, styles.addressbar]}
              autoCapitalize='none'
              autoCorrect={false}
              clearButtonMode='while-editing'
              disableFullscreenUI
              underlineColorAndroid='transparent'
              selectionColor='#3498db'
              value={this.state.typingUrl}
              placeholder='dat://imstu.bid'
              onChangeText={text => this.setState({ typingUrl: text })}
              onSubmitEditing={() => {
                let url = this.state.typingUrl
                // In many cases users only enter an url like google.com, we'll need to add a scheme.
                if (!/^(about|https|http|dat):/i.test(url)) url = 'http://' + url
                this.setState({ url, updatedUrl: url })
              }}
            />
            <Menu>
              <MenuTrigger>
                <Icon
                  name='more-vert'
                  color='#fff'
                  style={[styles.font, styles.menu]}
                />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption value='refresh' onSelect={() => this.refs['mainFrame'].reload()}>
                  <Text style={styles.font}>Refresh</Text>
                </MenuOption>
                <MenuOption value={2}>
                  <Text style={styles.font}>About</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
          <WebView
            ref='mainFrame'
            source={{uri: this.state.updatedUrl}}
            onNavigationStateChange={this.onNavigation}
          />
        </MenuProvider>
      </SafeAreaView>
    )
  }
}

const statusIconMap = {
  dat: 'group',
  http: 'web',
  https: 'lock'
}

const StyleConstants = {
  navbarSpacing: 7
}

const styles = StyleSheet.create({
  font: {
    fontSize: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  navbar: {
    paddingTop: (StatusBar.currentHeight || 0) + StyleConstants.navbarSpacing,
    paddingBottom: StyleConstants.navbarSpacing,
    paddingLeft: StyleConstants.navbarSpacing,
    paddingRight: StyleConstants.navbarSpacing,
    backgroundColor: '#3498db',
    flexDirection: 'row',
    alignItems: 'center'
  },
  addressbar: {
    flex: 1,
    color: '#333',
    backgroundColor: '#fff',
    marginLeft: StyleConstants.navbarSpacing,
    marginRight: StyleConstants.navbarSpacing,
    padding: 3,
    borderRadius: 2,
    // Shadows for iOS only.
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 0 },
    shadowColor: '#333',
    elevation: 2, // Android
    shadowOpacity: 1
  },
  popover: {
    padding: 5
  }
})
