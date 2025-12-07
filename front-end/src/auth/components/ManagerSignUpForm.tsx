import React from 'react';
import { ManagerUser } from '../../types/user';
import CommonAdminSignUpFields from './CommonAdminSignUpFields';

interface ManagerSignUpFormProps {
  formData: Partial<ManagerUser>;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const ManagerSignUpForm: React.FC<ManagerSignUpFormProps> = ({ formData, onFormChange }) => {
  return (
    <CommonAdminSignUpFields formData={formData} onFormChange={onFormChange} />
  );
};

export default ManagerSignUpForm;
