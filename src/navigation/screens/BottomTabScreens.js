import Chats from '../../screens/TabBar/chat/Chats';
import Home from '../../screens/TabBar/home/Home';
import Settings from '../../screens/TabBar/settings/Settings';
import Reminders from '../../screens/TabBar/reminders/Reminders';

const headerOptions = {
  headerShown: false,
};

const BottomTabScreens = {
  Home: {
    screen: Home,
    options: headerOptions,
  },
  Reminders: {
    screen: Reminders,
    options: headerOptions,
  },
  Settings: {
    screen: Settings,
    options: headerOptions,
  },
  Chats: {
    screen: Chats,
    options: headerOptions,
  },
};

export default BottomTabScreens;
