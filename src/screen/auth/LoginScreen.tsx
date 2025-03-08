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
// 导入 Toast 工具
import { showSuccessToast, showErrorToast } from '../../utils/toast';
// 导入 loading hook
import { useLoading } from '../../components/Loading';
// 导入加密工具
import { AESTool } from '../../utils/crypto';

// 获取屏幕宽度
const screenWidth = Dimensions.get('window').width;

const LoginScreen: React.FC = () => {
  const colors = useThemeColors();
  const inserts = useSafeAreaInsets();
  const navigation = useTypedNavigation();
  // 将 email 改为 account，表示账号可以是邮箱或用户名
  const [account, setAccount] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  // 从 authStore 中获取登录方法和状态
  const { login, loading, error, fetchUserInfo } = useAuthStore();
  // 使用 loading hook
  const { showLoading, hideLoading } = useLoading();

  // 监听 loading 状态变化
  React.useEffect(() => {
    if (loading) {
      showLoading('登录中...');
    } else {
      hideLoading();
    }
  }, [loading, showLoading, hideLoading]);

  const handleLogin = async () => {
    // 表单验证
    if (!account || !password) {
      showErrorToast('请输入账号和密码');
      return;
    }

    try {
      // 对密码进行加密
      const encryptedPassword = AESTool.encrypt(password);
      // 判断输入的是邮箱还是用户名
      const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account);
      // 调用登录接口，根据输入类型传递不同参数
      if (isEmail) {
        await login(account, encryptedPassword, 'email');
      } else {
        await login(account, encryptedPassword, 'username');
      }
      // 如果有错误，显示错误信息
      if (error) {
        showErrorToast(error || '登录失败');
        return;
      }

      await fetchUserInfo();
      showSuccessToast('登录成功');
      // 登录成功后，跳转到首页
      navigation.goBack();
    } catch (err) {
      console.error('登录过程中出错:', err);
      showErrorToast('登录过程中出现错误，请稍后再试');
    }
  };

  const handleRegister = () => {
    // 导航到注册页面
    navigation.navigateTo('Register');
  };

  const handleSocialLogin = (provider: string) => {
    // 实现社交媒体登录
    console.log('使用以下方式登录:', provider);
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
            <Text style={[styles.title, {color: colors.text}]}>登录账号</Text>
            <Text style={[styles.subtitle, {color: colors.subText}]}>
              还没有账号？
              <Text style={[styles.registerLink, {color: colors.primay}]} onPress={handleRegister}>
                注册
              </Text>
            </Text>

            <View style={[styles.inputContainer, {backgroundColor: colors.textBackground}]}>
              <TextInput
                style={[styles.input]}
                placeholder="邮箱或用户名"
                placeholderTextColor="#666"
                value={account}
                onChangeText={setAccount}
                autoCapitalize="none"
              />
            </View>
            {/* 密码输入框和其他UI保持不变 */}
            <View style={[styles.inputContainer, {backgroundColor: colors.textBackground}]}>
              <TextInput
                style={[styles.input]}
                placeholder="密码"
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
            <TouchableOpacity
              style={[styles.loginButton, {backgroundColor: colors.primay}]}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>继续</Text>
            </TouchableOpacity>

            <View style={styles.dividerContainer}>
              <View style={[styles.divider, {backgroundColor: colors.searchBackground}]} />
              <Text style={styles.dividerText}>或使用以下方式登录</Text>
              <View style={[styles.divider, {backgroundColor: colors.searchBackground}]} />
            </View>

            <View style={styles.socialContainer}>
              <TouchableOpacity
                style={[styles.socialButton, {borderColor: colors.primay}]}
                onPress={() => handleSocialLogin('google')}
              >
                <Icon name="android" size={24} color={colors.primay} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.socialButton, {borderColor: colors.primay}]}
                onPress={() => handleSocialLogin('apple')}
              >
                <Icon name="apple" size={24} color={colors.primay} />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.socialButton, {borderColor: colors.primay}]}
                onPress={() => handleSocialLogin('facebook')}
              >
                <Icon name="facebook" size={24} color={colors.primay} />
              </TouchableOpacity>
            </View>

            <Text style={styles.termsText}>
              点击登录即表示您同意我们的
              <Text style={[styles.termsLink, {color: colors.primay}]}> 使用条款 </Text>
              和
              <Text style={[styles.termsLink, {color: colors.primay}]}> 隐私政策</Text>
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
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    marginBottom: 32,
  },
  registerLink: {
    color: '#DDFF00',
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
  loginButton: {
    backgroundColor: '#DDFF00',
    borderRadius: 30,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  loginButtonText: {
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
    backgroundColor: '#333',
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
    borderColor: '#333',
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
    color: '#DDFF00',
  },
});

export default LoginScreen;
