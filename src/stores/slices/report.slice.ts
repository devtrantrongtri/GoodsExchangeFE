import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Report } from "../../types/Product/PostProb";

interface ReportState {
    reports: Report[];
    loading: boolean;
    error: string | null;
}

const initialState: ReportState = {
    reports: [],
    loading: false,
    error: null,
};

const reportSlice = createSlice({
    name: 'report',
    initialState,
    reducers: {
        setReports: (state, action: PayloadAction<Report[]>) => {
            state.reports = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setReports, setLoading, setError } = reportSlice.actions;
export default reportSlice.reducer;