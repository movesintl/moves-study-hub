import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { User, CheckCircle2, Clock, Send } from 'lucide-react';

interface ProfileHeaderProps {
  progress: number;
  status: string;
}

const statusConfig: Record<string, { label: string; class: string; icon: React.ReactNode }> = {
  invited: { label: 'Invited', class: 'bg-blue-50 text-blue-700 border-blue-200', icon: <Clock className="h-3.5 w-3.5" /> },
  profile_incomplete: { label: 'Profile Incomplete', class: 'bg-amber-50 text-amber-700 border-amber-200', icon: <User className="h-3.5 w-3.5" /> },
  profile_completed: { label: 'Profile Completed', class: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: <CheckCircle2 className="h-3.5 w-3.5" /> },
  application_submitted: { label: 'Application Submitted', class: 'bg-purple-50 text-purple-700 border-purple-200', icon: <Send className="h-3.5 w-3.5" /> },
};

export default function ProfileHeader({ progress, status }: ProfileHeaderProps) {
  const config = statusConfig[status] || statusConfig.invited;

  return (
    <div className="bg-card rounded-2xl shadow-sm border p-6 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Student Profile</h1>
          <p className="text-muted-foreground text-sm mt-1">Complete all sections to submit your application</p>
        </div>
        <Badge variant="outline" className={`${config.class} border flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium`}>
          {config.icon}
          {config.label}
        </Badge>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Profile Completion</span>
          <span className="font-semibold text-foreground">{progress}%</span>
        </div>
        <Progress value={progress} className="h-3 rounded-full" />
      </div>
    </div>
  );
}
