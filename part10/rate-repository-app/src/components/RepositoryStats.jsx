import { View, StyleSheet } from 'react-native';

import Text from './Text';

const preprocessData = (number) => {
  if (number < 1000) {
    return number;
  } else {
    return (number / 1000).toFixed(1) + 'k';
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  innerContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
});

const RepositoryStats = ({ repository }) => {
  const stars = preprocessData(repository.stargazersCount);
  const forks = preprocessData(repository.forksCount);
  const reviews = preprocessData(repository.reviewCount);
  const rating = preprocessData(repository.ratingAverage);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <Text fontWeight={'bold'}>{stars}</Text>
        <Text>Stars</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text fontWeight={'bold'}>{forks}</Text>
        <Text>Forks</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text fontWeight={'bold'}>{reviews}</Text>
        <Text>Reviews</Text>
      </View>
      <View style={styles.innerContainer}>
        <Text fontWeight={'bold'}>{rating}</Text>
        <Text>Rating</Text>
      </View>
    </View>
  )
}

export default RepositoryStats;