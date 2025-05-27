import type { RootState } from "../../app/store/store";
import type { TypedUseSelectorHook } from "react-redux";
export declare const useAppDispatch: () => import("redux-thunk").ThunkDispatch<{
    user: {
        user: import("../../entities/user/model").User | null;
        error: string | null;
        isLoading: boolean;
    };
}, undefined, import("redux").UnknownAction> & import("redux").Dispatch<import("redux").UnknownAction>;
export declare const useAppSelector: TypedUseSelectorHook<RootState>;
//# sourceMappingURL=reduxHooks.d.ts.map