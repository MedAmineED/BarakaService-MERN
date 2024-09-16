import React, { useState } from 'react';
import './style.css'
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [login, setLogin] = useState<string>('admin');
  const [password, setPassword] = useState<string>('0000');

  const navigate = useNavigate();

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Login:', login);
    console.log('Password:', password);
  };

  return (
    <fieldset id="iIndex">
      <form action="index.php" method="POST" onSubmit={handleSubmit}>
        <table id="iTableIdent" border={0} cellPadding="0" width="100%">
          <tbody>
            <tr>
              <td colSpan={2} align="left">
                <img src="Img/AlBarakaServices1.png" width="150" height="40" alt="Logo" />
              </td>
            </tr>
            <tr>
              <td colSpan={2} align="left">
                <hr />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="iLogun">Login</label></td>
              <td>
                <input
                  type="text"
                  name="nLogin"
                  className="cLogin"
                  size={15}
                  id="iLogun"
                  value={login}
                  onChange={handleLoginChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td><label htmlFor="iPwd">Password</label></td>
              <td>
                <input
                  type="password"
                  name="nPwd"
                  className="cPwd"
                  size={15}
                  id="iPwd"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td colSpan={2} align="center">
                <input
                  type="submit"
                  id="iSubmit"
                  value="Entrer"
                  onClick={()=>{navigate("/baraka") }}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </fieldset>
  );
};

export default LoginForm;
