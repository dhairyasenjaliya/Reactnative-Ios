import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';

class profile extends React.Component {

  state = { user: null, userInfo: '', email: '', password: '', errorMessage: null };

  componentDidMount() {

    GoogleSignin.configure({
      //It is mandatory to call this method before attempting to call signIn()
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId generated from Firebase console
      webClientId: '86734367320-b8arsdhcurk3erfkdh1h2jrtm0pplbhv.apps.googleusercontent.com',
    });
  }

  _signIn = async () => {
    //Prompts a modal to let the user sign in into your application.
    try {
      await GoogleSignin.hasPlayServices({
        //Check if device has Google Play Services installed.
        //Always resolves to true on iOS.
        showPlayServicesUpdateDialog: true,
      });
      const userInfo = await GoogleSignin.signIn();
      console.log('User Info --> ', userInfo);
      this.setState({ user: userInfo.user });
    } catch (error) {
      console.log('Message', error.message);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.warn('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.warn('Signing In');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.warn('Play Services Not Available or Outdated');
      } else {
        console.warn('Some Other Error Happened');
      }
    }
  };
  _getCurrentUser = async () => {
    //May be called eg. in the componentDidMount of your main component.
    //This method returns the current user
    //if they already signed in and null otherwise.
    try {
      const userInfo = await GoogleSignin.signInSilently();
      this.setState({ userInfo });
    } catch (error) {
      console.error(error);
    }
  };
  _signOut = async () => {
    //Remove user session from the device.
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null }); // Remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };
  _revokeAccess = async () => {
    //Remove your application from the user authorized applications.
    try {
      await GoogleSignin.revokeAccess();
      console.log('deleted');
    } catch (error) {
      console.error(error);
    }
  };


  render() {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Profile</Text>
        <GoogleSigninButton
          style={{ width: 192, height: 40, top: -3 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.state.user == null ? this._signIn : this._signOut}
          disabled={this.state.isSigninInProgress}
        />
      </View>

    );
  }
}

export default profile;