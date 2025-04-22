import { LogoSection } from "./LogoSection";
import { VideoSection } from "./VideoSection";
import { StageTracker } from "./StageTracker";
import { ProgressBar } from "./ProgressBar";

export function SidePanel() {
  return (
    <aside className="relative grow shrink p-5 rounded-2xl border border-solid bg-black bg-opacity-30 border-white border-opacity-20 min-w-60 w-[254px]">
      <LogoSection />
      <VideoSection />
      <StageTracker />
      <ProgressBar />
      <div className="flex absolute right-7 z-0 flex-col bottom-[141px] h-[311px] w-[5px]">
        <div className="flex relative z-10 flex-col pb-40 -mb-2.5 w-full bg-blend-normal aspect-[0.016] max-md:pb-24 max-md:mb-2.5">
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/b4125defa82ed6a7af096f90ad3e0cdb2f8b0dc6?placeholderIfAbsent=true"
            alt="Scroll background"
            className="object-cover absolute inset-0 size-full"
          />
          <img
            src="https://cdn.builder.io/api/v1/image/assets/a957b64922e04ac2a23d8b53cd42fbd2/e31dff8415ef264b3a62dd1db7dd9e0ac5b23276?placeholderIfAbsent=true"
            alt="Scroll handle"
            className="object-contain mb-0 w-full aspect-[0.03] max-md:mb-2.5"
          />
        </div>
      </div>
    </aside>
  );
}
