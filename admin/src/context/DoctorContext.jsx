// doctorcontext
import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [dToken, setDToken] = useState(
    localStorage.getItem("dToken") ? localStorage.getItem("dToken") : ""
  );
  const [appointments, setAppointments] = useState([]);
  const [dashData, setDashData] = useState(false);
  const [profileData, setProfileData] = useState(false);

  const getAppointments = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/user-appointment`, {
        headers: { Authorization: `Bearer ${dToken}` },
      });

      console.log(data);

      if (Array.isArray(data) && data.length > 0) {
        setAppointments(data);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // doctorcontext
  const completeAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/doctor/confirm-appointment/${appointmentId}`,
        { status: "confirmed" },
        { headers: { Authorization: `Bearer ${dToken}` } }
      );
      if (data.appointment.status === "confirmed") {
        toast.success("Đã cập nhật lịch hẹn thành công!");
        getAppointments(); // Tải lại danh sách cuộc hẹn
      } else {
        toast.error("Cập nhật lịch hẹn thất bại!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const cancelAppointment = async (appointmentId) => {
    try {
      const { data } = await axios.put(
        `${backendUrl}/doctor/confirm-appointment/${appointmentId}`,
        { status: "canceled" },
        { headers: { Authorization: `Bearer ${dToken}` } }
      );
      if (data.appointment.status === "canceled") {
        toast.success("Đã huỷ lịch hẹn thành công!");
        getAppointments(); // Tải lại danh sách cuộc hẹn
      } else {
        toast.error("Huỷ lịch hẹn thất bại!");
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  const getDashData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/dashboard`, {
        headers: { Authorization: `Bearer ${dToken}` },
      });
      if (data.success) {
        setDashData(data.dashData);
        console.log(data.dashData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getProfileData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/doctor/profile`, {
        headers: { Authorization: `Bearer ${dToken}` },
      });
      if (data.success) {
        setProfileData(data.profileData);
        console.log(data.profileData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const value = {
    dToken,
    setDToken,
    backendUrl,
    appointments,
    setAppointments,
    getAppointments,
    completeAppointment,
    cancelAppointment,
    dashData,
    setDashData,
    getDashData,
    profileData,
    setProfileData,
    getProfileData,
  };

  return (
    <DoctorContext.Provider value={value}>
      {props.children}
    </DoctorContext.Provider>
  );
};

export default DoctorContextProvider;
