import { SuperAdmin, Doctor } from "@prisma/client";

export type TUser<Type> = Record<TUserKey<Type>, Type>;

type TUserKey<Type> = Type extends Doctor ? "doctor" : Type extends SuperAdmin ? "super_admin" : never;

export enum user_types {
  doctor = "doctor",
  super_admin = "super_admin"
}
