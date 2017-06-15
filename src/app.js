import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationBar , View, Icon, Title, Text, Button, Spinner } from '@shoutem/ui';
import firebase from 'firebase';
import LoginForm from './components/LoginForm';
import Main from './components/Main';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducers from './reducers';

export default class App extends React.Component {
  state = { loggedIn: null };
    componentWillMount() {
           const config = {
                apiKey: "AIzaSyC9My4ORDisiupOe0SxVi7b5Vxi7dE7XVI",
                authDomain: "fluid-9f901.firebaseapp.com",
                databaseURL: "https://fluid-9f901.firebaseio.com",
                projectId: "fluid-9f901",
                storageBucket: "fluid-9f901.appspot.com",
                messagingSenderId: "684028089582"
         };

        firebase.initializeApp(config);

         firebase.auth().onAuthStateChanged((user) =>{
            if(user) {
                this.setState({ loggedIn: true });
            } else {
                this.setState({ loggedIn: false });
            }
         });
    }

  renderContent() {

    switch( this.state.loggedIn ) {
        case true:
           return (
             <Button onPress={ () => firebase.auth().signOut() }> 
                   <Text>Log Out</Text> 
             </Button>
           );
        case false:
           return   <LoginForm />;
        default:
           return <Spinner />;
    }
  }

  render() {
    return (
      <Provider store={createStore(reducers)}>
        <View>
                  <LoginForm/>
        </View>
      </Provider>
        
    );
  }
}

