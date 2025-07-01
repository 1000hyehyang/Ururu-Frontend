import { useState, useCallback } from 'react';

interface AddressFormData {
  addressName: string;
  isDefault: boolean;
  phone: string;
  zipcode: string;
  addressRoad: string;
  addressJibun: string;
  addressDetail: string;
}

const INITIAL_ADDRESS_DATA: AddressFormData = {
  addressName: '',
  isDefault: true,
  phone: '',
  zipcode: '',
  addressRoad: '',
  addressJibun: '',
  addressDetail: '',
};

export const useAddressRegister = () => {
  const [addressData, setAddressData] = useState<AddressFormData>(INITIAL_ADDRESS_DATA);

  const handleInputChange = useCallback((field: keyof AddressFormData, value: string) => {
    setAddressData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleCheckboxChange = useCallback((field: keyof AddressFormData, checked: boolean) => {
    setAddressData((prev) => ({
      ...prev,
      [field]: checked,
    }));
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      // TODO: 실제 배송지 등록 API 연동 필요
      console.log('배송지 등록:', addressData);
    },
    [addressData],
  );

  const resetForm = useCallback(() => {
    setAddressData(INITIAL_ADDRESS_DATA);
  }, []);

  const isFormValid = useCallback(() => {
    return (
      addressData.addressName.trim() !== '' &&
      addressData.phone.trim() !== '' &&
      addressData.zipcode.trim() !== '' &&
      addressData.addressRoad.trim() !== '' &&
      addressData.addressJibun.trim() !== '' &&
      addressData.addressDetail.trim() !== ''
    );
  }, [addressData]);

  return {
    addressData,
    handleInputChange,
    handleCheckboxChange,
    handleSubmit,
    resetForm,
    isFormValid,
  };
};
