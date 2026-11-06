import { useEffect } from "react";
import { config } from "./config";
import { useLanyard } from "./hooks/useLanyard";
import { useBadges } from "./hooks/useProfile";
import { useRoute } from "./hooks/useRoute";
import { flagBadges } from "./lib/badges";
import { Nav } from "./components/Nav";
import LineWaves from "./components/LineWaves";
import { Home } from "./pages/Home";
import { Music } from "./pages/Music";
import { Projects } from "./pages/Projects";
import { Social } from "./pages/Social";

export default function App() {
  const route = useRoute();
  const { data, state } = useLanyard(config.discordId);
  const profileBadges = useBadges(config.discordId);
  const badges = profileBadges.length
    ? profileBadges
    : flagBadges(data?.discord_user.public_flags ?? 0);

  // kept here (not in Home) so the status theme stays on every page
  useEffect(() => {
    document.documentElement.dataset.status = data?.discord_status ?? "offline";
  }, [data?.discord_status]);

  return (
    <>
      <LineWaves
        style={{ position: "fixed", inset: 0, zIndex: -1, pointerEvents: "none" }}
        color1="#ffffff"
        color2="#ffffff"
        color3="#ffffff"
        speed={0.55}
        lineCount={160}
        lineWidth={1.3}
        highlight={1}
        warpIntensity={1.6}
        rotation={-33}
        enableMouseInteraction={true}
        warpScale={0.8}
      />
      <Nav route={route} />
      {route === "music" ? (
        <Music />
      ) : route === "projects" ? (
        <Projects />
      ) : route === "social" ? (
        <Social />
      ) : (
        <Home data={data} state={state} badges={badges} />
      )}
    </>
  );
}
