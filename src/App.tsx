import { PageTemplate } from "./components/Layouts/PageTemplate/PageTemplate";
import { Router } from "./routes/Router";
import GoogleFontLoader from "react-google-font-loader";
import "./App.css";
import { SplashScreen} from "./components/Layouts/SplashScreen/SplashScreen"

export const App = () => {
  return (
    <PageTemplate>
      <GoogleFontLoader
        fonts={[
          {
            font: "Roboto",
            weights: [400, "400i"],
          },
          {
            font: "Roboto Mono",
            weights: [400, 700],
          },
        ]}
        subsets={["cyrillic-ext", "greek"]}
      />
      <Router />
      <SplashScreen />
      
    </PageTemplate>
  );
};
