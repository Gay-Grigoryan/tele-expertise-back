export interface IResetToken {
  user_id: string;
  hash: string;
}

export interface IChangePasswordToken {
  user_id: string;
  confirm: boolean;
}
