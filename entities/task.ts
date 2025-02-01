export type TTaskStatuses = {
  ANALYSIS: "Analysis";
  IN_PROGRESS: "In progress";
  DONE: "Done";
  CANCELED: "Canceled";
  DEFFERED: "Deffered";
};

export type TTASKType = {
  IMPORTANT: "Important";
  URGENT: "Urgent";
};

export type TTask = {
  name: string;
  id: string;
  aim?: string;
  color?: string;
  creatorId: string;
  description: string;
  doerId: string;
  icon: string;
  status: TTaskStatuses;
  type: TTASKType;
};
