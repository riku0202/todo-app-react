import liff from "@line/liff/dist/lib";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type LiffUser = {
  userId: string;
  userName: string;
};

const liffContext = createContext<LiffUser>({
  userId: "",
  userName: "",
});

export const LiffProvider = ({
  children,
}: {
  children: NonNullable<ReactNode>;
}): JSX.Element => {
  const [liffProfile, setLiffProfile] = useState<LiffUser | null>(null);

  console.log("logged in");

  useEffect(() => {
    (async () => {
      try {
        await liff.init({ liffId: import.meta.env.VITE_LIFF_ID });
        if (!liff.isLoggedIn()) {
          liff.login({});
        } else console.log("logged in");
      } catch (e) {
        if (e instanceof Error) {
          throw new Error("Failed to initialize LIFF." + e);
        }
        throw new Error("Failed to initialize LIFF.");
      }

      const { displayName, userId } = await liff.getProfile();

      setLiffProfile({
        userId: userId,
        userName: displayName,
      });
    })();
  }, []);

  if (!liffProfile) {
    return <div>Loading...</div>;
  }

  return (
    <liffContext.Provider value={liffProfile}>{children}</liffContext.Provider>
  );
};

export const useLiff = (): LiffUser => {
  const user = useContext(liffContext);

  return user;
};
