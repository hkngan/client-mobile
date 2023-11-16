import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import StackNavigator from './src/navigation/StackNavigator';
import { AuthProvider } from './src/context/authContext';
import { BookingProvider } from './src/context/bookingContext';
import {StripeProvider} from '@stripe/stripe-react-native'
import config from './config';
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <BookingProvider>
          <StripeProvider publishableKey={config.extra.STRIPE_API_KEY}>
            <StackNavigator/>
          </StripeProvider>
        </BookingProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
