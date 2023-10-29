import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import StackNavigator from './src/navigation/StackNavigator';
import { AuthProvider } from './src/context/authContext';
import { BookingProvider } from './src/context/bookingContext';
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <BookingProvider>
          <StackNavigator/>
        </BookingProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
