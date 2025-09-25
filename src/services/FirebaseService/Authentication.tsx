import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {IProfileDetails} from '@types';
import {Alert} from 'react-native';
import {appleAuthAndroid} from '@invertase/react-native-apple-authentication';
import {v4 as uuid} from 'uuid';
class Authentication {
  emailWithSignIn = (email: string, password: string) => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await auth().signInWithEmailAndPassword(
          email,
          password,
        );

        console.log('sdfsddf', JSON.stringify(response));

        resolve(response);
      } catch (error: any) {
        switch (error.code) {
          case 'auth/password-does':
            this.formatPasswordError(error);
            reject(error);
            break;

          default:
            console.log('Error in emailWithSignIn:', error);

            Alert.alert(
              'Something want to wrong',
              error.message.substring(error.message.indexOf(']') + 1),
            );
            reject(error);
            break;
        }
      }
    });
  };

  emailWithSignUp = (email: string, password: string) => {
    return new Promise<any>(async (resolve, reject) => {
      try {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          password,
        );
        resolve(response);
      } catch (error: any) {
        switch (error.code) {
          case 'auth/password-does':
            this.formatPasswordError(error);
            reject(error);
            break;

          default:
            Alert.alert(
              'Something want to wrong',
              error.message.substring(error.message.indexOf(']') + 1),
            );
            reject(error);
            break;
        }
      }
    });
  };

  sendPasswordLink = async (email: string) => {
    return new Promise<void>(async (resolve, reject) => {
      try {
        await auth().sendPasswordResetEmail(email);

        resolve();
      } catch (error: any) {
        console.log('dsfsdfsdf>>>.', error);
        Alert.alert(
          'Something want to wrong',
          error.message.substring(error.message.indexOf(']') + 1),
        );
        reject();
      }
    });
  };
  formatPasswordError = (errorMessage: any) => {
    let errorString = errorMessage.toString();
    const startIndex = errorString.indexOf('Missing password requirements:');
    const endIndex = errorString.lastIndexOf(']');
    let formattedMessage = '';
    if (startIndex !== -1 && endIndex !== -1) {
      // Extract and clean the requirements section
      const requirementsString = errorString
        .substring(
          startIndex + 'Missing password requirements:'.length,
          endIndex,
        )
        .trim();

      // Split the requirements into an array
      const requirementsArray = requirementsString
        .replace(/\[|\]/g, '') // Remove square brackets
        .split(',') // Split by commas
        .map((req: any) => req.trim()); // Trim each requirement

      // Format the requirements into a user-friendly string
      formattedMessage = requirementsArray
        .map((req: any) => `• ${req}`) // Add bullet points
        .join('\n');
    }

    Alert.alert('', `Password requirements not met:\n${formattedMessage}`);
  };

  googleConfigure = () => {
    GoogleSignin.configure({
      webClientId:
        '256304395743-qgcaf17aggnfkdd8g6pqsulbo51fvcmt.apps.googleusercontent.com',
      scopes: ['profile', 'email'],
    });
  };
}

const FirebaseAuth = new Authentication();

export {FirebaseAuth};
