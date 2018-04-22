import React from 'react'
import { ActivityIndicator, StyleSheet, TextInput, View, SafeAreaView, StatusBar, WebView } from 'react-native'
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
        <View style={styles.navbar}>
          {this.state.status !== 'loading'
            ? <Icon
              name={statusIconMap[this.state.status]}
              color='#fff'
              style={styles.indicator}
            />
            : <ActivityIndicator size='small' color='#fff' />
          }
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
          <Icon
            name='more-vert'
            color='#fff'
            style={styles.menu}
          />
        </View>
        <WebView
          source={{uri: this.state.updatedUrl}}
          onNavigationStateChange={this.onNavigation}
        />
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
    flexDirection: 'row'
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
  }
})
