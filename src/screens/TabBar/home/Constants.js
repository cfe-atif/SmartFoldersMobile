export const menuTypes = {
  addDocument: 'Add Document',
  addFolder: 'Add Folder',
  refresh: 'Refresh',
  addReminder: 'Add Reminder',
  email: 'Email',
  recentSearch: 'Recent Search',
  pdf: 'PDF',
  reminders: 'Reminders',
};

export const foldersTypes = {
  public: 'Public',
  // private: 'Private',
};

export const documentTypes = {
  General: 'General',
  Correspondence: 'Correspondence',
  Emails: 'Email(s)',
  Applications: 'Applications',
  Pictures: 'Pictures',
  Notifications: 'Notifications',
};

export const viewPropertiesData = {
  User: 10,
  Document: {
    UserEdit: {
      DeleteDocument: true,
      EditMetadata: true,
      DeclareDocument: true,
      EditSecurity: true,
      EditAccess: true,
    },
    BundleList: {
      Bundle: {
        BundleListPath: '/1/15/',
        BundleListName: '/Departments/Accounts',
        HasHistory: false,
      },
    },
    Bundle: 'G/1/15/',
    Title: 'ABC Organization - Accounts details',
    FreedomOfInformation: 'None',
    Amendor: 'System Administrator',
    WorkflowHistory: '',
    Creator: 'System Administrator',
    Security: {
      Previous_Markings: {
        Marking: {
          Category: 0,
          Changed_Date: '2022/07/14 07:32:35',
          SecurityAmendor: {
            User: 10,
            FullName: 'System Administrator',
          },
        },
      },
      Category: {
        No: 0,
        OwnerType: '',
        Name: 'UNCLASSIFIED',
      },
    },
    Declared: false,
    Hit: 82,
    CurrentWorkflowDescription: '',
    Amended_Date: '2022/07/14 07:32:36',
    NoMessage: 'no email message',
    DB: 4,
    DocType: 1,
    Created_Date: '2022/07/14 07:32:35',
  },
};
