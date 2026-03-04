import PiecesClient from "./PiecesClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Pieces & Mentions",
    description: "A collection of articles and pieces written by and about Doyle Omachonu, focusing on FoodTech and supporting the economy of food creators.",
};

export default function PiecesPage() {
    return <PiecesClient />;
}
