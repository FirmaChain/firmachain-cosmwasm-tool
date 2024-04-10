export interface ILoadingState {
  enable: boolean;
  message: string;
}

export interface ISnackbarState {
  enable: boolean;
  message: string;
  type: "success" | "error";
}