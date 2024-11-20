import {DrawerNavigationProp} from '@react-navigation/drawer';
import {Text} from '@rneui/base';

function HeaderRight(navigation?: DrawerNavigationProp<any>, name?: string) {
  return (
    <Text
      onPress={() => navigation?.navigate(name ?? '')}
      style={{marginRight: 15}}>
      {'='}
    </Text>
  );
}

export default HeaderRight;
