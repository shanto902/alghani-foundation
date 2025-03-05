import * as LucideIcons from "lucide-react";

export const DynamicIcon = ({
  iconName,
  size = 32,
  color = "black",
}: {
  iconName: string;
  size?: number;
  color?: string;
}) => {
  const sanitizedIconName = iconName.replace(/[<>/]/g, "").trim();
  const IconComponent =
    (LucideIcons as any)[sanitizedIconName] || LucideIcons.HelpCircle;
  return <IconComponent size={size} color={color} />;
};
