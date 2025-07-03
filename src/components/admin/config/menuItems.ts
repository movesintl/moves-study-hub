
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
    subItems: [
      { name: 'All Courses', href: '/admin/courses' },
      { name: 'Study Areas', href: '/admin/courses/study-areas' },
      { name: 'Study Levels', href: '/admin/courses/study-levels' }
    ]
  },
  { name: 'Universities', href: '/admin/universities', icon: Building2 },
  { name: 'Destinations', href: '/admin/destinations', icon: MapPin },
  { name: 'Applications', href: '/admin/applications', icon: ClipboardList },
  { name: 'Counselling', href: '/admin/counselling', icon: MessageCircle },
  { name: 'Services', href: '/admin/services', icon: Settings },
  { 
    name: 'Blogs', 
    href: '/admin/blogs', 
    icon: FileText,
    subItems: [
      { name: 'All Blogs', href: '/admin/blogs' },
      { name: 'Categories', href: '/admin/blogs/categories' }
    ]
  },
  { name: 'Pages', href: '/admin/pages', icon: Layout },
  { name: 'Media Library', href: '/admin/media', icon: Image },
  { name: 'Marketing', href: '/admin/marketing', icon: Target },
  { name: 'Team', href: '/admin/team', icon: Users },
  { name: 'Contact', href: '/admin/contact', icon: Mail }
];
