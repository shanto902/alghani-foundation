import { useEffect, useState } from "react";

export const DynamicFaIcon = ({
  iconName,
  size = 32,
  className = "",
}: {
  iconName: string;
  size?: number;
  color?: string;
  className?: string;
}) => {
  const [IconComponent, setIconComponent] = useState<React.ElementType | null>(
    null
  );

  useEffect(() => {
    const loadIcon = async () => {
      try {
        const prefix = iconName.substring(0, 2); // Extract "Fa" from "FaFacebookF"
        const iconModule = await import(`react-icons/fa`);
        setIconComponent(
          () => (iconModule as any)[iconName] || iconModule["FaQuestionCircle"]
        );
      } catch (error) {
        console.error(`Error loading icon: ${iconName}`, error);
        setIconComponent(null);
      }
    };

    loadIcon();
  }, [iconName]);

  if (!IconComponent) return null;

  return <IconComponent size={size} className={className} />;
};
