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

// 获取屏幕宽度
const screenWidth = Dimensions.get('window').width;

const LoginScreen: React.FC = () => {
  const colors = useThemeColors();
  const navigation = useTypedNavigation();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  const handleLogin = () => {
    // 实现登录逻辑
    console.log('登录信息:', { email, password });
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
                placeholder="邮箱地址"
                placeholderTextColor="#666"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

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
