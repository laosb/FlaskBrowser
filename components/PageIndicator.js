import React from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import Menu, { MenuOptions, MenuTrigger, Popover } from 'react-native-popup-menu'
import { Icon } from 'react-native-elements'

import I18n from '../i18n/'
import commonStyles from '../styles/common'

const statusIconMap = {
  dat: 'group',
  http: 'web',
  https: 'lock'
}

const colorMap = {
  dat: '#3498db',
  https: '#2cbe4e',
  http: '#cb2431',
  loading: '#333'
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
      <View style={styles.popover}>
        <Text style={[commonStyles.font, { fontWeight: 'bold', color: colorMap[props.status], paddingBottom: 5 }]}>
          {I18n.t('pageStatus.title.' + props.status)}
        </Text>
        <Text>
          {I18n.t('pageStatus.detail.' + props.status)}
        </Text>
      </View>
    </MenuOptions>
  </Menu>

const styles = StyleSheet.create({
  popover: {
    padding: 13
  },
  indicator: {}
})

export default PageIndicator
