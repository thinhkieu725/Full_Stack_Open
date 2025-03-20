import { Pressable, Text } from 'react-native';
import { Link } from 'react-router-native';

const AppBarTab = ({ style, link, text }) => {
  return (
    <Link to={link}>
      <Text style={style}>{text}</Text>
    </Link>
  );
}

export default AppBarTab;