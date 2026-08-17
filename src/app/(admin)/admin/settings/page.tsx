import { prisma } from "@/lib/prisma";
import SettingsClient from "./SettingsClient";

export default async function AdminSettingsPage() {
  const settings = await prisma.websiteSettings.findFirst();
  return <SettingsClient settings={settings} />;
}
