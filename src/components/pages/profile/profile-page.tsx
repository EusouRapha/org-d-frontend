"use client";

import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { H1 } from "@/components/ui/typography";
import { CircleUserRound } from "lucide-react";
import React from "react";
import { Toaster } from "sonner";
import { ProfileForm } from "./ui/profile-form";

export default function ProfilePage() {
  const [isEditModeDisabled, setIsEditModeDisabled] = React.useState(true);

  return (
    <div suppressHydrationWarning>
      <Toaster position="top-right" />
      <H1 className="text-org-d-green font-bold text-center pt-8">Perfil</H1>
      <div className="flex flex-col justify-center items-center  mx-auto pt-24">
        <CircleUserRound size={200} strokeWidth={1} color="#00801C" />
        <div className="flex items-center space-x-4">
          <Switch
            id="edit-mode"
            className="border-gray-500 scale-120"
            onCheckedChange={() => setIsEditModeDisabled(!isEditModeDisabled)}
          />
          <Label
            htmlFor="edit-mode"
            className="text-xl text-org-d-green font-bold"
          >
            Modo edição
          </Label>
        </div>
        <ProfileForm isEditModeDisabled={isEditModeDisabled} />
      </div>
    </div>
  );
}
