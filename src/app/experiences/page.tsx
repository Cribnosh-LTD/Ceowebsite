import ExperienceClient from "./ExperienceClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Professional Trajectory",
    description: "The career journey of Doyle Omachonu. From operations and supply chain optimization to becoming a FoodTech visionary and CEO.",
};

export default function ExperiencesPage() {
    return <ExperienceClient />;
}
