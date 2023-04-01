import Toast from 'react-native-toast-message';

export default function SFToast({type = 'info', title = '', description = ''}) {
  return Toast.show({
    type: type,
    position: 'top',
    text1: title,
    text2: description,
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 50,
  });
}
