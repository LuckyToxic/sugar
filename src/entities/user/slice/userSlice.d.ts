import type { User } from "../model";
type UserState = {
    user: User | null;
    error: string | null;
    isLoading: boolean;
};
export declare const clearUser: import("@reduxjs/toolkit").ActionCreatorWithoutPayload<"user/clearUser">;
export declare const userReducer: import("redux").Reducer<UserState>;
export {};
//# sourceMappingURL=userSlice.d.ts.map