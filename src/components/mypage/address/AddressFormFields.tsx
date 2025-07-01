import React from 'react';
import { FormField } from '@/components/form/FormField';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { FORM_STYLES } from '@/constants/form-styles';
import { formatPhoneNumber } from '@/lib/format-utils';
import { VALIDATION_CONSTANTS } from '@/constants/validation';

interface AddressFormFieldsProps {
  addressData: {
    addressName: string;
    isDefault: boolean;
    phone: string;
    zipcode: string;
    addressRoad: string;
    addressJibun: string;
    addressDetail: string;
  };
  onInputChange: (field: string, value: string | boolean) => void;
}

export function AddressFormFields({ addressData, onInputChange }: AddressFormFieldsProps) {
  return (
    <>
      {/* 배송지명 */}
      <FormField
        label="배송지명"
        required
        characterCount={{
          current: addressData.addressName.length,
          max: 20,
        }}
      >
        <Input
          type="text"
          placeholder="EX) 우리집"
          value={addressData.addressName}
          onChange={(e) => onInputChange('addressName', e.target.value)}
          maxLength={20}
          className={FORM_STYLES.input.base + ' ' + FORM_STYLES.input.focus}
          required
        />
      </FormField>

      {/* 기본 배송지 설정 */}
      <div className="space-y-3">
        <label className={FORM_STYLES.checkbox.container}>
          <input
            type="checkbox"
            checked={addressData.isDefault}
            onChange={(e) => onInputChange('isDefault', e.target.checked)}
            className={FORM_STYLES.checkbox.base}
          />
          <span className={FORM_STYLES.checkbox.label}>기본 배송지로 설정</span>
        </label>
      </div>

      {/* 연락처 */}
      <FormField
        label="연락처"
        required
        helperText="하이픈(-)을 제외하고 숫자만 입력해주세요"
        characterCount={{
          current: addressData.phone.length,
          max: VALIDATION_CONSTANTS.PHONE.MAX_LENGTH,
        }}
      >
        <Input
          type="tel"
          placeholder="010-0000-0000"
          value={formatPhoneNumber(addressData.phone)}
          onChange={(e) => onInputChange('phone', e.target.value.replace(/[^0-9]/g, ''))}
          maxLength={VALIDATION_CONSTANTS.PHONE.FORMATTED_MAX_LENGTH}
          className={FORM_STYLES.input.base + ' ' + FORM_STYLES.input.focus}
          required
        />
      </FormField>

      {/* 주소 */}
      <FormField label="주소" required>
        <div className="mb-2 flex gap-2">
          <div className={FORM_STYLES.zipcode.display}>{addressData.zipcode || '우편번호'}</div>
          <button
            type="button"
            className={FORM_STYLES.button.pinkOutline + ' h-12 min-w-[120px] rounded-lg'}
          >
            우편 번호
          </button>
        </div>
        <Input
          type="text"
          placeholder="도로명"
          value={addressData.addressRoad}
          onChange={(e) => onInputChange('addressRoad', e.target.value)}
          className={FORM_STYLES.input.base + ' mb-2'}
          required
        />
        <Input
          type="text"
          placeholder="지번"
          value={addressData.addressJibun}
          onChange={(e) => onInputChange('addressJibun', e.target.value)}
          className={FORM_STYLES.input.base}
          required
        />
      </FormField>

      {/* 상세주소 */}
      <FormField label="상세주소" required>
        <Input
          type="text"
          placeholder="상세주소를 입력해주세요"
          value={addressData.addressDetail}
          onChange={(e) => onInputChange('addressDetail', e.target.value)}
          className={FORM_STYLES.input.base + ' ' + FORM_STYLES.input.focus}
          required
        />
      </FormField>
    </>
  );
}
