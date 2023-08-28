import { useRouter, useSegments } from "expo-router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

// This hook can be used to access the user info.
export function useAuth() {
  return useContext(AuthContext);
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(token) {
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    const inAuthGroup = segments[0] === "(auth)";

    if (
      // If the user is not signed in and the initial segment is not anything in the auth group.
      !token &&
      !inAuthGroup
    ) {
      // Redirect to the sign-in page.
      router.replace("/login");
    } else if (token && inAuthGroup) {
      // Redirect away from the sign-in page.
      router.replace("/");
    }
  }, [token, segments]);
}

export function Provider(props) {
  useProtectedRoute(props.token);

  return (
    <AuthContext.Provider>
      {props.children}
    </AuthContext.Provider>
  );
}
