import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";

interface FormData {
  workshop_name: string;
  college_name: string;
  date_time: string;
  instructions: string;
  status: boolean;
}

const ReadOnly = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate=useNavigate();

  const handleFetch = async () => {
    try {
      const res = await axiosInstance.get(`/read-only-form/${id}`);
      setFormData(res.data);
    } catch (err: any) {
      setError("Form not found or inactive.");
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetch();
  }, []);

  if (loading) {
    return <p className="text-center text-sm text-gray-500">Loading form...</p>;
  }

  if (error) {
    return <p className="text-center text-sm text-red-500">{error}</p>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow-md rounded-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Read-Only Form</h1>

      <div className="space-y-4">
        <div>
          <Label>Workshop Name</Label>
          <Input readOnly value={formData?.workshop_name || ""} />
        </div>
        <div>
          <Label>College Name</Label>
          <Input readOnly value={formData?.college_name || ""} />
        </div>
        <div>
          <Label>Date & Time</Label>
          <Input readOnly value={formData?.date_time || ""} />
        </div>
        <div>
          <Label>Instructions</Label>
          <Input readOnly value={formData?.instructions || ""} />
        </div>
        <div>
          <Label>Status</Label>
          <Input
            readOnly
            value={formData?.status ? "Active" : "Inactive"}
            className={formData?.status ? "text-green-600" : "text-red-600"}
          />
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button onClick={() =>navigate('/student-details') }>
          Next
        </Button>
      </div>
    </div>
  );
};

export default ReadOnly;
