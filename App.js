import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import StackNavigator from './src/navigation/StackNavigator';
import { AuthProvider } from './src/context/authContext';
export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator/>
      </AuthProvider>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({

});
