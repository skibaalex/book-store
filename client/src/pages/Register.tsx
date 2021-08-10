import { FC, FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import validator from 'validator';
import useAuth from '../hooks/useAuth';

export interface RegisterProps {

}

interface Form {
    email: string,
    password: string
}

const validateForm = ({ email, password }: Form) => {
  const emailValid = validator.isEmail(email);
  const passwordValid = Boolean(password.length && password.length < 15);
  return { email: !emailValid, password: !passwordValid };
};

const Login: FC<RegisterProps> = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: false, password: false });
  const { register } = useAuth();
  const history = useHistory();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const valid = validateForm({ email, password });
    if (valid.email || valid.password) { return setErrors(valid); }
    const { success } = await register(email, password);
    if (success) { return history.push('/'); }
    return undefined;
  };

  return (
    <div className="container login-form">
      <h2>Register Form</h2>
      <div className="row">
        <div className="form-wrap">
          <form onSubmit={handleSubmit}>
            <label htmlFor="emailAddress">
              Email Address
              <input id="emailAddress" name="emailAddress" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              { errors.password
        && (
        <div className="validation-errors">
          Please provide a valid email
        </div>
        )}
            </label>
            <label htmlFor="password">
              Password
              <input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            { errors.password
        && (
        <div className="validation-errors">
          Password must be between 8 to 15 characters
        </div>
        )}
            <div className="buttons">
              <button className="btn" type="submit">Sign In</button>
              <button type="button" className="btn btn-secondary" onClick={() => history.push('/')}>Cancel</button>
            </div>
          </form>
          <p>
            {'Already have an account? '}
            <Link to="/login" href="sign-up.html">sign in</Link>
            !
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
