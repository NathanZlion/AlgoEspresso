import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";



export default function AlgoEspressoLogo(
) {
    return (
        <Avatar>
            <AvatarImage src="/logo.png" alt="A" />
            <AvatarFallback>A</AvatarFallback>
        </Avatar>
    );
}