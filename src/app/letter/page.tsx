import LetterClient from "./LetterClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "The CEO's Letter",
    description: "An open invitation from Doyle Omachonu, CEO of Cribnosh, to the UK's hidden culinary creators. Redefining food delivery together.",
};

export default function LetterPage() {
    return <LetterClient />;
}
