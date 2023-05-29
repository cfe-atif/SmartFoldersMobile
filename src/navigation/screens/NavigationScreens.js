import ChangePassword from '../../screens/authentication/ChangePassword';
import ForgotPassword from '../../screens/authentication/ForgotPassword';
import Login from '../../screens/authentication/Login';
import SelectDatabase from '../../screens/database/SelectDatabase';
import Chats from '../../screens/TabBar/chat/Chats';
import Messages from '../../screens/TabBar/chat/components/Messages';
import AddOrUpdateGroup from '../../screens/TabBar/chat/components/AddOrUpdateGroup';
import AllGroups from '../../screens/TabBar/chat/components/AllGroups';
import AllUsers from '../../screens/TabBar/chat/components/AllUsers';
import Home from '../../screens/TabBar/home/Home';
import Settings from '../../screens/TabBar/settings/Settings';
import AddOrUpdateReminder from '../../screens/TabBar/reminders/components/AddOrUpdateReminder';
import Reminders from '../../screens/TabBar/reminders/Reminders';
import BottomNavigation from '../bottomTabNavigation/BottomNavigation';
import AddDocument from '../../screens/TabBar/home/components/AddDocument';
import AddFolder from '../../screens/TabBar/home/components/AddFolder';
import RecentSearches from '../../screens/TabBar/home/components/RecentSearches';
import DocumentDetails from '../../screens/TabBar/home/components/DocumentDetails';
import ReminderDetails from '../../screens/TabBar/reminders/components/ReminderDetails';
import AddUserToGroup from '../../screens/TabBar/chat/components/AddUserToGroup';
import DocumentsList from '../../screens/TabBar/home/components/DocumentsList';
import CheckoutDocument from '../../screens/TabBar/home/components/documentDetails/CheckoutDocument';
import DocumentIndex from '../../screens/TabBar/home/components/documentDetails/DocumentIndex';
import DocumentProperties from '../../screens/TabBar/home/components/documentDetails/DocumentProperties';
import DocumentVersionInfo from '../../screens/TabBar/home/components/documentDetails/DocumentVersionInfo';
import EditDocument from '../../screens/TabBar/home/components/documentDetails/EditDocument';
import SignDocument from '../../screens/TabBar/home/components/documentDetails/SignDocument';

const headerOptions = {
  headerShown: false,
};

const NavigationScreens = {
  Login: {
    screen: Login,
    options: headerOptions,
  },
  SelectDatabase: {
    screen: SelectDatabase,
    options: headerOptions,
  },
  ChangePassword: {
    screen: ChangePassword,
    options: headerOptions,
  },
  ForgotPassword: {
    screen: ForgotPassword,
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
  DocumentsList: {
    screen: DocumentsList,
    options: headerOptions,
  },
  ReminderDetails: {
    screen: ReminderDetails,
    options: headerOptions,
  },
  AddUserToGroup: {
    screen: AddUserToGroup,
    options: headerOptions,
  },
  CheckoutDocument: {
    screen: CheckoutDocument,
    options: headerOptions,
  },
  DocumentIndex: {
    screen: DocumentIndex,
    options: headerOptions,
  },
  DocumentProperties: {
    screen: DocumentProperties,
    options: headerOptions,
  },
  DocumentVersionInfo: {
    screen: DocumentVersionInfo,
    options: headerOptions,
  },
  EditDocument: {
    screen: EditDocument,
    options: headerOptions,
  },
  SignDocument: {
    screen: SignDocument,
    options: headerOptions,
  },
  BottomNavigation: {
    screen: BottomNavigation,
    options: headerOptions,
  },
};

export default NavigationScreens;
