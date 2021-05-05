import React, { useState, useContext } from "react";
import { UserContext } from "../context/user";

//strapi function
import loginUser from "../strapi/loginUser";
import registerUser from "../strapi/registerUser";

// handle user
import { useHistory } from "react-router-dom";

export default function Login() {
  const history = useHistory();

  const { userLogin, alert, showAlert } = useContext(UserContext);

  /* setupUser Context */

  /* state values */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("default");
  const [isMember, setIsMember] = useState(true);

  let isEmpty = !email || !password || !username || alert.show;

  const toggleMember = () => {
    setIsMember((prevMember) => {
      let isMember = !prevMember;
      isMember ? setUsername("default") : setUsername("");
      return isMember;
    });
  };
  const handleSubmit = async (e) => {
    // quitar el submit mientras hace el request al BE
    showAlert({
      msg: "accesing user data. please wait..",
    });

    e.preventDefault();
    let response;
    if (isMember) {
      response = await loginUser({ email, password });
    } else {
      response = await registerUser({ email, password, username });
    }
    if (response) {
      const {
        jwt: token,
        user: { username },
      } = response.data;

      const newUser = { token, username };
      userLogin(newUser);
      showAlert({
        msg: `you are logged in ${username} shop away my fiend`,
      });
      history.push("/products");
    } else {
      //show alert

      showAlert({
        msg: `there was an error. please try again`,
        type: "danger",
      });
    }
  };

  return (
    <section className="form section">
      <h2 className="section-title">{isMember ? "sign in" : "register"}</h2>
      <form action="" className="login-form">
        <div className="form-control">
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="@email.com"
          />
        </div>

        <div className="form-control">
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {!isMember && (
          <div className="form-control">
            <label htmlFor="username">username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}
        {/* empty form text  */}

        {isEmpty && (
          <p className="form-empty">please fill out all form fields</p>
        )}
        {!isEmpty && (
          <button
            type="submit"
            className="btn btn-block btn-primary"
            onClick={handleSubmit}
          >
            submit
          </button>
        )}

        {/* registry link */}
        <p className="register-link">
          {isMember ? "need to regiser" : "already a member"}
          <button type="button" onClick={toggleMember}>
            click here
          </button>
        </p>
      </form>
    </section>
  );
}
