export enum AppActionTypes {
  LOGIN = '@app/LOGIN',
  LOGOUT = '@app/LOGOUT',
  UPDATE_TIME = '@app/UPDATE_TIME',
  UPDATE_SCENARIO = '@app/UPDATE_SCENARIO',
  SET_CONNECTION_STATUS = '@app/SET_CONNECTION_STATUS',
}

export interface ILogin {
  type: AppActionTypes.LOGIN;
  ip: string | null;
  password: string | null;
  serverName: string | null;
  userName: string | null;
}

export interface ILogout {
  type: AppActionTypes.LOGOUT;
}

export interface IUpdateTime {
  type: AppActionTypes.UPDATE_TIME;
  lastUpdateTime: string | null;
}

export interface IUpdateScenario {
  type: AppActionTypes.UPDATE_SCENARIO;
  scenarioId: number;
}

export interface ISetConnectionStatus {
  type: AppActionTypes.SET_CONNECTION_STATUS;
  connected: boolean;
}

export type AppActions =
  | ILogin
  | ILogout
  | IUpdateTime
  | IUpdateScenario
  | ISetConnectionStatus;
