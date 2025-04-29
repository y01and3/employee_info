import ProfileRender from "./components/ProfileRender";
import { defaultProfile } from "./hooks/profileContext";

function App() {
  return (
    <div>
      <ProfileRender profile={defaultProfile} />
    </div>
  );
}

export default App;
