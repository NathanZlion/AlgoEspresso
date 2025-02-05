import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


export default function AlgoEspressoLogo() {
    return (
        <Avatar>
            <AvatarImage src="https://ik.imagekit.io/algoespresso/algo_espressologo.png?updatedAt=1738682084835" alt="A" />
            <AvatarFallback>A</AvatarFallback>
        </Avatar>
    );
}