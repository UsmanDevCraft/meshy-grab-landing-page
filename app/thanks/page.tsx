import type { Metadata } from "next";
import ThanksClient from "./ThanksClient";

export const metadata: Metadata = {
  title: "Subscription Confirmation",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThanksPage() {
  return <ThanksClient />;
}
