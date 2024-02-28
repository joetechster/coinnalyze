import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Favourites from './Favourites';
import Featured from './Featured';

const Tab = createMaterialTopTabNavigator();

export default function CoinsSection() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Favourites" component={Favourites} />
      <Tab.Screen name="Featured" component={Featured} />
    </Tab.Navigator>
  );
}
