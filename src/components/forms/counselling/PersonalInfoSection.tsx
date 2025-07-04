import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Phone, Mail, User } from "lucide-react";

interface PersonalInfoSectionProps {
  formData: {
    student_name: string;
    student_email: string;
    student_phone: string;
  };
  onInputChange: (field: string, value: string) => void;
}

export const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({
  formData,
  onInputChange,
}) => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Input
            id="first_name"
            value={formData.student_name.split(" ")[0] || ""}
            onChange={(e) => {
              const lastName = formData.student_name
                .split(" ")
                .slice(1)
                .join(" ");
              onInputChange(
                "student_name",
                `${e.target.value} ${lastName}`.trim()
              );
            }}
            required
            className="h-10 border-gray-200 focus:border-primary focus:ring-primary rounded-lg"
            placeholder="First Name *"
          />
        </div>
        <div className="space-y-1.5">
          <Input
            id="last_name"
            value={formData.student_name.split(" ").slice(1).join(" ") || ""}
            onChange={(e) => {
              const firstName = formData.student_name.split(" ")[0] || "";
              onInputChange(
                "student_name",
                `${firstName} ${e.target.value}`.trim()
              );
            }}
            required
            className="h-10 border-gray-200 focus:border-primary focus:ring-primary rounded-lg"
            placeholder="Last Name *"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 w-full">
        <div className="space-y-1.5 basis-[49%] mr-1">
          <Input
            id="student_email"
            type="email"
            value={formData.student_email}
            onChange={(e) => onInputChange("student_email", e.target.value)}
            required
            className="h-10 border-gray-200 focus:border-primary focus:ring-primary rounded-lg w-full"
            placeholder="Email address *"
          />
        </div>

        <div className="space-y-1.5 flex-1">
          <div className="flex gap-2">
            <div className="w-20">
              <Input
                value="+61 AU"
                readOnly
                className="h-10 border-gray-200 bg-gray-50 text-center rounded-lg font-medium text-xs"
              />
            </div>
            <Input
              id="student_phone"
              type="tel"
              value={formData.student_phone}
              onChange={(e) => onInputChange("student_phone", e.target.value)}
              required
              className="h-10 border-gray-200 focus:border-primary focus:ring-primary rounded-lg flex-1"
              placeholder="Mobile number *"
            />
          </div>
        </div>
      </div>
    </>
  );
};
