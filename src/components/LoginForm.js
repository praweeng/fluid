import React from 'react';
import { View, ToastAndroid } from 'react-native';
import { Screen, Title, Icon, Text, TextInput, Divider, Button, Spinner } from '@shoutem/ui';
import { NavigationBar } from '@shoutem/ui'
import firebase from 'firebase';

function NavBarStageContainer(props) {
  return (
    <View
      {...props}
      style={{
        width: window.width,
        height: 70,
        ...props.style,
      }}
    />
  );
}

class LoginForm extends React.Component {

 state = { email: '', password: '', loading: false}

        OnButtonPress() {
                const { email, password } = this.state;
                this.setState({ loading: true});
                firebase.auth().signInWithEmailAndPassword(email, password)
                .then(this.OnLoginSuccess.bind(this))
                .catch(() => {
                        firebase.auth().createUserWithEmailAndPassword(email, password)
                         .then(this.OnLoginSuccess.bind(this))
                         .catch(this.onLoginFailed.bind(this));
                });
        }

        onLoginFailed() {
                if( this.state.email == '' || this.state.password == '' ) {
                        ToastAndroid.show('Enter email and password', ToastAndroid.LONG); 
                }
                else{
                        ToastAndroid.show('Wrong Credentials', ToastAndroid.LONG);
                }
             this.setState({ loading: false });
        }

        OnLoginSuccess() {
                this.setState({
                        email: '',
                        password: '',
                        loading: false
                });
        }

        renderButton() {
                if( this.state.loading ){
                        return <Spinner />
                }
                return (
                <Button onPress={ this.OnButtonPress.bind(this) }>
                <Text>Login</Text>
                </Button>
                );
        }
        render() {
        return(
          <View>

                <NavBarStageContainer style={{ backgroundColor: '#8F60FF', }}>
                <NavigationBar
                styleName="clear"
                title="Login"
                />
                </NavBarStageContainer>

                <Divider />

               <TextInput 
                 value={this.state.email}
                 autoCorrect={false}
                 onChangeText={ email => this.setState( { email } ) } 
                 placeholder={'Username or Email'}
                />

                 <Divider />

                <TextInput 
                 value={this.state.password}
                 onChangeText={ password => this.setState( { password } ) } 
                 placeholder={'Password'}
                 secureTextEntry
                />
                <Divider />
                {this.renderButton()}
        </View>
        );
    }
}

export default LoginForm