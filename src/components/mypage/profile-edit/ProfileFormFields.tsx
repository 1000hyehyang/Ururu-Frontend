import React from 'react';
import { FormField } from '@/components/form/FormField';
import { Input } from '@/components/ui/input';
import { SelectableButton } from '@/components/ui/selectable-button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { format } from 'date-fns';
import { FORM_STYLES } from '@/constants/form-styles';
import { formatPhoneNumber } from '@/lib/format-utils';
import { VALIDATION_CONSTANTS } from '@/constants/validation';

interface ProfileFormFieldsProps {
  nickname: string;
  gender: string;
  birth: Date | undefined;
  phone: string;
  agreements: {
    marketing: boolean;
    location: boolean;
  };
  nicknameGuide: string;
  nicknameGuideType: 'success' | 'error' | 'base';
  onNicknameChange: (value: string) => void;
  onNicknameCheck: () => void;
  onGenderChange: (value: string) => void;
  onBirthChange: (date: Date | undefined) => void;
  onPhoneChange: (value: string) => void;
  onAgreementChange: (field: 'marketing' | 'location', checked: boolean) => void;
  genderOptions: readonly { readonly label: string; readonly value: string }[];
}

export function ProfileFormFields({
  nickname,
  gender,
  birth,
  phone,
  agreements,
  nicknameGuide,
  nicknameGuideType,
  onNicknameChange,
  onNicknameCheck,
  onGenderChange,
  onBirthChange,
  onPhoneChange,
  onAgreementChange,
  genderOptions,
}: ProfileFormFieldsProps) {
  return (
    <>
      {/* 닉네임 */}
      <FormField
        label="닉네임"
        required
        helperText={nicknameGuide}
        helperTextType={nicknameGuideType}
        characterCount={{
          current: nickname.length,
          max: VALIDATION_CONSTANTS.MAX_LENGTHS.NICKNAME,
        }}
      >
        <div className="flex gap-2">
          <Input
            value={nickname}
            onChange={(e) => onNicknameChange(e.target.value)}
            maxLength={VALIDATION_CONSTANTS.MAX_LENGTHS.NICKNAME}
            placeholder="닉네임을 입력해주세요"
            className={FORM_STYLES.input.base + ' ' + FORM_STYLES.input.focus + ' flex-1'}
          />
          <button
            type="button"
            className={FORM_STYLES.button.pinkOutline + ' h-12 min-w-[120px] rounded-lg'}
            onClick={onNicknameCheck}
          >
            중복 확인
          </button>
        </div>
      </FormField>

      {/* 성별 */}
      <FormField label="성별" required>
        <div className="flex gap-2">
          {genderOptions.map((opt) => (
            <SelectableButton
              key={opt.value}
              value={opt.value}
              label={opt.label}
              isSelected={gender === opt.value}
              onClick={() => onGenderChange(opt.value)}
              className="min-w-0 flex-1"
            />
          ))}
        </div>
      </FormField>

      {/* 생년월일 */}
      <FormField label="생년월일" required>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={
                FORM_STYLES.input.base + ' flex w-full items-center justify-between font-normal'
              }
            >
              {birth ? (
                format(birth, 'yyyy-MM-dd')
              ) : (
                <span className="text-text-300">생년월일 선택</span>
              )}
              <CalendarIcon className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={birth}
              onSelect={onBirthChange}
              captionLayout="dropdown"
              disabled={(date) =>
                date > new Date() || date < new Date(`${VALIDATION_CONSTANTS.BIRTH.MIN_YEAR}-01-01`)
              }
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </FormField>

      {/* 휴대폰 번호 */}
      <FormField
        label="휴대폰 번호"
        helperText="하이픈(-)을 제외하고 숫자만 입력해주세요"
        characterCount={{
          current: phone.length,
          max: VALIDATION_CONSTANTS.PHONE.MAX_LENGTH,
        }}
      >
        <Input
          type="tel"
          value={formatPhoneNumber(phone)}
          onChange={(e) => onPhoneChange(e.target.value)}
          placeholder="010-1234-5678"
          className={FORM_STYLES.input.base + ' ' + FORM_STYLES.input.focus}
          maxLength={VALIDATION_CONSTANTS.PHONE.FORMATTED_MAX_LENGTH}
        />
      </FormField>

      {/* 약관 동의 */}
      <div className="mt-6 space-y-3">
        <label className={FORM_STYLES.checkbox.container}>
          <input
            type="checkbox"
            checked={agreements.marketing}
            onChange={(e) => onAgreementChange('marketing', e.target.checked)}
            className={FORM_STYLES.checkbox.base}
          />
          <span className={FORM_STYLES.checkbox.label}>마케팅 정보 수신에 동의합니다 (선택)</span>
        </label>
        <label className={FORM_STYLES.checkbox.container}>
          <input
            type="checkbox"
            checked={agreements.location}
            onChange={(e) => onAgreementChange('location', e.target.checked)}
            className={FORM_STYLES.checkbox.base}
          />
          <span className={FORM_STYLES.checkbox.label}>
            위치 기반 서비스 이용약관에 동의합니다 (선택)
          </span>
        </label>
      </div>
    </>
  );
}
