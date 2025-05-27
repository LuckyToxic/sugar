declare const store: import("@reduxjs/toolkit").EnhancedStore<{
    user: {
        user: import("../../entities/user/model").User | null;
        error: string | null;
        isLoading: boolean;
    };
}, import("redux").UnknownAction, import("@reduxjs/toolkit").Tuple<[import("redux").StoreEnhancer<{
    dispatch: import("redux-thunk").ThunkDispatch<{
        user: {
            user: import("../../entities/user/model").User | null;
            error: string | null;
            isLoading: boolean;
        };
    }, undefined, import("redux").UnknownAction>;
}>, import("redux").StoreEnhancer]>>;
export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
//# sourceMappingURL=store.d.ts.map