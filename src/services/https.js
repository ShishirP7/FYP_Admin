import axios from "axios";

export const httpApproveEmployer = async (id) => {
  const Data = await axios.post(`http://localhost:4000/admin/approveEmployer?id=${id}`);

  return Data;
};

export const httpDeleteEmployer = async (id) => {
  const Data = await axios.post(`http://localhost:4000/admin/deleteEmployer?id=${id}`);

  return Data;
};

export const httpApproveJob = async (id) => {
  const Data = await axios.post(`http://localhost:4000/admin/approveJob?id=${id}`);
  return Data;
};
export const httpRemoveJob = async (id) => {
  const Data = await axios.post(`http://localhost:4000/job/removeJob?id=${id}`);
  return Data;
};

export const httpapproveCategoryChange = async (data) => {
  const Data = await axios.post(`http://localhost:4000/job/approveCategoryChange`, data)
  return Data?.data
}
export const httprejectCategoryChange = async (data) => {
  const Data = await axios.post(`http://localhost:4000/job/rejectCategoryChange`, data)
  return Data?.data
}
export const httpLogin = async (data) => {
  const Data = await axios.post(`http://localhost:4000/authentication/login`, data)
  return Data?.data
}

export const httpSignup = async (data) => {
  const Data = await axios.post(`http://localhost:4000/authentication/signUp`, data)
  return Data?.data
}

