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
export const navState = atom({
  key: "navState",
  default: true,
});
