import { atom } from "recoil";

export const isLoggedInState = atom({
  key: "isLoggedInState",
  default: false,
});
export const voterIdState = atom({
  key: "voterIdState",
  default: "",
});
export const citizenshipNumberState = atom({
  key: "citizesnshipNumberState",
  default: "",
});
export const emailState = atom({
  key: "emailState",
  default: "",
});
export const voterNameState = atom({
  key: "voterName",
  default: "",
});

///navbar
export const navState = atom({
  key: "navState",
  default: false,
});

//admin

export const isAdminLogState = atom({
  key: "adminState",
  default: false,
});

//loading
export const isLoadingState = atom({
  key: "isLoadingState",
  default: false,
});
export const isSuccessState = atom({
  key: "isSuccessState",
  default: false,
});
export const errorState = atom({
  key: "errorState",
  default: "",
});
