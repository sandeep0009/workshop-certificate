
import {  createUserWithEmailAndPassword } from "firebase/auth";
import {  doc, setDoc } from "firebase/firestore";
import { auth, db } from "../lib/config";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

enum Role {
  admin = "admin",
  student = "student",
}

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  role: z.nativeEnum(Role),
});

type FormData = z.infer<typeof formSchema>;

const SignUp = () => {
 

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      role: Role.student,
    },
  });

  const handleSignUp = async (data: FormData) => {
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      const user = userCredentials.user;

      await setDoc(doc(db, "users", user.uid), {
        email: data.email,
        role: data.role,
      });

      window.location.href =
        data.role === "admin" ? "/admin-dashboard" : "/organizer-portal";
    } catch (error: any) {
      console.error("Error signing up:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md space-y-6">
        <h2 className="text-center text-2xl font-semibold">Sign Up</h2>
        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              {...register("password")}
              placeholder="Enter your password"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="role">Role</Label>
            <Select
              onValueChange={(value) => setValue("role", value as Role)}
              defaultValue={Role.student}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Role.admin}>Admin</SelectItem>
                <SelectItem value={Role.student}>Student</SelectItem>
              </SelectContent>
            </Select>
            {errors.role && (
              <p className="text-red-500 text-sm">{errors.role.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
