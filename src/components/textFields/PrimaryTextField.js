// Option 1

// import React from 'react';
// import {StyleSheet, View, Text, TextInput} from 'react-native';
// import AppColors from '../../helpers/AppColors';
// import AppFontSize from '../../helpers/AppFontSize';

// export default function PrimaryTextField({
//   value = '',
//   placeholder = 'Type here...',
//   onChange = () => {},
// }) {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.placeholder} numberOfLines={2}>
//         {placeholder}
//       </Text>
//       <TextInput
//         style={styles.textField}
//         value={value}
//         onChangeText={onChange}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     margin: 10,
//   },
//   placeholder: {
//     textAlign: 'left',
//     fontFamily: AppFontFamily.bold,
//     color: AppColors.gray,
//     marginBottom: 5,
//     fontSize: AppFontSize.size14,
//   },
//   textField: {
//     height: 50,
//     paddingHorizontal: 10,
//     borderRadius: 10,
//     borderWidth: 1.5,
//     justifyContent: 'center',
//     alignItems: 'center',
//     fontFamily: AppFontFamily.bold,
//     backgroundColor: AppColors.white,
//     borderColor: AppColors.gray,
//     color: AppColors.gray,
//     fontSize: AppFontSize.size16,
//   },
// });

// Option 2

import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';
import AppColors from '../../helpers/AppColors';
import AppFontSize from '../../helpers/AppFontSize';
import AppFontFamily from '../../helpers/AppFontFamily';

export default function PrimaryTextField({
  value = '',
  placeholder = 'Type here...',
  onChange = () => {},
  isSecure = false,
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.placeholder} numberOfLines={2}>
        {placeholder}
      </Text>
      <TextInput
        style={styles.textField}
        value={value}
        onChangeText={onChange}
        secureTextEntry={isSecure}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: AppColors.white,
    borderColor: AppColors.gray,
    borderWidth: 1.5,
  },
  placeholder: {
    flex: 1,
    textAlign: 'center',
    fontFamily: AppFontFamily.bold,
    color: AppColors.gray,
  },
  textField: {
    height: 50,
    flex: 2,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1.5,
    borderLeftColor: AppColors.lightGray,
    fontFamily: AppFontFamily.bold,
    color: AppColors.gray,
    fontSize: AppFontSize.size16,
  },
});

// Option 3

// import React from 'react';
// import {StyleSheet, TextInput} from 'react-native';
// import AppColors from '../../helpers/AppColors';
// import AppFontSize from '../../helpers/AppFontSize';

// export default function PrimaryTextField({
//   value = '',
//   placeholder = 'Type here...',
//   onChange = () => {},
// }) {
//   return (
//     <TextInput
//       style={styles.textField}
//       value={value}
//       onChangeText={onChange}
//       placeholder={placeholder}
//       placeholderTextColor={AppColors.lightGray}
//     />
//   );
// }

// const styles = StyleSheet.create({
//   textField: {
//     height: 50,
//     margin: 10,
//     borderRadius: 10,
//     borderWidth: 1.5,
//     paddingHorizontal: 10,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: AppColors.white,
//     borderColor: AppColors.customBlue,
//     fontFamily: AppFontFamily.bold,
//     color: AppColors.gray,
//     fontSize: AppFontSize.size16,
//   },
// });
