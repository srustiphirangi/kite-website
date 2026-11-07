import {
  Banknote,
  GraduationCap,
  HeartPulse,
  Home,
  IdCard,
  Plane,
  Send,
  Smartphone,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

const map: Record<string, LucideIcon> = {
  Banknote,
  GraduationCap,
  HeartPulse,
  Home,
  IdCard,
  Plane,
  Send,
  Smartphone,
};

export const serviceIcon = (name: string): LucideIcon => map[name] ?? Sparkles;