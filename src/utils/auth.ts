export const REDIRECT_PATH = "/auth/callback";

export const getToken = () => {
  return localStorage.getItem("access_token");
};

export const signIn = () => {
  window.location.replace("/oauth/authorize");
};

export const isSignedIn = () => {
  const access_token = localStorage.getItem("access_token");
  if (!access_token) {
    return false;
  }

  // const expiration_string = localStorage.getItem("token_expiration");

  // if (
  //   !expiration_string ||
  //   parseInt(expiration_string) < Date.now() / 1000 - 5
  // ) {
  //   return false;
  // }

  return true;
};

export const handle_callback = async () => {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const state = params.get("state");

  const response = await fetch(
    `/oauth/access_token?code=${code}&state=${state}`,
    {
      method: "POST",
    }
  );

  const data = await response.json();
  localStorage.setItem("access_token", data.accessToken);
  // localStorage.setItem("token_expiration", data.expires_at.toString());
  // localStorage.setItem("refresh_token", data.refresh_token);

  window.location.replace(window.location.origin);
};

export const signOut = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("token_expiration");
  localStorage.removeItem("refresh_token");

  window.location.replace(window.location.origin);
};
