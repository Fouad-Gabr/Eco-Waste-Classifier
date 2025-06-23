import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../lib/axios';

export const useClassification = () => {
  const { data: results, refetch: refetchResults } = useQuery({
    queryKey: ['results'],
    queryFn: async () => {
      const response = await api.get('/results/');
      return response.data;
    },
    enabled: false, // Don't auto-fetch
  });

  const { data: classCounts, refetch: refetchClassCounts } = useQuery({
    queryKey: ['class_counts'],
    queryFn: async () => {
      const response = await api.get('/class_counts/');
      return response.data;
    },
    enabled: false, // Don't auto-fetch
  });

  const stopCamera = useMutation({
    mutationFn: async () => {
      const response = await api.post('/stop/');
      return response.data;
    },
  });

  const fetchClassCounts = async () => {
    try {
      const { data } = await refetchClassCounts();
      return data;
    } catch (error) {
      console.error('Error fetching class counts:', error);
      throw error;
    }
  };

  return {
    results,
    classCounts,
    stopCamera,
    fetchClassCounts,
    refetchResults,
    refetchClassCounts,
  };
};