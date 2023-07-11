import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {get} from 'lodash';
import AppColors from '../../../../../../../helpers/AppColors';
import AppFontSize from '../../../../../../../helpers/AppFontSize';
import AppFontFamily from '../../../../../../../helpers/AppFontFamily';
import Separator from '../../../../../../../components/seperator/Separator';
import SFNoRecord from '../../../../../../../components/texts/SFNoRecord';

export default function Security({viewPropertiesData}) {
  const caveatList = Array.isArray(
    get(viewPropertiesData, 'Document.Security.Caveat', []),
  )
    ? get(viewPropertiesData, 'Document.Security.Caveat', [])
    : [get(viewPropertiesData, 'Document.Security.Caveat', null)];

  const codewordList = Array.isArray(
    get(viewPropertiesData, 'Document.Security.Codeword', []),
  )
    ? get(viewPropertiesData, 'Document.Security.Codeword', [])
    : [get(viewPropertiesData, 'Document.Security.Codeword', null)];

  const IDOList = Array.isArray(
    get(viewPropertiesData, 'Document.Security.IDO', []),
  )
    ? get(viewPropertiesData, 'Document.Security.IDO', [])
    : [get(viewPropertiesData, 'Document.Security.IDO', null)];

  const descriptorList = Array.isArray(
    get(viewPropertiesData, 'Document.Security.Descriptor', []),
  )
    ? get(viewPropertiesData, 'Document.Security.Descriptor', [])
    : [get(viewPropertiesData, 'Document.Security.Descriptor', null)];

  const authorGroups = Array.isArray(
    get(
      viewPropertiesData,
      'Document.Security.BusinessGroupList.BusinessGroup',
      [],
    ),
  )
    ? get(
        viewPropertiesData,
        'Document.Security.BusinessGroupList.BusinessGroup',
        [],
      )
    : [
        get(
          viewPropertiesData,
          'Document.Security.BusinessGroupList.BusinessGroup',
          null,
        ),
      ];

  const viewerGroups = Array.isArray(
    get(
      viewPropertiesData,
      'Document.Security.BusinessGroupViewersList.BusinessGroupViewers',
      [],
    ),
  )
    ? get(
        viewPropertiesData,
        'Document.Security.BusinessGroupViewersList.BusinessGroupViewers',
        [],
      )
    : [
        get(
          viewPropertiesData,
          'Document.Security.BusinessGroupViewersList.BusinessGroupViewers',

          null,
        ),
      ];

  const authorUsers = Array.isArray(
    get(viewPropertiesData, 'Document.Security.OwnerGroupList.OwnerGroup', []),
  )
    ? get(viewPropertiesData, 'Document.Security.OwnerGroupList.OwnerGroup', [])
    : [
        get(
          viewPropertiesData,
          'Document.Security.OwnerGroupList.OwnerGroup',
          null,
        ),
      ];

  const viewerUsers = Array.isArray(
    get(
      viewPropertiesData,
      'Document.Security.OwnerGroupViewersList.OwnerGroupViewers',
      [],
    ),
  )
    ? get(
        viewPropertiesData,
        'Document.Security.OwnerGroupViewersList.OwnerGroupViewers',
        [],
      )
    : [
        get(
          viewPropertiesData,
          'Document.Security.OwnerGroupViewersList.OwnerGroupViewers',
          null,
        ),
      ];

  const exclusionGroups = Array.isArray(
    get(
      viewPropertiesData,
      'Document.Security.ExclusionGroupList.ExclusionGroup',
      [],
    ),
  )
    ? get(
        viewPropertiesData,
        'Document.Security.ExclusionGroupList.ExclusionGroup',
        [],
      )
    : [
        get(
          viewPropertiesData,
          'Document.Security.ExclusionGroupList.ExclusionGroup',
          null,
        ),
      ];

  return (
    <View style={styles.container}>
      <View style={styles.intContainer}>
        <Text style={styles.title}>Category:</Text>
        <Text style={styles.desc}>
          {get(viewPropertiesData, 'Document.Security.Category.Name', 'N/A')}
        </Text>
      </View>
      <Separator />
      {caveatList.length > 0 && (
        <>
          <View style={styles.intContainer}>
            <Text style={styles.title}>Caveat:</Text>
          </View>
          {caveatList.map((caveat, index, ...row) => {
            let getLength = row[0].length;
            return (
              <View style={styles.intChildContainer}>
                <Text style={styles.desc}>
                  {caveat}
                  {getLength === index + 1 ? null : ', '}
                </Text>
              </View>
            );
          })}
          <Separator />
        </>
      )}
      {codewordList.length > 0 && (
        <>
          <View style={styles.intContainer}>
            <Text style={styles.title}>Codeword:</Text>
          </View>
          {codewordList.map((codeword, index, ...row) => {
            let getLength = row[0].length;
            return (
              <View style={styles.intChildContainer}>
                <Text style={styles.desc}>
                  {codeword}
                  {getLength === index + 1 ? null : ', '}
                </Text>
              </View>
            );
          })}
          <Separator />
        </>
      )}
      {IDOList.length > 0 && (
        <>
          <View style={styles.intContainer}>
            <Text style={styles.title}>IDO:</Text>
          </View>
          {IDOList.map((IDO, index, ...row) => {
            let getLength = row[0].length;
            return (
              <View style={styles.intChildContainer}>
                <Text style={styles.desc}>
                  {IDO}
                  {getLength === index + 1 ? null : ', '}
                </Text>
              </View>
            );
          })}
          <Separator />
        </>
      )}
      {descriptorList.length > 0 && (
        <>
          <View style={styles.intContainer}>
            <Text style={styles.title}>Descriptor:</Text>
          </View>
          {descriptorList.map((descriptor, index, ...row) => {
            let getLength = row[0].length;
            return (
              <View style={styles.intChildContainer}>
                <Text style={styles.desc}>
                  {descriptor}
                  {getLength === index + 1 ? null : ', '}
                </Text>
              </View>
            );
          })}
          <Separator />
        </>
      )}
      {authorGroups.length > 0 && (
        <>
          <View style={styles.intContainer}>
            <Text style={styles.title}>Author Groups:</Text>
          </View>
          {authorGroups.map((author, index, ...row) => {
            let getLength = row[0].length;
            return (
              <View style={styles.intChildContainer}>
                <Text style={styles.desc}>
                  {get(author, 'Name', 'N/A')}
                  {getLength === index + 1 ? null : ', '}
                </Text>
              </View>
            );
          })}
          <Separator />
        </>
      )}
      {viewerGroups.length > 0 && (
        <>
          <View style={styles.intContainer}>
            <Text style={styles.title}>Viewer Groups:</Text>
          </View>
          {viewerGroups.map((viewerGroup, index, ...row) => {
            let getLength = row[0].length;
            return (
              <View style={styles.intChildContainer}>
                <Text style={styles.desc}>
                  {get(viewerGroup, 'Name', 'N/A')}
                  {getLength === index + 1 ? null : ', '}
                </Text>
              </View>
            );
          })}
          <Separator />
        </>
      )}
      {authorUsers.length > 0 && (
        <>
          <View style={styles.intContainer}>
            <Text style={styles.title}>Author Users:</Text>
          </View>
          {authorUsers.map((authorUser, index, ...row) => {
            let getLength = row[0].length;
            return (
              <View style={styles.intChildContainer}>
                <Text style={styles.desc}>
                  {get(authorUser, 'User.FullName', 'N/A')}
                  {getLength === index + 1 ? null : ', '}
                </Text>
              </View>
            );
          })}
          <Separator />
        </>
      )}
      {viewerUsers.length > 0 && (
        <>
          <View style={styles.intContainer}>
            <Text style={styles.title}>Viewer Users:</Text>
          </View>
          {viewerUsers.map((viewerUser, index, ...row) => {
            let getLength = row[0].length;
            return (
              <View style={styles.intChildContainer}>
                <Text style={styles.desc}>
                  {get(viewerUser, 'User.FullName', 'N/A')}
                  {getLength === index + 1 ? null : ', '}
                </Text>
              </View>
            );
          })}
          <Separator />
        </>
      )}
      {exclusionGroups.length > 0 && (
        <>
          <View style={styles.intContainer}>
            <Text style={styles.title}>Exclusion Groups:</Text>
          </View>
          {exclusionGroups.map((exclusionGroup, index, ...row) => {
            let getLength = row[0].length;
            return (
              <View style={styles.intChildContainer}>
                <Text style={styles.desc}>
                  {get(exclusionGroup, 'User.FullName', 'N/A')}
                  {getLength === index + 1 ? null : ', '}
                </Text>
              </View>
            );
          })}
          <Separator />
        </>
      )}
      {get(viewPropertiesData, 'Document.Security.ReasonForSecurity', null) && (
        <>
          <View style={styles.intContainer}>
            <Text style={styles.title}>Reason For Security:</Text>
            <Text style={styles.desc}>
              {get(
                viewPropertiesData,
                'Document.Security.ReasonForSecurity',
                '',
              )}
            </Text>
          </View>
          <Separator />
        </>
      )}
      <View style={styles.intContainer}>
        <SFNoRecord title="Note" containerStyle={styles.note} />
        <SFNoRecord
          title="Please visit website to edit security"
          textStyle={styles.desc}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  intContainer: {
    margin: 5,
  },
  intChildContainer: {
    marginHorizontal: 5,
  },
  title: {
    marginHorizontal: 10,
    color: AppColors.black,
    fontSize: AppFontSize.size14,
    fontFamily: AppFontFamily.semiBold,
  },
  desc: {
    marginHorizontal: 10,
    color: AppColors.gray,
    fontSize: AppFontSize.size14,
    fontFamily: AppFontFamily.semiBold,
  },
  note: {
    margin: 0,
  },
});
