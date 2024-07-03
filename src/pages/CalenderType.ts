type EventCreator = {
  id: string;
  email: string;
  displayName: string;
  self: boolean;
};

type EventDateTime = {
  date?: string; // YYYY-MM-DD形式の文字列
  dateTime?: string; // ISO 8601形式の文字列
  timeZone?: string;
};

type EventAttendee = {
  id: string;
  email: string;
  displayName: string;
  organizer: boolean;
  self: boolean;
  resource: boolean;
  optional: boolean;
  responseStatus: string;
  comment: string;
  additionalGuests: number;
};

type ExtendedProperties = {
  private: Record<string, string>;
  shared: Record<string, string>;
};

type ConferenceSolutionKey = {
  type: string;
};

type ConferenceSolutionStatus = {
  statusCode: string;
};

type ConferenceSolution = {
  key: ConferenceSolutionKey;
  name: string;
  iconUri: string;
};

type ConferenceCreateRequest = {
  requestId: string;
  conferenceSolutionKey: ConferenceSolutionKey;
  status: ConferenceSolutionStatus;
};

type EntryPoint = {
  entryPointType: string;
  uri: string;
  label: string;
  pin: string;
  accessCode: string;
  meetingCode: string;
  passcode: string;
  password: string;
};

type ConferenceData = {
  createRequest: ConferenceCreateRequest;
  entryPoints: EntryPoint[];
  conferenceSolution: ConferenceSolution;
  conferenceId: string;
  signature: string;
  notes: string;
};

type Gadget = {
  type: string;
  title: string;
  link: string;
  iconLink: string;
  width: number;
  height: number;
  display: string;
  preferences: Record<string, string>;
};

type Reminders = {
  useDefault: boolean;
};

type Source = {
  url: string;
  title: string;
};

type WorkingLocationProperties = {
  type: string;
  homeOffice?: any; // 型が不明なため、適宜定義する必要があります
  customLocation?: {
    label: string;
  };
  officeLocation?: {
    buildingId: string;
    floorId: string;
    floorSectionId: string;
    deskId: string;
    label: string;
  };
};

type OutOfOfficeProperties = {
  autoDeclineMode: string;
  declineMessage: string;
};

type FocusTimeProperties = {
  autoDeclineMode: string;
  declineMessage: string;
  chatStatus: string;
};

type EventAttachment = {
  fileUrl: string;
  title: string;
  mimeType: string;
  iconLink: string;
  fileId: string;
};

type CalendarEvent = {
  kind: 'calendar#event';
  etag: string;
  id: string;
  status: string;
  htmlLink: string;
  created: string; // Date型もしくはstring型として扱うことができます
  updated: string; // Date型もしくはstring型として扱うことができます
  summary: string;
  description: string;
  location: string;
  colorId: string;
  creator: EventCreator;
  organizer: EventCreator;
  start: EventDateTime;
  end: EventDateTime;
  endTimeUnspecified: boolean;
  recurrence: string[];
  recurringEventId: string;
  originalStartTime: EventDateTime;
  transparency: string;
  visibility: string;
  iCalUID: string;
  sequence: number;
  attendees: EventAttendee[];
  attendeesOmitted: boolean;
  extendedProperties: ExtendedProperties;
  hangoutLink: string;
  conferenceData: ConferenceData;
  gadget: Gadget;
  anyoneCanAddSelf: boolean;
  guestsCanInviteOthers: boolean;
  guestsCanModify: boolean;
  guestsCanSeeOtherGuests: boolean;
  privateCopy: boolean;
  locked: boolean;
  reminders: Reminders;
  source: Source;
  workingLocationProperties: WorkingLocationProperties;
  outOfOfficeProperties: OutOfOfficeProperties;
  focusTimeProperties: FocusTimeProperties;
  attachments: EventAttachment[];
  eventType: string;
};

export type CalendarEvents = {
  kind: 'calendar#events';
  etag: string;
  summary: string;
  description: string;
  updated: string; // Date型もしくはstring型として扱うことができます
  timeZone: string;
  accessRole: string;
  nextPageToken?: string;
  nextSyncToken?: string;
  items: CalendarEvent[];
};
