// src/pages/Landing.tsx

import "./Landing.css";
import { useAuth0 } from "@auth0/auth0-react";

export default function Landing() {
  const { loginWithRedirect, isLoading } = useAuth0();

  return (
    <div className="landing-container">
      <section className="landing-hero">
        <div className="landing-content">
          <h1>Task Management App</h1>
          <p>
            A calm, intentional space to organize your tasks, energy, and focus.
          </p>

          <button
            type="button"
            disabled={isLoading}
            onClick={() =>
              loginWithRedirect({
                appState: { returnTo: "/dashboard" },
                authorizationParams: {
                  redirect_uri: `${window.location.origin}/callback`,
                },
              })
            }
          >
            {isLoading ? "Loading..." : "Get Started"}
          </button>
        </div>
      </section>
    </div>
  );
}
