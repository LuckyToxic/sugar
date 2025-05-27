import type { User } from "../model";
interface ErrorPayload {
    error: string;
}
export declare const getUserThunk: import("@reduxjs/toolkit").AsyncThunk<User, User, {
    rejectValue: ErrorPayload;
    state?: unknown;
    dispatch?: import("redux-thunk").ThunkDispatch<unknown, unknown, import("redux").UnknownAction> | undefined;
    extra?: unknown;
    serializedErrorType?: unknown;
    pendingMeta?: unknown;
    fulfilledMeta?: unknown;
    rejectedMeta?: unknown;
}>;
export {};
//# sourceMappingURL=userApi.d.ts.map