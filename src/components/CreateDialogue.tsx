import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface CreateFormProps {
  onSuccess: () => void;
}

export const CreateDialog = ({ onSuccess }: CreateFormProps) => {
  const [open, setOpen] = useState(false);
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);
  const [createdFormId, setCreatedFormId] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    workshop_name: "",
    college_name: "",
    date_time: "",
    instructions: "",
    status: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await axiosInstance.post("/create", formData);
      const formId = res.data.id; 
      setCreatedFormId(formId);
      setOpen(false);
      setSuccessDialogOpen(true);
      onSuccess();
    } catch (error) {
      console.error("Error creating form:", error);
    }
  };

  const readOnlyUrl = `${window.location.origin}/read-only/${createdFormId}`;

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Create</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Form</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input name="workshop_name" placeholder="Workshop Name" onChange={handleChange} />
            <Input name="college_name" placeholder="College Name" onChange={handleChange} />
            <Input name="date_time" placeholder="Date & Time" onChange={handleChange} />
            <Input name="instructions" placeholder="Instructions" onChange={handleChange} />
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="status"
                checked={formData.status}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <label htmlFor="status">Active</label>
            </div>
          </div>
          <DialogFooter>
            <Button onClick={handleSubmit}>Submit</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Second Dialog: Copy Link */}
      <Dialog open={successDialogOpen} onOpenChange={setSuccessDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Form Created Successfully 🎉</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-600 mb-2">Here's your read-only link:</p>
          <div className="flex gap-2 items-center">
            <Input value={readOnlyUrl} readOnly className="flex-1" />
            <Button
              onClick={() => {
                navigator.clipboard.writeText(readOnlyUrl);
              }}
            >
              Copy
            </Button>
          </div>
          <DialogFooter className="pt-4">
            <Button variant="outline" onClick={() => setSuccessDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
