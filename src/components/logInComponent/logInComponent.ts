import indexStyle from "./logInComponent.css";

export enum Attribute {
  "user" = "user",
}

class LoginForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  private render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = `
        <style>
          ${indexStyle}
        </style>

        <h1 class="title">Login</h1>

        <form id="login-form">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter your email" required><br><br>

          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter your password" required><br><br>
        </form>
      `;
    }

    // Lógica para referenciar elementos del formulario y agregar el evento al botón
    const loginForm = this.shadowRoot?.getElementById(
      "login-form"
    ) as HTMLFormElement | null;
    const emailInput = this.shadowRoot?.getElementById(
      "email"
    ) as HTMLInputElement | null;
    const passwordInput = this.shadowRoot?.getElementById(
      "password"
    ) as HTMLInputElement | null;

    if (loginForm && emailInput && passwordInput) {
      // Agrega aquí la lógica para el inicio de sesión utilizando email y password
      console.log(
        "Inicio de sesión con",
        emailInput.value,
        passwordInput.value
      );
    }
  }

  getEmailInput(): HTMLInputElement | null {
    return this.shadowRoot?.getElementById("email") as HTMLInputElement | null;
  }

  getPasswordInput(): HTMLInputElement | null {
    return this.shadowRoot?.getElementById(
      "password"
    ) as HTMLInputElement | null;
  }
}

customElements.define("login-form", LoginForm);
export default LoginForm;
