import axios from "axios";
import { createContext, useEffect, useReducer } from "react";

const initialState = {
    allEmployers: [],
    verifiedEmployers: [],
    nonVerifiedEmployers: [],
    approvedJobs: [],
    allJobs: [],
    pendingJobs: [],
    categories: [],
    categoryRequest: [],
    categoryHistory: []
};

const adminReducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_ALL_EMPLOYERS':
            return { ...state, allEmployers: action.payload };
        case 'FETCH_VERIFIED_EMPLOYERS':
            return { ...state, verifiedEmployers: action.payload };
        case 'FETCH_NON_VERIFIED_EMPLOYERS':
            return { ...state, nonVerifiedEmployers: action.payload };
        case 'FETCH_ALL_JOBS':
            return { ...state, allJobs: action.payload };
        case 'FETCH_APPROVED_JOBS':
            return { ...state, approvedJobs: action.payload };
        case 'FETCH_PENDING_JOBS':
            return { ...state, pendingJobs: action.payload };
        case 'FETCH_CATEGORIES':
            return { ...state, categories: action.payload };
        case 'FETCH_CATEGORY_REQUEST':
            return { ...state, categoryRequest: action.payload };
        case 'FETCH_CATEGORY_REQ_HISTORY':
            return { ...state, categoryHistory: action.payload };
        default:
            return state;
    }
};

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
    const [state, dispatch] = useReducer(adminReducer, initialState);

    useEffect(() => {

        // Fetch employers from the API
        axios.get('http://localhost:4000/admin/getAllEmployers')
            .then(data => dispatch({ type: 'FETCH_ALL_EMPLOYERS', payload: data.data }));
        axios.get('http://localhost:4000/admin/getVerifiedEmployers')
            .then(data => dispatch({ type: 'FETCH_VERIFIED_EMPLOYERS', payload: data.data }));
        axios.get('http://localhost:4000/admin/getNonVerifiedEmployers')
            .then(data => dispatch({ type: 'FETCH_NON_VERIFIED_EMPLOYERS', payload: data.data }));


        //Fetch ApprovedJobs
        axios.get('http://localhost:4000/job/getApprovedJobs')
            .then(data => dispatch({ type: 'FETCH_APPROVED_JOBS', payload: data.data }));
        //Fetch Pending Jobs
        axios.get('http://localhost:4000/job/getPostedJobs')
            .then(data => dispatch({ type: 'FETCH_PENDING_JOBS', payload: data.data }));
        //Fetch All Jobs
        axios.get('http://localhost:4000/job/getAllJobs')
            .then(data => dispatch({ type: 'FETCH_ALL_JOBS', payload: data.data }));

        //fetch all category update requests
        axios.get('http://localhost:4000/job/getCategoryRequest')
            .then(data => dispatch({ type: 'FETCH_CATEGORY_REQUEST', payload: data.data }));

        //fetch all category update history
        axios.get('http://localhost:4000/job/getCategoryHistory')
            .then(data => dispatch({ type: 'FETCH_CATEGORY_REQ_HISTORY', payload: data.data }));
    }, []);

    return (
        <AdminContext.Provider value={{ state, dispatch }}>
            {children}
        </AdminContext.Provider>
    );
};