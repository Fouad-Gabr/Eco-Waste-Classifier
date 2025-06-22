import { useNavigate } from 'react-router-dom';
import { api } from '../lib/axios';
import { useAuthStore } from '../store/authStore';
import toast from 'react-hot-toast';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  firstName: string;
  lastName: string;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const { user, setAuth, logout: storeLogout } = useAuthStore();

  const login = async (data: LoginData) => {
    try {
      const response = await api.post('/login/', data);
      const token = response.data.access_token;
      localStorage.setItem('token', token);

      // المفروض تجيب بيانات المستخدم الحقيقية من الـ response أو endpoint منفصل
      const userData = {
        id: response.data.user?.id || 0,
        firstName: response.data.user?.firstName || '',
        lastName: response.data.user?.lastName || '',
        email: data.email,
      };

      setAuth(token, userData);
      toast.success('Login successful!');
      navigate('/');
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast.error('Invalid email or password');
      } else if (error.response?.status === 404) {
        toast.error('Account not found');
      } else {
        toast.error('Login failed. Please try again.');
      }
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await api.post('/register/', data);
      const token = response.data.access_token;
      localStorage.setItem('token', token);

      const userData = {
        id: response.data.user?.id || 0,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
      };

      setAuth(token, userData);
      toast.success('Registration successful!');
      navigate('/');
    } catch (error: any) {
      if (error.response?.status === 400) {
        const errorMessage = error.response.data?.detail || 'Registration failed';
        if (errorMessage.includes('email')) {
          toast.error('This email is already in use. Please choose another.');
        } else if (errorMessage.includes('name')) {
          toast.error('This name combination is already taken. Please modify the last name slightly.');
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error('Registration failed. Please try again.');
      }
      throw error;
    }
  };

  const logout = () => {
    storeLogout();
    localStorage.removeItem('token');
    navigate('/');
  };

  return { user, login, register, logout };
};
