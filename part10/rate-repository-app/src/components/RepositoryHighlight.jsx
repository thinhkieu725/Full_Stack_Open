import { View, StyleSheet, Image } from 'react-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
  },
  innerContainer: {
    flexDirection: 'column',
    padding: 10,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 5,
    margin: 10,
  },
  languageText: {
    backgroundColor: theme.colors.primary,
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    flexGrow: 0, 
    flexShrink: 0,
    alignSelf: 'flex-start'
  }
});

const RepositoryHighlight = ({ repository }) => {
  return (
    <View style={styles.outerContainer}>
      <Image
        style={styles.image}
        source={{ uri: repository.ownerAvatarUrl }}
      />
      <View style={styles.innerContainer}>
        <Text fontWeight={'bold'} fontSize={'heading'}>{repository.fullName}</Text>
        <View style={{ height: 5 }} />
        <Text fontSize={'subheading'}>{repository.description}</Text>
        <View style={{ height: 5 }} />
        <Text fontSize={'subheading'} style={styles.languageText}>{repository.language}</Text>
      </View>
    </View>
  )
};

export default RepositoryHighlight;