import I18n from 'react-native-i18n'
import en from './locales/en'
import zhCN from './locales/zh-CN'

I18n.fallbacks = true

I18n.translations = {
  en,
  'zh-Hans': zhCN
}

export default I18n
