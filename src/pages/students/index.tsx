import { useEffect, useState } from "react";
// import {
//   RecaptchaVerifier,
//   signInWithPhoneNumber,
//   PhoneAuthProvider,
//   signInWithCredential,
//   sendSignInLinkToEmail,
//   isSignInWithEmailLink,
//   signInWithEmailLink,
// } from "firebase/auth";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { axiosInstance } from "../../lib/axios";
// import { auth } from "../../lib/config";

// declare global {
//   interface Window {
//     recaptchaVerifier: RecaptchaVerifier;
//     confirmationResult: any;
//   }
// }

const StudentDetails = () => {
  const [studentData, setStudentData] = useState({
    name: "",
    course: "",
    phone: "",
    email: "",
    feedback: "",
    phoneOtp: "",
  });

  // const [phoneVerificationId, setPhoneVerificationId] = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({ ...prev, [name]: value }));
  };

  // const setupRecaptcha = () => {
  //   if (!window.recaptchaVerifier) {
  //     window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
  //       size: "invisible",
  //       callback: (response: any) => {},
  //     });
  //   }
  // };

  // const sendPhoneOtp = async () => {
  //   const phoneNumber = studentData.phone.startsWith("+91")
  //     ? studentData.phone
  //     : `+91${studentData.phone}`;

  //   if (!/^\+91\d{10}$/.test(phoneNumber)) {
  //     alert("Invalid phone number format.");
  //     return;
  //   }

  //   setupRecaptcha();
  //   const appVerifier = window.recaptchaVerifier;

  //   try {
  //     const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  //     window.confirmationResult = confirmationResult;
  //     setPhoneVerificationId(confirmationResult.verificationId);
  //     setOtpSent(true);
  //     alert("OTP sent.");
  //   } catch (error) {
  //     alert("Phone OTP failed.");
  //   }
  // };

  // const verifyPhoneOtp = async () => {
  //   try {
  //     const credential = PhoneAuthProvider.credential(
  //       phoneVerificationId,
  //       studentData.phoneOtp
  //     );
  //     await signInWithCredential(auth, credential);
  //     setPhoneVerified(true);
  //   } catch (err) {
  //     alert("Invalid OTP");
  //   }
  // };

  // const sendEmailVerification = async () => {
  //   const actionCodeSettings = {
  //     url: window.location.href,
  //     handleCodeInApp: true,
  //   };

  //   try {
  //     await sendSignInLinkToEmail(auth, studentData.email, actionCodeSettings);
  //     window.localStorage.setItem("emailForSignIn", studentData.email);
  //     alert("Verification link sent.");
  //   } catch (error) {
  //     alert("Failed to send verification link");
  //   }
  // };

  // const confirmEmailVerification = () => {
  //   const email = window.localStorage.getItem("emailForSignIn")!;
  //   if (isSignInWithEmailLink(auth, window.location.href)) {
  //     signInWithEmailLink(auth, email, window.location.href)
  //       .then(() => setEmailVerified(true))
  //       .catch(() => {});
  //   }
  // };

  useEffect(() => {
    // confirmEmailVerification();
  }, []);

  const handleGenerateCertificate = async () => {
    const { name, course } = studentData;
  
    if (!name || !course) {
      alert("Please enter your name and course");
      return;
    }
  
    try {
      const response = await axiosInstance.post(
        '/generate-pdf',
        { name, course },
        {
          responseType: 'blob', 
        }
      );
  
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
      const blobUrl = window.URL.createObjectURL(pdfBlob);
      window.open(blobUrl, '_blank');
    } catch (error) {
      console.error("Error generating certificate:", error);
      alert("Failed to generate certificate.");
    }
  };
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl space-y-4">
      <h2 className="text-2xl font-bold">Workshop Feedback Form</h2>

      <Input
        name="name"
        value={studentData.name}
        onChange={handleChange}
        placeholder="Your Name"
      />
      <Input
        name="course"
        value={studentData.course}
        onChange={handleChange}
        placeholder="Your Course"
      />
      <Input
        name="phone"
        value={studentData.phone}
        onChange={handleChange}
        placeholder="Your Phone Number"
      />

      {!phoneVerified && (
        <div className="space-y-2">
          {!otpSent ? (
            <Button /* onClick={sendPhoneOtp} */>Send Phone OTP</Button>
          ) : (
            <>
              <Input
                name="phoneOtp"
                value={studentData.phoneOtp}
                onChange={handleChange}
                placeholder="Enter OTP"
              />
              <Button /* onClick={verifyPhoneOtp} */>Verify Phone</Button>
            </>
          )}
        </div>
      )}
      {phoneVerified && <p className="text-green-600">Phone Verified</p>}

      <Input
        name="email"
        value={studentData.email}
        onChange={handleChange}
        placeholder="Your Email"
      />
      {!emailVerified && (
        <Button /* onClick={sendEmailVerification} */>
          Send Email Verification
        </Button>
      )}
      {emailVerified && <p className="text-green-600">Email Verified</p>}

      <div>
        <label className="block font-medium mb-1">Feedback</label>
        <textarea
          name="feedback"
          className="w-full border rounded-lg p-2"
          rows={4}
          placeholder="Your feedback"
          value={studentData.feedback}
          onChange={handleChange}
        ></textarea>
      </div>

      <div id="recaptcha-container"></div>

      <div className="flex justify-end pt-4">
        <Button
      
          onClick={handleGenerateCertificate}
        >
          Get Certificate
        </Button>
      </div>
    </div>
  );
};

export default StudentDetails;
