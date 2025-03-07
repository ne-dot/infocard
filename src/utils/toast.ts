import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';

interface ToastOptions {
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
  onHide?: () => void;
}

/**
 * 显示 Toast 消息
 * @param options Toast 配置选项
 */
export const showToast = (options: ToastOptions) => {
  const { title, message, type = 'info', duration, onHide } = options;
  
  Toast.show({
    type,
    text1: title || getDefaultTitle(type),
    text2: message,
    visibilityTime: duration || 3000,
    onHide,
  });
};

/**
 * 根据类型获取默认标题
 */
const getDefaultTitle = (type: ToastType): string => {
  switch (type) {
    case 'success':
      return '成功';
    case 'error':
      return '错误';
    case 'info':
    default:
      return '提示';
  }
};

/**
 * 成功提示
 */
export const showSuccessToast = (message: string, options?: Partial<Omit<ToastOptions, 'message' | 'type'>>) => {
  showToast({
    message,
    type: 'success',
    ...options,
  });
};

/**
 * 错误提示
 */
export const showErrorToast = (message: string, options?: Partial<Omit<ToastOptions, 'message' | 'type'>>) => {
  showToast({
    message,
    type: 'error',
    ...options,
  });
};

/**
 * 信息提示
 */
export const showInfoToast = (message: string, options?: Partial<Omit<ToastOptions, 'message' | 'type'>>) => {
  showToast({
    message,
    type: 'info',
    ...options,
  });
};
