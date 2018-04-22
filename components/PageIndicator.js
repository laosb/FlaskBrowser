import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import Menu, { MenuOptions, MenuTrigger, Popover } from 'react-native-popup-menu'
import { Icon } from 'react-native-elements'

import commonStyles from '../styles/common'

const statusIconMap = {
  dat: 'group',
  http: 'web',
  https: 'lock'
}

const PageIndicator = props =>
  <Menu renderer={Popover}>
    <MenuTrigger>
      {props.status !== 'loading'
        ? <Icon
          name={statusIconMap[props.status]}
          color='#fff'
          style={styles.indicator}
        />
        : <ActivityIndicator size='small' color='#fff' />
      }
    </MenuTrigger>
    <MenuOptions>
      {props.status === 'loading' &&
        <View style={styles.popover}>
          <Text style={[commonStyles.font, { fontWeight: 'bold' }]}>
            Loading
          </Text>
          <Text>
            The page is in progress of being loaded.
          </Text>
        </View>
      }
      {props.status === 'dat' &&
        <View style={styles.popover}>
          <Text style={[commonStyles.font, { fontWeight: 'bold', color: '#3498db' }]}>
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
      {props.status === 'https' &&
        <View style={styles.popover}>
          <Text style={[commonStyles.font, { fontWeight: 'bold', color: '#2cbe4e' }]}>
            HTTPS site
          </Text>
          <Text>
            This site is served by its servers, encrypted. Sites decides who can
            see this page, but your data may not be encrypted on their servers.
            Censors may be able to see your data if they have access to site servers.
          </Text>
        </View>
      }
      {props.status === 'http' &&
        <View style={styles.popover}>
          <Text style={[commonStyles.font, { fontWeight: 'bold', color: '#cb2431' }]}>
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

const styles = StyleSheet.create({
  popover: {
    padding: 5
  },
  indicator: {}
})

export default PageIndicator
