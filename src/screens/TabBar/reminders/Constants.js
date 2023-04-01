export const reminderFilterOptions = ["Active", "Completed"];
export const reminderSortOptions = ["Date", "A to Z", "Z to A"];
export const dateFormat = "DD-MMM-YYYY hh:mm A";
export const reminderStateOptions = ["Open", "Complete"];

export const reminderActions = {
  list: "LIST",
  upcoming: "LIST_DUE",
  add: "ADD",
  delete: "DELETE",
  setState: "SET_STATE",
  update: "UPDATE",
};

export const reminderStates = {
  snooze: "SNOOZE",
  dismiss: "DISMISS",
  completed: "COMPLETE",
  open: "OPEN",
};

export const reminderPeriods = {
  all: "ALL",
  today: "TODAY",
  inthisWeek: "IN_THIS_WEEK",
  inthisMonth: "IN_THIS_MONTH",
};

export const filterOptions = [
  {
    title: "All",
    query: "ALL",
  },
  {
    title: "Today",
    query: "TODAY",
  },
  {
    title: "Within 1 Week",
    query: "IN_THIS_WEEK",
  },
  {
    title: "Within 1 Month",
    query: "IN_THIS_MONTH",
  },
];

export const remindersList = [
  {
    Details: "Test for reminder without doc",
    AlertDate: "",
    State: "DISMISS",
    ID: 2,
    DueDate: "2023-01-27 07:17:31.0",
    Subject: "Reminder 2 DISMISS",
  },
  {
    Details: "Test for reminder without doc",
    AlertDate: "2023-01-27 07:17:31.0",
    State: "OPEN",
    ID: 4,
    DueDate: "2023-01-27 07:17:31.0",
    Subject: "Reminder 2 OPEN",
  },
  {
    Details: "OPEN Test for reminder without doc",
    AlertDate: "2023-01-27 07:17:31.0",
    State: "OPEN",
    ID: 6,
    DueDate: "2023-01-27 07:17:31.0",
    Subject: "Reminder 2 OPEN",
  },
];

export const filterTypes = {
  completed: "Completed",
  active: "Active",
};

export const sortTypes = {
  aToZ: "A to Z",
  zToA: "Z to A",
  byDate: "Date",
};
