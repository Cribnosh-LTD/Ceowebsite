import HomeClient from "./HomeClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Doyle Omachonu | CEO of Cribnosh",
    description: "Visionary FoodTech leader and CEO of Cribnosh. Empowering the hidden economy of food creators in the UK through data, logistics, and community.",
};

export default function Home() {
    return <HomeClient />;
}
