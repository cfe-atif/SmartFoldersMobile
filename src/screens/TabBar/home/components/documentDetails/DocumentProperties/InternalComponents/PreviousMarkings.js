import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {get} from 'lodash';
import Separator from '../../../../../../../components/seperator/Separator';

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

  const ownerGroup = Owner_Group => {
    let storeString = '';
    for (let i = 0; i < Owner_Group.length; i++) {
      storeString += `${Owner_Group[i].No}-${Owner_Group[i].Name}, `;
    }

    return <Text>Author Users: {storeString}</Text>;
  };

  const createMaking = Marking => {
    if (Marking.Category || Marking.Category === 0) {
      return (
        <View style={styles.cellContainer}>
          <Text>Category: {Marking.Category}</Text>
          <Text>
            Changed by: {Marking.SecurityAmendor.User}-
            {Marking.SecurityAmendor.FullName}
          </Text>
          <Text>Date: {Marking.Changed_Date}</Text>
          <Separator addStyles={styles.separator} />
        </View>
      );
    } else if (Marking.Caveat) {
      return (
        <View style={styles.cellContainer}>
          <Text>Caveat: {Marking.Caveat}</Text>
          <Text>
            Changed by: {Marking.SecurityAmendor.User}-
            {Marking.SecurityAmendor.FullName}
          </Text>
          <Text>Date: {Marking.Changed_Date}</Text>
          <Separator addStyles={styles.separator} />
        </View>
      );
    } else if (Marking.IDO) {
      return (
        <View style={styles.cellContainer}>
          <Text>IDO: {Marking.IDO}</Text>
          <Text>
            Changed by: {Marking.SecurityAmendor.User}-
            {Marking.SecurityAmendor.FullName}
          </Text>
          <Text>Date: {Marking.Changed_Date}</Text>
          <Separator addStyles={styles.separator} />
        </View>
      );
    } else if (Marking.Descriptor) {
      return (
        <View style={styles.cellContainer}>
          <Text>Descriptor: {Marking.Descriptor}</Text>
          <Text>
            Changed by: {Marking.SecurityAmendor.User}-
            {Marking.SecurityAmendor.FullName}
          </Text>
          <Text>Date: {Marking.Changed_Date}</Text>
          <Separator addStyles={styles.separator} />
        </View>
      );
    } else if (Marking.Owner || Marking.Owner === 0) {
      return (
        <View style={styles.cellContainer}>
          <Text>Document Owner: {Marking.Owner}</Text>
          <Text>
            Changed by: {Marking.SecurityAmendor.User}-
            {Marking.SecurityAmendor.FullName}
          </Text>
          <Text>Date: {Marking.Changed_Date}</Text>
          <Separator addStyles={styles.separator} />
        </View>
      );
    } else if (Marking.Codeword) {
      return (
        <View style={styles.cellContainer}>
          <Text>Codeword: {Marking.Codeword}</Text>
          <Text>
            Changed by: {Marking.SecurityAmendor.User}-
            {Marking.SecurityAmendor.FullName}
          </Text>
          <Text>Date: {Marking.Changed_Date}</Text>
          <Separator addStyles={styles.separator} />
        </View>
      );
    } else if (Marking.Business_GroupList) {
      return (
        <View style={styles.cellContainer}>
          <Text>
            Author Groups: {Marking.Business_GroupList.Business_Group.No} -{' '}
            {Marking.Business_GroupList.Business_Group.Name}
          </Text>
          <Text>
            Changed by: {Marking.SecurityAmendor.User}-
            {Marking.SecurityAmendor.FullName}
          </Text>
          <Text>Date: {Marking.Changed_Date}</Text>
          <Separator addStyles={styles.separator} />
        </View>
      );
    } else if (Marking.Business_Group_ViewersList) {
      return (
        <View style={styles.cellContainer}>
          <Text>
            Viewer Groups:{' '}
            {Marking.Business_Group_ViewersList.Business_Group_Viewers.No} -{' '}
            {Marking.Business_Group_ViewersList.Business_Group_Viewers.Name}
          </Text>
          <Text>
            Changed by: {Marking.SecurityAmendor.User}-
            {Marking.SecurityAmendor.FullName}
          </Text>
          <Text>Date: {Marking.Changed_Date}</Text>
          <Separator addStyles={styles.separator} />
        </View>
      );
    } else if (Marking.Owner_GroupList) {
      return Array.isArray(Marking.Owner_GroupList.Owner_Group) ? (
        <View style={styles.cellContainer}>
          {ownerGroup(Marking.Owner_GroupList.Owner_Group)}
          <Text>
            Changed by: {Marking.SecurityAmendor.User}-
            {Marking.SecurityAmendor.FullName}
          </Text>
          <Text>Date: {Marking.Changed_Date}</Text>
          <Separator addStyles={styles.separator} />
        </View>
      ) : (
        <View style={styles.cellContainer}>
          <Text>
            Author Users: {Marking.Owner_GroupList.Owner_Group.No} -{' '}
            {Marking.Owner_GroupList.Owner_Group.Name}
          </Text>
          <Text>
            Changed by: {Marking.SecurityAmendor.User}-
            {Marking.SecurityAmendor.FullName}
          </Text>
          <Text>Date: {Marking.Changed_Date}</Text>
          <Separator addStyles={styles.separator} />
        </View>
      );
    } else if (Marking.Owner_Group_ViewersList) {
      return (
        <View style={styles.cellContainer}>
          <Text>
            Category: {Marking.Owner_Group_ViewersList.Owner_Group_Viewers.No} -{' '}
            {Marking.Owner_Group_ViewersList.Owner_Group_Viewers.Name}
          </Text>
          <Text>
            Changed by: {Marking.SecurityAmendor.User}-
            {Marking.SecurityAmendor.FullName}
          </Text>
          <Text>Date: {Marking.Changed_Date}</Text>
          <Separator addStyles={styles.separator} />
        </View>
      );
    } else if (Marking.Exclusion_GroupList) {
      return (
        <View style={styles.cellContainer}>
          <Text>
            Category: {Marking.Exclusion_GroupList.Exclusion_Group.No} -{' '}
            {Marking.Exclusion_GroupList.Exclusion_Group.Name}
          </Text>
          <Text>
            Changed by: {Marking.SecurityAmendor.User}-
            {Marking.SecurityAmendor.FullName}
          </Text>
          <Text>Date: {Marking.Changed_Date}</Text>
          <Separator addStyles={styles.separator} />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      {MarkingsArray.map(marking => {
        return createMaking(marking);
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  cellContainer: {
    marginHorizontal: 10,
  },
});
