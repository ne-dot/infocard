import { NativeModules, Platform } from 'react-native';
import enTranslations from './translations/en.json';
import zhTranslations from './translations/zh.json';

// 获取设备语言
const getDeviceLanguage = (): string => {
  // iOS
  if (Platform.OS === 'ios') {
    return (
      NativeModules.SettingsManager?.settings?.AppleLocale ||
      NativeModules.SettingsManager?.settings?.AppleLanguages[0] ||
      'en'
    );
  }
  // Android
  return NativeModules.I18nManager?.localeIdentifier || 'en';
};

// 简化语言代码 (例如: zh_CN -> zh, en_US -> en)
const simplifyLanguageCode = (languageCode: string): string => {
  return languageCode.split(/[-_]/)[0];
};

// 获取当前语言
const getCurrentLanguage = (): string => {
  const deviceLanguage = getDeviceLanguage();
  const simplifiedCode = simplifyLanguageCode(deviceLanguage);

  // 如果是中文，返回zh，否则返回en
  return simplifiedCode === 'zh' ? 'zh' : 'en';
};

// 翻译资源
const translations: Record<string, any> = {
  en: enTranslations,
  zh: zhTranslations,
};

// 当前语言
const currentLanguage = getCurrentLanguage();

// 翻译函数
export const t = (key: string): string => {
  const keys = key.split('.');
  let result = translations[currentLanguage];

  for (const k of keys) {
    if (result && result[k]) {
      result = result[k];
    } else {
      // 如果找不到翻译，返回英文翻译或键名
      let enResult = translations.en;
      for (const enK of keys) {
        if (enResult && enResult[enK]) {
          enResult = enResult[enK];
        } else {
          return key;
        }
      }
      return typeof enResult === 'string' ? enResult : key;
    }
  }

  return typeof result === 'string' ? result : key;
};

// 导出当前语言代码
export const currentLang = currentLanguage;
