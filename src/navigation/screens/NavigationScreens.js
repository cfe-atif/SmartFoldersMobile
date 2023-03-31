import ChangePassword from '../../screens/authentication/ChangePassword';
import ForgotPassword from '../../screens/authentication/ForgotPassword';
import Login from '../../screens/authentication/Login';
import SelectDatabase from '../../screens/database/SelectDatabase';
import Chats from '../../screens/TabBar/chat/Chats';
import Messages from '../../screens/TabBar/chat/Messages';
import AddOrUpdateGroup from '../../screens/TabBar/chat/AddOrUpdateGroup';
import AllGroups from '../../screens/TabBar/chat/AllGroups';
import AllUsers from '../../screens/TabBar/chat/AllUsers';
import Home from '../../screens/TabBar/home/Home';
import Settings from '../../screens/TabBar/settings/Settings';
import AddOrUpdateReminder from '../../screens/TabBar/reminders/AddOrUpdateReminder';
import Reminders from '../../screens/TabBar/reminders/Reminders';
import BottomNavigation from '../bottomTabNavigation/BottomNavigation';
import AddDocument from '../../screens/TabBar/home/components/AddDocument';
import AddFolder from '../../screens/TabBar/home/components/AddFolder';
import RecentSearches from '../../screens/TabBar/home/components/RecentSearches';
import DocumentDetails from '../../screens/TabBar/home/components/DocumentDetails';

const headerOptions = {
  headerShown: false,
};

const NavigationScreens = {
  ChangePassword: {
    screen: ChangePassword,
    options: headerOptions,
  },
  ForgotPassword: {
    screen: ForgotPassword,
    options: headerOptions,
  },
  Login: {
    screen: Login,
    options: headerOptions,
  },
  SelectDatabase: {
    screen: SelectDatabase,
    options: headerOptions,
  },
  Chats: {
    screen: Chats,
    options: headerOptions,
  },
  Messages: {
    screen: Messages,
    options: headerOptions,
  },
  AddOrUpdateGroup: {
    screen: AddOrUpdateGroup,
    options: headerOptions,
  },
  AllGroups: {
    screen: AllGroups,
    options: headerOptions,
  },
  AllUsers: {
    screen: AllUsers,
    options: headerOptions,
  },
  Home: {
    screen: Home,
    options: headerOptions,
  },
  Settings: {
    screen: Settings,
    options: headerOptions,
  },
  AddOrUpdateReminder: {
    screen: AddOrUpdateReminder,
    options: headerOptions,
  },
  Reminders: {
    screen: Reminders,
    options: headerOptions,
  },
  AddDocument: {
    screen: AddDocument,
    options: headerOptions,
  },
  AddFolder: {
    screen: AddFolder,
    options: headerOptions,
  },
  RecentSearches: {
    screen: RecentSearches,
    options: headerOptions,
  },
  DocumentDetails: {
    screen: DocumentDetails,
    options: headerOptions,
  },
  BottomNavigation: {
    screen: BottomNavigation,
    options: headerOptions,
  },
};

export default NavigationScreens;
