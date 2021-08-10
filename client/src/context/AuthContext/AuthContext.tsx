import {
  createContext, FC, useEffect, useReducer,
} from 'react';
import jwtDecode from 'jwt-decode';
import { User } from '../../types';
import HTTP from '../../hooks/HTTP';

export interface AuthState {
    user?: User | null,
    isInitialized?: boolean,
    isAuthenticated?: boolean
}

export interface JWTPayload {
  _id: string,
  iat: number,
  exp: number
}

export interface AuthAction {
  type: 'INITIALIZE' | 'LOGIN'| 'LOGOUT' | 'REGISTER',
  payload?: AuthState
}

const initialState: AuthState = {
  user: null,
  isInitialized: false,
  isAuthenticated: false,
};

const isValidToken = (accessToken: string | null) => {
  if (!accessToken) {
    return false;
  }

  const decoded = jwtDecode(accessToken) as JWTPayload;
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = (accessToken: string | null) => {
  if (accessToken) {
    localStorage.setItem('accessToken', accessToken);
    HTTP.defaults.headers.Authorization = `Bearer ${accessToken}`;
  } else {
    localStorage.removeItem('accessToken');
    delete HTTP.defaults.headers.Authorization;
    console.log(HTTP.defaults);
  }
};

const reducer = (state: AuthState, action: AuthAction) => {
  switch (action.type) {
    case 'INITIALIZE': {
      const { isAuthenticated, user } = action.payload!;
      return {
        ...state,
        isAuthenticated,
        isInitialized: true,
        user,
      };
    }
    case 'LOGIN': {
      const { user } = action.payload!;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    }
    case 'REGISTER': {
      const { user } = action.payload!;

      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  // eslint-disable-next-line no-unused-vars
  login: (email: string, password: string): Promise<{ success: boolean;}> => (
    Promise.resolve({ success: true })),
  logout: () => { },
  // eslint-disable-next-line no-unused-vars
  register: (email: string, password: string): Promise<{ success: boolean;}> => (
    Promise.resolve({ success: true })),
});

export const AuthProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const login = async (email: string, password: string): Promise<{success: boolean}> => {
    try {
      const response = await HTTP.post('/auth/login', { email, password });
      const { token, user } = response.data;
      setSession(token);
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
        },
      });
      return { success: true };
    } catch (error) {
      return error;
    }
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  const register = async (email:string, password: string): Promise<{success: boolean}> => {
    try {
      const response = await HTTP.post('/auth/register', {
        email,
        password,
      });
      const { token, user } = response.data;
      setSession(token);
      dispatch({
        type: 'REGISTER',
        payload: {
          user,
        },
      });
      return { success: true };
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    const initialize: any = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');
        if (!isValidToken(accessToken)) throw new Error('Access token was not found');
        setSession(accessToken);
        const response = await HTTP.get('/auth');
        const user = response.data;
        return dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: true,
            user,
          },
        });
      } catch (err) {
        const response = await HTTP.post('/auth/refresh-token');
        const { token } = response.data;
        if (token) {
          setSession(token);
          return initialize();
        }
        return dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    };

    initialize();
  }, []);

  if (!state.isInitialized) {
    return <h1>Loading</h1>;
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
