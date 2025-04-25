import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from "../ui/button"

import VideoImage from "@/assets/videocover.png"
import LogoImage from "@/assets/Logo.png"
import ProgressBar from "./ProgressBar"
import { Play } from "lucide-react"

export default function DesktopSidebar({ setShowSteps, activeStep }: { setShowSteps: (showSteps: boolean) => void, activeStep: number }) {
    return (
        <Dialog>
            <DialogContent className="aspect-video min-w-2/3 bg-black/90 rounded-2xl border border-gray-800 text-grey-light">
                <DialogHeader>
                    <DialogTitle>Video</DialogTitle>
                    <DialogDescription className="flex items-center justify-center p-4">
                        <div style={{ left: 0, width: '100%', height: 0, position: 'relative', paddingBottom: '56.25%' }}>
                            <iframe
                                src="https://www.youtube.com/embed/q3lX2p_Uy9I?rel=0"
                                style={{ top: 0, left: 0, width: '100%', height: '100%', position: 'absolute', border: 0 }}
                                allowFullScreen
                                scrolling="no"
                                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;"
                            >
                            </iframe>
                        </div>
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>


            <div className="hidden sm:flex flex-col min-w-[317px] gap-y-3.5 px-5 sm:h-auto">
                <div className="min-h-[151px] bg-background rounded-md flex items-center justify-center z-10"><img src={LogoImage} alt="Logo" /></div>
                <div className="min-h-[194px] bg-background rounded-md relative overflow-hidden flex items-center justify-center">
                    <img
                        src={VideoImage}
                        alt="Video"
                        className="object-cover absolute inset-0 size-full"
                    />
                    <DialogTrigger className="z-10">
                        <Button className="w-[71px] h-[50px] rounded-lg  flex items-center justify-center z-10">
                            <Play size={24} />
                        </Button>
                    </DialogTrigger>
                </div>
                <ProgressBar activeStep={activeStep} setShowSteps={setShowSteps} />
            </div>
        </Dialog>
    )
}