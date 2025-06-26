import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    latestJob: ["full-time"],
    category: [
        {
            id: 1,
            name: "Residential",
            value: "residential",
        },
        {
            id: 2,
            name: "Commercial",
            value: "commercial",
        },
        {
            id: 3,
            name: "Industrial",
            value: "industrial",
        },
        {
            id: 4,
            name: "Apartments",
            value: "apartments",
        },
    ],
    jobTypeList: [
        {
            id: 1,
            name: "Freelance",
            value: "freelance",
            isChecked: false,
        },
        {
            id: 2,
            name: "Full Time",
            value: "full_time",
            isChecked: false,
        },
        {
            id: 3,
            name: "Part Time",
            value: "part_time",
            isChecked: false,
        },
        {
            id: 4,
            name: "Internship",
            value: "internship",
            isChecked: false,
        },
        {
            id: 5,
            name: "Remote",
            value: "remote",
            isChecked: false,
        },
        {
            id: 6,
            name: "Other",
            value: "other",
            isChecked: false,
        },
    ],
    datePost: [
        { id: 1, name: "All", value: "all", isChecked: false },
        { id: 2, name: "Last Hour", value: "last-hour", isChecked: false },
        {
            id: 3,
            name: "Last 24 Hour",
            value: "last-24-hour",
            isChecked: false,
        },
        { id: 4, name: "Last 7 Days", value: "last-7-days", isChecked: false },
        {
            id: 5,
            name: "Last 14 Days",
            value: "last-14-days",
            isChecked: false,
        },
        {
            id: 6,
            name: "Last 30 Days",
            value: "last-30-days",
            isChecked: false,
        },
    ],
    experienceLavel: [
        { id: 1, name: "Fresh", value: "fresh", isChecked: false },
        { id: 2, name: "1 Year", value: "1-year", isChecked: false },
        { id: 3, name: "2 Year", value: "2-year", isChecked: false },
        { id: 4, name: "3 Year", value: "3-year", isChecked: false },
        {
            id: 5,
            name: "4 Year",
            value: "4-year",
            isChecked: false,
        },
    ],
    tags: [
        {
            id: 1,
            name: "App",
            value: "app",
        },
        {
            id: 2,
            name: "Administrative",
            value: "administrative",
        },
        {
            id: 3,
            name: "Android",
            value: "android",
        },
        {
            id: 4,
            name: "Wordpress",
            value: "wordpress",
        },
        {
            id: 5,
            name: "Design",
            value: "design",
        },
        {
            id: 6,
            name: "React",
            value: "react",
        },
    ],
};

export const jobSlice = createSlice({
    name: "job",
    initialState,
    reducers: {
        addLatestJob: (state, { payload }) => {
            const isExist = state.latestJob?.includes(payload);
            if (isExist) {
                state.latestJob = state.latestJob.filter(
                    (item) => item !== payload
                );
            } else {
                state.latestJob.push(payload);
            }
        },
        clearJobTypeToggle: (state) => {
            state?.jobTypeList?.map((item) => {
                item.isChecked = false;
                return {
                    ...item,
                };
            });
        },
        jobTypeCheck: (state, { payload }) => {
            state?.jobTypeList?.map((item) => {
                if (item.id === payload) {
                    if (item.isChecked) {
                        item.isChecked = false;
                    } else {
                        item.isChecked = true;
                    }
                }
                return {
                    ...item,
                };
            });
        },
        datePostCheck: (state, { payload }) => {
            state?.datePost?.map((item) => {
                item.isChecked = false;
                if (item.id === payload) {
                    item.isChecked = true;
                }
                return {
                    ...item,
                };
            });
        },
        clearDatePostToggle: (state) => {
            state?.datePost?.map((item) => {
                item.isChecked = false;
                return {
                    ...item,
                };
            });
        },
        experienceLavelCheck: (state, { payload }) => {
            state?.experienceLavel?.map((item) => {
                if (item.id === payload) {
                    if (item.isChecked) {
                        item.isChecked = false;
                    } else {
                        item.isChecked = true;
                    }
                }
                return {
                    ...item,
                };
            });
        },
        clearExperienceToggle: (state) => {
            state?.experienceLavel?.map((item) => {
                item.isChecked = false;
                return {
                    ...item,
                };
            });
        },
    },
});

export const {
    addLatestJob,
    clearJobTypeToggle,
    jobTypeCheck,
    datePostCheck,
    clearDatePostToggle,
    experienceLavelCheck,
    clearExperienceToggle,
} = jobSlice.actions;
export default jobSlice.reducer;
