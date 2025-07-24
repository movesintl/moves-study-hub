
import {
  Home,
  BookOpen,
  Building2,
  MapPin,
  Settings,
  FileText,
  Image,
  Users,
  Mail,
  ClipboardList,
  MessageCircle,
  Layout,
  Target
} from 'lucide-react';

export interface MenuItem {
  name: string;
  href: string;
  icon: any;
  requiredRoles?: string[];
  subItems?: {
    name: string;
    href: string;
  }[];
}

export const menuItems: MenuItem[] = [
  { name: 'Dashboard', href: '/admin', icon: Home },
  { 
    name: 'Courses', 
    href: '/admin/courses', 
    icon: BookOpen,
    requiredRoles: ['admin', 'editor'],
    subItems: [
      { name: 'All Courses', href: '/admin/courses' },
      { name: 'Study Areas', href: '/admin/courses/study-areas' },
      { name: 'Study Levels', href: '/admin/courses/study-levels' }
    ]
  },
  { name: 'Universities', href: '/admin/universities', icon: Building2, requiredRoles: ['admin', 'editor'] },
  { name: 'Destinations', href: '/admin/destinations', icon: MapPin, requiredRoles: ['admin', 'editor'] },
  { name: 'Applications', href: '/admin/applications', icon: ClipboardList },
  { name: 'Counselling', href: '/admin/counselling', icon: MessageCircle },
  { name: 'Services', href: '/admin/services', icon: Settings, requiredRoles: ['admin', 'editor'] },
  { 
    name: 'Blogs', 
    href: '/admin/blogs', 
    icon: FileText,
    requiredRoles: ['admin', 'editor'],
    subItems: [
      { name: 'All Blogs', href: '/admin/blogs' },
      { name: 'Categories', href: '/admin/blogs/categories' }
    ]
  },
  { name: 'Pages', href: '/admin/pages', icon: Layout, requiredRoles: ['admin', 'editor'] },
  { name: 'Media Library', href: '/admin/media', icon: Image, requiredRoles: ['admin', 'editor'] },
  { name: 'Marketing', href: '/admin/marketing', icon: Target },
  { name: 'All Users', href: '/admin/users', icon: Users, requiredRoles: ['admin'] },
  { name: 'Team', href: '/admin/team', icon: Users, requiredRoles: ['admin'] },
  { name: 'Contact', href: '/admin/contact', icon: Mail }
];
