import { useState, useEffect } from 'react';
import { getShippingAddresses } from '@/services/memberService';
import { ShippingAddress } from '@/types/api';

export function useAddressList() {
  const [addresses, setAddresses] = useState<ShippingAddress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAddresses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getShippingAddresses();
      setAddresses(data.addresses);
    } catch (err: any) {
      console.error('배송지 조회 오류:', err);
      setError('배송지 조회 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return {
    addresses,
    loading,
    error,
    refetch: fetchAddresses,
  };
}
