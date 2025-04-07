import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../lib/config";
import { doc, getDoc } from "firebase/firestore";
import { Navigate } from "react-router-dom";

interface ProtectedAdminRouteProps {
  children: React.ReactNode
}

const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists() && docSnap.data().role === "admin") {
          setIsAdmin(true);
        } else {
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (!isAdmin) return <Navigate to="/signin" />;

  return children;
};

export default ProtectedAdminRoute;
