import { FC, useEffect, useState } from "react";
import { TypographyText } from "../../components/common/Typography/Typography";
import { Button } from "../../components/common/Button/Button";
import { Breadcrumbs } from "../SignInPage/breadcrumbs/Breadcrumbs";
import { createBackToHomePath } from "../../utils/constants/createBackToHomePath";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "../../components/common/Spinner/Spinner";
import { postActivate } from "../../utils/api/postActivate";
import "./ActivatePage.scss";

export const ActivatePage: FC = () => {
  const { uid, token } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [isActivate, setIsActivate] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    setIsError(false);
    if (uid && token) {
      postActivate({ uid, token })
        .then(() => setIsActivate(true))
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    }
  }, [token, uid]);

  const navigate = useNavigate();

  const handleClickToHome = () => {
    navigate("/posts");
  };

  const handleClickRefresh = () => {
    window.location.reload();
  };

  return (
    <>
      {isActivate && (
        <div className="activate-page">
          <Breadcrumbs path={[createBackToHomePath]} />
          <TypographyText content="Success" type="H1" />
          <div className="activate-page__content">
            <div>
              <p className="activate-page__text">Email confirmed.</p>
              <p className="activate-page__text">
                Your registration is now completed
              </p>
            </div>
            <Button
              content="Go to home"
              onClick={handleClickToHome}
              type="primary"
            />
          </div>
        </div>
      )}
      {isLoading && <Spinner />}
      {isError && (
        <div className="activate-page">
          <Breadcrumbs path={[createBackToHomePath]} />
          <TypographyText content="Activation failed" type="H1" />
          <div className="activate-page__content">
            <p className="activate-page__text">
              Ooops... an unknown error occurred
            </p>
            <div className="activate-page__btns">
              <Button
                content="Go to home"
                onClick={handleClickToHome}
                type="primary"
              />
              <Button
                content="Try again"
                onClick={handleClickRefresh}
                type="secondary"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
