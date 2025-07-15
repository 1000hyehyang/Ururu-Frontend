import api from '@/lib/axios';

export interface UpdateProfileRequest {
  nickname: string;
  gender: string;
  birth: string;
  phone: string;
}

export interface ProfileResponse {
  member_id: number;
  email: string;
  nickname: string;
  profile_image: string | null;
  user_type: 'MEMBER' | 'SELLER';
  member_name: string;
  points: number;
  skin_type: string;
  skin_tone: string;
  gender?: string;
  birth?: string;
  phone?: string;
}

export interface ShippingAddressRequest {
  label: string;
  phone: string;
  zonecode: string;
  address1: string;
  address2: string;
  isDefault: boolean;
}

export async function checkNicknameDuplicate(nickname: string): Promise<boolean> {
  // 한국어 닉네임을 고려하여 URL 인코딩
  const encodedNickname = encodeURIComponent(nickname);
  const response = await api.get(`/members/nicknames/${encodedNickname}/exists`);
  // exists: true면 중복, false면 사용 가능
  return response.data.data.exists;
}

export async function updateProfile(data: UpdateProfileRequest) {
  const response = await api.patch('/members/me', data);
  return response.data;
}

export async function getProfile() {
  const response = await api.get('/members/me');
  return response.data.data;
}

export async function getShippingAddresses() {
  const response = await api.get('/members/shipping-addresses');
  return response.data.data;
}

export async function postShippingAddress(data: ShippingAddressRequest) {
  const response = await api.post('/members/shipping-addresses', {
    label: data.label,
    phone: data.phone,
    zonecode: data.zonecode,
    address1: data.address1,
    address2: data.address2,
    isDefault: data.isDefault,
  });
  return response.data.data;
}

export async function getShippingAddressById(addressId: number) {
  const response = await api.get(`/members/shipping-addresses/${addressId}`);
  return response.data.data;
}

export async function putShippingAddress(addressId: number, data: ShippingAddressRequest) {
  const response = await api.put(`/members/shipping-addresses/${addressId}`, {
    label: data.label,
    phone: data.phone,
    zonecode: data.zonecode,
    address1: data.address1,
    address2: data.address2,
    isDefault: data.isDefault,
  });
  return response.data.data;
}

export async function deleteShippingAddress(addressId: number) {
  const response = await api.delete(`/members/shipping-addresses/${addressId}`);
  return response.data.data;
}

export async function deleteMe() {
  const response = await api.delete('/members/me');
  return response.data.data;
}
