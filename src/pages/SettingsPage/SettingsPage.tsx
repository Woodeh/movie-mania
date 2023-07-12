import { FC, useState } from "react";
import { TypographyText } from "../../components/common/Typography/Typography";
import { Input } from "../../components/common/Input/Input";
import { Button } from "../../components/common/Button/Button";
import "./SettingsPage.scss";

interface ISettings {}

export const Settings: FC<ISettings> = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassowrd] = useState("");

  const handleChangeName = (newValue: string) => {
    setUserName(newValue);
  };

  const handleChangeEmail = (newValue: string) => {
    setEmail(newValue);
  };

  const handleChangePassword = (newValue: string) => {
    setPassword(newValue);
  };

  const handleChangeNewPassword = (newValue: string) => {
    setNewPassword(newValue);
  };

  const handleChangeConfirmPassword = (newValue: string) => {
    setConfirmPassowrd(newValue);
  };

  return (
    <>
      <div className="settings">
        <TypographyText content="Profile" type="H2" />
        <form className="settings__form-profile">
          <Input
            title="Name"
            value={username}
            handleChange={handleChangeName}
            placeholder="Enter your Name"
          />
          <Input
            title="Email"
            value={email}
            handleChange={handleChangeEmail}
            placeholder="Enter your Email"
          />
        </form>
        <TypographyText content="Password" type="H2" />
        <form className="settings__form-password">
          <Input
            title="Password"
            value={password}
            handleChange={handleChangePassword}
            placeholder="Enter your password"
          />
          <Input
            title="New Password"
            value={newPassword}
            handleChange={handleChangeNewPassword}
            placeholder="Enter your new password"
          />
          <Input
            title="Confirm password"
            value={confirmPassword}
            handleChange={handleChangeConfirmPassword}
            placeholder="Confirm your new password"
          />
        </form>
        <div className="settings_btn">
          <Button
            content="Save"
            type="primary"
            onClick={() => console.log(1)}
          />
          <Button
            content="Cancel"
            type="secondary2"
            onClick={() => console.log(1)}
          />
        </div>
      </div>
    </>
  );
};
