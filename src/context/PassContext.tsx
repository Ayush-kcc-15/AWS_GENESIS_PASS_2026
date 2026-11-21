import React, { createContext, useContext, useState, useEffect } from 'react';

export interface PassData {
  fullName: string;
  collegeName: string;
  originalPhotoUrl: string | null;
  croppedPhotoUrl: string | null;
  photoFileName: string;
  photoFileSize: number;
  linkedinUrl: string;
  instagramHandle: string;
}

interface PassContextType {
  passData: PassData;
  updatePassData: (updates: Partial<PassData>) => void;
  resetPassData: () => void;
  isFormValid: boolean;
  errors: Record<string, string>;
  setErrors: React.Dispatch<React.SetStateAction<Record<string, string>>>;
}

const DEFAULT_PASS_DATA: PassData = {
  fullName: '',
  collegeName: 'KCC Institute of Technology & Management',
  originalPhotoUrl: null,
  croppedPhotoUrl: null,
  photoFileName: '',
  photoFileSize: 0,
  linkedinUrl: '',
  instagramHandle: '',
};

const PassContext = createContext<PassContextType | undefined>(undefined);

const STORAGE_KEY = 'genesis_2026_pass_data';

export const PassProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [passData, setPassData] = useState<PassData>(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_PASS_DATA, ...JSON.parse(saved) };
      }
    } catch {
      // sessionStorage unavailable or parse error
    }
    return DEFAULT_PASS_DATA;
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(passData));
    } catch {
      // ignore quota errors
    }
  }, [passData]);

  const updatePassData = (updates: Partial<PassData>) => {
    setPassData((prev) => ({ ...prev, ...updates }));
  };

  const resetPassData = () => {
    setPassData(DEFAULT_PASS_DATA);
    setErrors({});
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  // Validation rules
  const isFullNameValid = passData.fullName.trim().length > 0 && passData.fullName.trim().length <= 40;
  const isPhotoValid = Boolean(passData.croppedPhotoUrl || passData.originalPhotoUrl);
  
  // LinkedIn validation: optional, but if provided must be a valid URL
  let isLinkedinValid = true;
  if (passData.linkedinUrl.trim()) {
    try {
      const url = new URL(
        passData.linkedinUrl.startsWith('http') ? passData.linkedinUrl : `https://${passData.linkedinUrl}`
      );
      isLinkedinValid = url.hostname.includes('linkedin.com');
    } catch {
      isLinkedinValid = false;
    }
  }

  // Instagram validation: optional, but if provided must be a valid handle
  let isInstagramValid = true;
  if (passData.instagramHandle.trim()) {
    const handle = passData.instagramHandle.trim().replace(/^@/, '');
    isInstagramValid = /^[a-zA-Z0-9._]{1,30}$/.test(handle);
  }

  const isFormValid = isFullNameValid && isPhotoValid && isLinkedinValid && isInstagramValid;

  return (
    <PassContext.Provider
      value={{
        passData,
        updatePassData,
        resetPassData,
        isFormValid,
        errors,
        setErrors,
      }}
    >
      {children}
    </PassContext.Provider>
  );
};

export const usePass = () => {
  const context = useContext(PassContext);
  if (!context) {
    throw new Error('usePass must be used within a PassProvider');
  }
  return context;
};
