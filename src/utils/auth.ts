export const REDIRECT_PATH = "/auth/callback";
const storage = sessionStorage;

export const getToken = () => {
  return storage.getItem("access_token");
};

export const signIn = () => {
  window.location.replace("/oauth/authorize");
};

export const isSignedIn = () => {
  const access_token = storage.getItem("access_token");
  if (!access_token) {
    return false;
  }

  // const expiration_string = storage.getItem("token_expiration");

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
  storage.setItem("access_token", data.accessToken);
  // storage.setItem("token_expiration", data.expires_at.toString());
  // storage.setItem("refresh_token", data.refresh_token);

  window.location.replace(window.location.origin);
};

export const signOut = () => {
  storage.removeItem("access_token");
  storage.removeItem("token_expiration");
  storage.removeItem("refresh_token");

  window.location.replace(window.location.origin);
};
