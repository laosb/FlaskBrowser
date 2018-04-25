import React from 'react'
import { StyleSheet, Text, TextInput, View, SafeAreaView, StatusBar, WebView } from 'react-native'
import Menu, { MenuProvider, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu'
import { Icon } from 'react-native-elements'

import I18n from './i18n/'
import commonStyles from './styles/common'
import PageIndicator from './components/PageIndicator'

export default class App extends React.Component {
  constructor () {
    super()
    this.state = {
      typingUrl: 'https://google.com',
      updatedUrl: 'https://google.com',
      url: 'https://google.com',
      status: 'loading'
    }
    this.onNavigation = this.onNavigation.bind(this)
  }
  onNavigation ({ url, loading }) {
    StatusBar.setNetworkActivityIndicatorVisible(false)
    this.setState({ url, typingUrl: url })
    this.setState({ status: 'http' })
    if (url.startsWith('dat://')) this.setState({ status: 'dat' })
    if (url.startsWith('https://')) this.setState({ status: 'https' })
    if (loading) {
      StatusBar.setNetworkActivityIndicatorVisible(true)
      this.setState({ status: 'loading' })
    }
  }
  render () {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle='light-content' />
        <MenuProvider>
          <View style={styles.navbar}>
            <PageIndicator status={this.state.status} />
            <TextInput
              style={[commonStyles.font, styles.addressbar]}
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
                  style={[commonStyles.font, styles.menu]}
                />
              </MenuTrigger>
              <MenuOptions>
                <MenuOption value='refresh' onSelect={() => this.refs['mainFrame'].reload()}>
                  <Text style={commonStyles.font}>{I18n.t('controls.refresh')}</Text>
                </MenuOption>
                <MenuOption value={2}>
                  <Text style={commonStyles.font}>{I18n.t('controls.about')}</Text>
                </MenuOption>
                <MenuOption value={3}>
                  <Text style={commonStyles.font}>{I18n.currentLocale()}</Text>
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

const StyleConstants = {
  navbarSpacing: 7
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db'
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
    // Reset shadows for iOS only.
    shadowRadius: 0,
    shadowOffset: { width: 0, height: 0 },
    elevation: 2, // Android
    shadowOpacity: 1
  }
})
