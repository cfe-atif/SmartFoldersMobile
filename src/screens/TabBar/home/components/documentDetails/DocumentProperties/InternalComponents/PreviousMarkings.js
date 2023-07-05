import React from 'react';
import {StyleSheet, View} from 'react-native';
import {get} from 'lodash';
import MarkingCell from '../../../../../../../components/cells/MarkingCell';

export default function PreviousMarkings({viewPropertiesData}) {
  const MarkingsArray = Array.isArray(
    get(viewPropertiesData, 'Document.Security.Previous_Markings.Marking', []),
  )
    ? get(viewPropertiesData, 'Document.Security.Previous_Markings.Marking', [])
    : [
        get(
          viewPropertiesData,
          'Document.Security.Previous_Markings.Marking',
          [],
        ),
      ];

  return (
    <View style={styles.container}>
      {MarkingsArray.map((marking, index) => {
        return <MarkingCell Marking={marking} key={index} />;
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});
