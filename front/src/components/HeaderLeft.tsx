import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Text} from '@rneui/base';

function HeaderLeft(navigation?: DrawerNavigationProp<any>, name?: string) {
  return (
    <Text
      onPress={() => navigation?.navigate(name ?? '')}
      style={{marginLeft: 15}}>
      {'<'}
    </Text>
  );
}

export default HeaderLeft;
