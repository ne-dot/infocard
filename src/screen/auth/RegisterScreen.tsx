import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useThemeColors } from '../../theme/colors';
import { useTypedNavigation } from '../navigation';
import Header from '../../components/NavigationHeader';
import { useAuthStore } from '../../store/authStore';
import Toast from 'react-native-toast-message';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
// 替换 Toast 导入
import { showSuccessToast, showErrorToast } from '../../utils/toast';
// 导入 loading hook
import { useLoading } from '../../components/Loading';
// 导入加密工具
import { AESTool } from '../../utils/crypto';
// 导入多语言工具
import { t } from '../../i18n';

// 获取屏幕宽度
const screenWidth = Dimensions.get('window').width;

const RegisterScreen: React.FC = () => {
  const colors = useThemeColors();
  const inserts = useSafeAreaInsets();
  const navigation = useTypedNavigation();
  const [email, setEmail] = React.useState('');
  const [username, setUsername] = React.useState(''); // 添加用户名状态
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState(''); // 添加确认密码状态
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false); // 添加显示确认密码状态

  // 从 authStore 中获取注册方法和状态
  const { register, loading, error, registerSuccess } = useAuthStore();
  // 使用 loading hook
  const { showLoading, hideLoading } = useLoading();

  // 监听 loading 状态变化
  React.useEffect(() => {
    if (loading) {
      showLoading(t('register.registering'));
    } else {
      hideLoading();
    }
  }, [loading, showLoading, hideLoading]);

  // 监听注册成功状态，成功后跳转到登录页面
  React.useEffect(() => {
    if (registerSuccess) {
      showSuccessToast(t('register.registerSuccess'), {
        onHide: () => navigation.goBack(),
      });
      // 清除注册成功状态
      useAuthStore.getState().clearRegisterSuccess();
    }
  }, [registerSuccess, navigation]);

  const handleRegister = async () => {
     // 表单验证
    if (!email || !username || !password || !confirmPassword) {
      showErrorToast(t('register.fillAllFields'));
      return;
    }
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log('check', email, emailRegex.test(email));
    if (!emailRegex.test(email)) {
      showErrorToast(t('register.validEmail'));
      return;
    }
    // 验证用户名长度
    if (username.length < 2 || username.length > 20) {
      showErrorToast(t('register.usernameLength'));
      return;
    }
    // 验证用户名不能是纯数字，必须包含字母
    const usernameRegex = /^(?=.*[a-zA-Z])[\w\u4e00-\u9fa5]+$/;
    if (!usernameRegex.test(username)) {
      showErrorToast(t('register.usernameFormat'));
      return;
    }
    // 验证密码长度
    if (password.length < 6 || password.length > 18) {
      showErrorToast(t('register.passwordLength'));
      return;
    }
    // 验证密码必须包含字母和数字
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).+$/;
    if (!passwordRegex.test(password)) {
      showErrorToast(t('register.passwordFormat'));
      return;
    }
    // 验证两次密码是否一致
    if (password !== confirmPassword) {
      showErrorToast(t('register.passwordMismatch'));
      return;
    }

    try {
      // 对密码进行加密
      const encryptedPassword = AESTool.encrypt(password);
      // 调用 authStore 中的注册方法，传入加密后的密码
      await register(username, encryptedPassword, email);
      // 如果有错误，显示错误信息
      if (error) {
        showErrorToast(error || t('register.unknownError'));
      }
    } catch (err: any) {
      console.error('注册过程中出错:', err);
      showErrorToast(err.message || t('register.registerError'));
    }
  };

  const handleLogin = () => {
    // 导航到登录页面
    navigation.goBack();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
        <Header title="" />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoidingView}
        >
          <View style={styles.content}>
            <Text style={[styles.title, {color: colors.text}]}>{t('register.title')}</Text>
            <Text style={[styles.subtitle, {color: colors.subText}]}>
              {t('register.haveAccount')}
              <Text style={[styles.loginLink, {color: colors.primay}]} onPress={handleLogin}>
                {t('register.login')}
              </Text>
            </Text>

            <View style={[styles.inputContainer, {backgroundColor: colors.textBackground}]}>
              <TextInput
                style={[styles.input]}
                placeholder={t('register.emailAddress')}
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            {/* 添加用户名输入框 */}
            <View style={[styles.inputContainer, {backgroundColor: colors.textBackground}]}>
              <TextInput
                style={[styles.input]}
                placeholder={t('register.username')}
                placeholderTextColor="#666"
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            <View style={[styles.inputContainer, {backgroundColor: colors.textBackground}]}>
              <TextInput
                style={[styles.input]}
                placeholder={t('register.password')}
                placeholderTextColor="#666"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={[styles.passwordToggle]}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Icon
                  name={showPassword ? 'visibility' : 'visibility-off'}
                  size={18}
                  color="#666"
                />
              </TouchableOpacity>
            </View>

            {/* 添加确认密码输入框 */}
            <View style={[styles.inputContainer, {backgroundColor: colors.textBackground}]}>
              <TextInput
                style={[styles.input]}
                placeholder={t('register.confirmPassword')}
                placeholderTextColor="#666"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                style={[styles.passwordToggle]}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Icon
                  name={showConfirmPassword ? 'visibility' : 'visibility-off'}
                  size={18}
                  color="#666"
                />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={[styles.registerButton, {backgroundColor: colors.primay}]}
              onPress={handleRegister}
            >
              <Text style={[styles.registerButtonText, {color: "#fff"}]}>{t('register.submit')}</Text>
            </TouchableOpacity>

            <Text style={styles.termsText}>
              {t('register.termsAgreement')}
              <Text style={[styles.termsLink, {color: colors.primay}]}> {t('register.termsOfUse')} </Text>
              {t('register.and')}
              <Text style={[styles.termsLink, {color: colors.primay}]}> {t('register.privacyPolicy')}</Text>
            </Text>
          </View>
        </KeyboardAvoidingView>
        <Toast topOffset={inserts.top}/>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 32,
  },
  loginLink: {
    fontWeight: '500',
  },
  inputContainer: {
    marginBottom: 16,
    flexDirection: 'row',
    width: screenWidth - 48,
    alignItems: 'center',
    height: 60,
    borderRadius: 30,
  },
  input: {
    padding: 16,
    fontSize: 16,
    flex: 1,
  },
  passwordToggle: {
    padding: 16,
  },
  registerButton: {
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  registerButtonText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
  },
  dividerText: {
    color: '#999',
    paddingHorizontal: 16,
    fontSize: 14,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 32,
  },
  socialButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
  },
  termsText: {
    color: '#999',
    fontSize: 12,
    textAlign: 'center',
  },
  termsLink: {
  },
});

export default RegisterScreen;