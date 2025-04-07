
import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { axiosInstance } from "../../lib/axios";
import { useNavigate } from "react-router-dom";
import { Trash2, Eye } from "lucide-react";
import { CreateDialog } from "../../components/CreateDialogue";


interface Formdata {
  id: string;
  college_name: string;
  workshop_name: string;
  date_time: string;
  instructions: string;
  status: boolean;
}

const AdminDetails = () => {
  const [formData, setFormData] = useState<Formdata[]>([]);
  const navigate = useNavigate();

  const fetchAllForms = async () => {
    try {
      const res = await axiosInstance.get("/all-forms");
      setFormData(res.data.forms);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  const deleteForm = async (id: string) => {
    try {
      await axiosInstance.delete(`/${id}`);
      setFormData((prev) => prev.filter((form) => form.id !== id));
    } catch (error) {
      console.error("Error deleting form:", error);
    }
  };

  useEffect(() => {
    fetchAllForms();
  }, []);

  return (
    <div className="p-4 md:p-12">
      <div className="flex justify-end mb-6">
        <CreateDialog onSuccess={fetchAllForms} />
      </div>

      {formData.length === 0 ? (
        <p className="text-sm font-bold text-center">
          No Form data available right now. Please create one.
        </p>
      ) : (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {formData.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-white shadow rounded-2xl border border-gray-100"
            >
              <h3 className="text-lg font-semibold">{item.workshop_name}</h3>
              <p className="text-sm text-gray-600">{item.college_name}</p>
              <p className="text-sm mt-1">
                Date: <span className="font-medium">{item.date_time}</span>
              </p>
              <p className="text-sm mt-1">
                Status:{" "}
                <span className={`font-medium ${item.status ? "text-green-600" : "text-red-600"}`}>
                  {item.status ? "Active" : "Inactive"}
                </span>
              </p>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => navigate(`/admin-dashobard/${item.id}`)}
                >
                  <Eye className="w-4 h-4 mr-2" /> View
                </Button>
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => deleteForm(item.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDetails;
