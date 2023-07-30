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
  const Data = await axios.post("http://localhost:4000/authentication/signUp", data)
  return Data?.data
}
export const httpupdateProfile = async (data) => {
  const Data = await axios.post("http://localhost:4000/editProfile", data)
  return Data
}
export const httpEmpchangepw = async (data) => {
  const Data = await axios.post("http://localhost:4000/admin/reset", data)
  return Data
}
export const httpgetDashboardData = async () => {
  const Data = await axios.get("http://localhost:4000/job/getDashboardData")
  return Data
}
export const httpgetjobCountbyCategory = async () => {
  const Data = await axios.get("http://localhost:4000/job/getJobCountByCategory")
  return Data
}
export const httpgetTopEmployer = async () => {
  const Data = await axios.get("http://localhost:4000/job/getTopEmployer")
  return Data
}