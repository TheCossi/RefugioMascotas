import { Outlet } from "react-router-dom";
import Header from "./Header";

export default function Layout({ theme, user }) {
  return (
    <div style={{ minHeight: "100vh", background: theme.bg, color: theme.text }}>
      <Header theme={theme} user={user} />
      <main>
        <Outlet />
      </main>
    </div>
  );
}
