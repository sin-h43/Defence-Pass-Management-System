export type VisitorOpsMessage = {
  type: "request.updated" | "gate.scan" | "alert.created";
  payload: unknown;
};

export function createVisitorOpsSocket(onMessage: (message: VisitorOpsMessage) => void) {
  void onMessage;

  return {
    connect() {
      return Promise.resolve();
    },
    disconnect() {
      return Promise.resolve();
    },
  };
}
