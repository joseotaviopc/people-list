import { ChildIcon, CoupleIcon, PersonIcon } from "@/assets";
import { FormType } from "./types";

const personSteps = [
    {
        icon: () => <PersonIcon />,
        label: "Pessoal",
        type: FormType.PERSONAL
    },
    {
        icon: () => <CoupleIcon />,
        label: "Cônjugue",
        type: FormType.COUPLE
    },
    {
        icon: () => <ChildIcon />,
        label: "Filho(a)s",
        type: FormType.CHILD
    }
]

export { personSteps }