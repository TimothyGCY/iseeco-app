import React, { PureComponent } from 'react';
import { Alert, View } from 'react-native';
import { Formik } from 'formik';
import { connect, MapStateToProps } from 'react-redux';
import { NavigationRoute, NavigationScreenProp } from 'react-navigation';
import { Dispatch } from 'redux';

import IStore from '../../types/IStore';
import { login } from '../../store/app/actions';
import messages from '../../lib/messages';
import { xmpp } from '../../lib/XMPP';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Wrapper from '../../components/Wrapper';
import OfflineNotice from '../../components/OfflineNotice';

interface IOwnProps {
  onSubmit: (values: ILoginFormProps) => void;
  navigation: NavigationScreenProp<NavigationRoute>;
  dispatch: Dispatch;
}

interface IStateToProps {
  userName: string | null;
  serverName: string | null;
  ip: string | null;
}

type IComponentProps = IOwnProps & IStateToProps;

interface IComponentStates {
  loading: boolean;
}

interface ILoginFormProps {
  server: string;
  user: string;
  password: string;
  ip: string;
}

const loginInitialValues: ILoginFormProps = {
  server: '',
  user: '',
  password: '',
  ip: '',
};

class SignIn extends PureComponent<IComponentProps, IComponentStates> {
  static navigationOptions = {
    title: messages.accountInformation,
  };

  state = {
    loading: false,
  };

  handleSubmit = async (values: ILoginFormProps) => {
    const { user, password, ip, server } = values;
    if ((user.trim() !== '' && password.trim() !== '') || ip.trim() !== '') {
      xmpp
        .login(
          (ip, pass, server, user) => {
            this.props.dispatch(login(ip, pass, server, user));
            this.props.navigation.navigate('Home');
          },
          this.props.dispatch,
          ip,
          password,
          server.toLowerCase(),
          user.toLowerCase()
        )
        .catch((message) => {
          if (message) {
            Alert.alert('Login Faild', message);
          }
          this.setState({ loading: false });
        });
    } else {
      Alert.alert('Validation', 'Please enter valid credential');
      this.setState({ loading: false });
    }
  };

  handleFolan = (onSubmit) => () => {
    onSubmit();
    this.setState({ loading: true });
  };

  render() {
    return (
      <View style={{ flexDirection: 'column', flex: 1 }}>
        <OfflineNotice />
        <Formik initialValues={loginInitialValues} onSubmit={this.handleSubmit}>
          {(props) => (
            <Wrapper>
              <Input
                onChangeText={props.handleChange('server')}
                onBlur={props.handleBlur('server')}
                value={props.values.server}
                placeholder={messages.serverName}
                returnKeyType={'next'}
              />
              <Input
                onChangeText={props.handleChange('user')}
                onBlur={props.handleBlur('user')}
                value={props.values.user}
                placeholder={messages.userName}
                returnKeyType={'next'}
              />
              <Input
                onChangeText={props.handleChange('password')}
                onBlur={props.handleBlur('password')}
                value={props.values.password}
                placeholder={messages.password}
                returnKeyType={'next'}
                secureTextEntry={true}
              />
              <Input
                onChangeText={props.handleChange('ip')}
                onBlur={props.handleBlur('ip')}
                value={props.values.ip}
                placeholder={messages.ipOfLocalServer}
              />
              <Button
                onPress={this.handleFolan(props.handleSubmit)}
                title={messages.save}
                color={'blue'}
                loading={this.state.loading}
              />
            </Wrapper>
          )}
        </Formik>
      </View>
    );
  }
}

const mapStateToProps: MapStateToProps<IStateToProps, IOwnProps, IStore> = (
  state
) => {
  const ip = state.app.ip;
  const serverName = state.app.serverName;
  const userName = state.app.userName;

  return { ip, serverName, userName };
};

export default connect(mapStateToProps)(SignIn);
