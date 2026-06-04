"use client";

import SceneCinematicOverlay from "@/components/SceneCinematicOverlay";
import Scene01DivineOpening from "@/components/scenes/Scene01DivineOpening";
import Scene02GaneshBlessings from "@/components/scenes/Scene02GaneshBlessings";
import Scene03FamilyInvitation from "@/components/scenes/Scene03FamilyInvitation";
import Scene04CoupleReveal from "@/components/scenes/Scene04CoupleReveal";
import Scene05SaveTheDate from "@/components/scenes/Scene05SaveTheDate";
import Scene06OurStory from "@/components/scenes/Scene06OurStory";
import Scene07Mehendi from "@/components/scenes/Scene07Mehendi";
import Scene08Haldi from "@/components/scenes/Scene08Haldi";
import Scene09Sangeet from "@/components/scenes/Scene09Sangeet";
import Scene10Engagement from "@/components/scenes/Scene10Engagement";
import Scene11Baraat from "@/components/scenes/Scene11Baraat";
import Scene12GrandWedding from "@/components/scenes/Scene12GrandWedding";
import Scene13Reception from "@/components/scenes/Scene13Reception";
import Scene14Gallery from "@/components/scenes/Scene14Gallery";
import Scene15Family from "@/components/scenes/Scene15Family";
import Scene16Venue from "@/components/scenes/Scene16Venue";
import Scene16aCountdown from "@/components/scenes/Scene16aCountdown";
import Scene17RSVP from "@/components/scenes/Scene17RSVP";
import Scene18Finale from "@/components/scenes/Scene18Finale";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <SmoothScroll>
        <main className="w-full bg-[var(--dark-bg)] min-h-screen">
        <SceneCinematicOverlay />
        <Scene01DivineOpening />
        <Scene02GaneshBlessings />
        <Scene03FamilyInvitation />
        <Scene04CoupleReveal />
        <Scene05SaveTheDate />
        <Scene06OurStory />
        <Scene07Mehendi />
        <Scene08Haldi />
        <Scene09Sangeet />
        <Scene10Engagement />
        <Scene11Baraat />
        <Scene12GrandWedding />
        <Scene13Reception />
        <Scene14Gallery />
        <Scene15Family />
        <Scene16Venue />
        <Scene16aCountdown />
        <Scene17RSVP />
        <Scene18Finale />
      </main>
    </SmoothScroll>
    </>
  );
}
