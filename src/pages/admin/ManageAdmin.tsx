import { useParams } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import { useEffect, useState } from "react";


interface FormsData{
    workshop_name:string,
    college_name:string,
    date_time:string,
    instructions:string,
    status:boolean

    
}
const ManageAdmin = () => {
  const { id } = useParams();
  const [formDetails, setFormDetails] = useState<FormsData | null>(null);

  const getDetailsPage = async () => {
    try {
      if (!id) return;
      const res = await axiosInstance.get(`/${id}`);
   
      setFormDetails(res.data);
    } catch (error) {
      console.error("Error fetching form details:", error);
    }
  };

  useEffect(() => {
    getDetailsPage();
  }, [id]);

  return (
    <div className="p-6">
      {formDetails ? (
        <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">{formDetails?.workshop_name}</h1>
          <p className="text-gray-600 mb-1">College: {formDetails?.college_name}</p>
          <p className="text-gray-600 mb-1">Date: {formDetails?.date_time}</p>
          <p className="text-gray-600 mb-1">Instructions: {formDetails?.instructions}</p>
          <p className="mt-2 font-semibold">
            Status:{" "}
            <span className={formDetails?.status ? "text-green-600" : "text-red-600"}>
              {formDetails?.status ? "Active" : "Inactive"}
            </span>
          </p>
        </div>
      ) : (
        <p className="text-center text-sm text-gray-500">Loading form details...</p>
      )}
    </div>
  );
};

export default ManageAdmin;
