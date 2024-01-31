/* eslint-disable react/prop-types */
import { createContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [role, setRole] = useState(localStorage.getItem('role') || '');

  const updateUserRole = (newRole) => {
    localStorage.setItem('role', newRole);
    setRole(newRole);
    // console.log("authcontext", newRole, role);
  };

  return (
    <AuthContext.Provider value={{ role, updateUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;