import { useQuery, useMutation } from '@tanstack/react-query';
import { api } from '../lib/axios';

export const useClassification = () => {
  const { data: results } = useQuery({
    queryKey: ['results'],
    queryFn: async () => {
      const response = await api.get('/results/');
      return response.data;
    },
  });

  const { data: classCounts } = useQuery({
    queryKey: ['class_counts'],
    queryFn: async () => {
      const response = await api.get('/class_counts/');
      return response.data;
    },
  });

  const stopCamera = useMutation({
    mutationFn: async () => {
      const response = await api.post('/stop/');
      return response.data;
    },
  });

  return {
    results,
    classCounts,
    stopCamera,
  };
};