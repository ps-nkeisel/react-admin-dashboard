import { take } from "@redux-saga/core/effects";

export function* logActions() {
  while (true) {
    const action = yield take("*");
    // console.log(action.type);
  }
}
