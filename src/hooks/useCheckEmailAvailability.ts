import axios from "axios";
import { useState } from "react";

type TStatus = "idle" | "checking" | "available" | "notAvailable" | "failed";

const useCheckEmailAvailability = () => {
  const [emailAvailability, setEmailAvailability] =
    useState<TStatus>("idle");
  const [enterEmail, setEnterEmail] = useState<null | string>(null);

  const checkEmailAvailability = async (email: string) => {
    setEnterEmail(email);
    setEmailAvailability("checking");
    try {
      const response = await axios.get(`/users?email=${email}`);
      if (!response.data.length) {
        setEmailAvailability("available");
      } else {
        setEmailAvailability("notAvailable");
      }
    } catch (error) {
      setEmailAvailability("failed");
    }
  };

  const resetCheckEmailAvailability = () => {
    setEmailAvailability("idle");
    setEnterEmail(null);
  };
  return {
    emailAvailability,
    enterEmail,
    checkEmailAvailability,
    resetCheckEmailAvailability,
  };
};

export default useCheckEmailAvailability;
