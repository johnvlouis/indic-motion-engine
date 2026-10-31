import React from "react";
import { Composition } from "remotion";
import { MalayalamExplainer } from "./MalayalamExplainer";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MalayalamExplainerReel"
        component={MalayalamExplainer}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          topicBadge: "AI & PHILOSOPHY · MALLUAPE",
          titleMalayalam: "നമ്മൾ ഒരു Simulation-ൽ ആണോ ജീവിക്കുന്നത്?",
          subtitleEnglish: "The Simulation Hypothesis & Artificial Consciousness",
          nodes: [
            "1. Compute Power Exponential Growth",
            "2. Ancestor Simulations (Bostrom)",
            "3. Digital Consciousness vs Reality",
          ],
          captionText:
            "മനുഷ്യന്റെ ചിന്തകളെ പോലും AI അനുകരിക്കാൻ തുടങ്ങുമ്പോൾ യഥാർത്ഥ ലോകം ഏതാണ്?",
        }}
      />
    </>
  );
};
