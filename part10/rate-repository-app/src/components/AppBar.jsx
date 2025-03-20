import { View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';
import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.appBar,
  },
  scrollView: {
    flexDirection: 'row',
  },
  tabText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    padding: 20,
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} style={styles.scrollView}>
        <AppBarTab 
          style={styles.tabText}
          link='/'
          text='Repositories'
        />
        <AppBarTab 
          style={styles.tabText}
          link='/signin'
          text='Sign In'
        />
      </ScrollView>
    </View>
  );
};

export default AppBar;