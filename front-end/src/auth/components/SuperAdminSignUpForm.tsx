import React from 'react';
import { SuperAdminUser } from '../../types/user';
import CommonAdminSignUpFields from './CommonAdminSignUpFields';

interface SuperAdminSignUpFormProps {
  formData: Partial<SuperAdminUser>;
  onFormChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const SuperAdminSignUpForm: React.FC<SuperAdminSignUpFormProps> = ({ formData, onFormChange }) => {
  return (
    <CommonAdminSignUpFields formData={formData} onFormChange={onFormChange} />
  );
};

export default SuperAdminSignUpForm;
