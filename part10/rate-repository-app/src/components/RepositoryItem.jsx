import { View, Text, StyleSheet } from 'react-native';

import RepositoryHighlight from './RepositoryHighlight';
import RepositoryStats from './RepositoryStats';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  }
});

const RepositoryItem = ({ repository }) => {
  return (
    <View style={styles.container}>
      <RepositoryHighlight repository={repository} />
      <RepositoryStats repository={repository} />
    </View>
  )
}

export default RepositoryItem;