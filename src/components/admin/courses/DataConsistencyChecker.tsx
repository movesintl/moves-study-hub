import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';

export const DataConsistencyChecker = () => {
  const [isChecking, setIsChecking] = useState(false);
  const [issues, setIssues] = useState<any[]>([]);
  const [isFixing, setIsFixing] = useState(false);
  const { toast } = useToast();

  const checkDataConsistency = async () => {
    setIsChecking(true);
    try {
      const { data: courses, error } = await supabase
        .from('courses')
        .select(`
          id, title, study_area, level, country, university,
          study_area_id, study_level_id, destination_id, university_id
        `);

      if (error) throw error;

      const foundIssues = courses?.filter(course => 
        !course.study_area_id || 
        !course.study_level_id || 
        !course.destination_id || 
        !course.university_id
      ) || [];

      setIssues(foundIssues);
      
      toast({
        title: "Data Check Complete",
        description: `Found ${foundIssues.length} courses with missing foreign key references`,
        variant: foundIssues.length > 0 ? "destructive" : "default"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsChecking(false);
    }
  };

  const fixDataConsistency = async () => {
    setIsFixing(true);
    try {
      const { data, error } = await supabase.rpc('sync_course_foreign_keys');
      
      if (error) throw error;

      toast({
        title: "Success",
        description: "Data consistency issues have been resolved",
      });

      // Re-check after fixing
      await checkDataConsistency();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setIsFixing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5" />
          Data Consistency Checker
        </CardTitle>
        <CardDescription>
          Check and fix courses with missing foreign key relationships
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button 
            onClick={checkDataConsistency} 
            disabled={isChecking}
            variant="outline"
          >
            {isChecking && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
            Check Data Consistency
          </Button>
          
          {issues.length > 0 && (
            <Button 
              onClick={fixDataConsistency} 
              disabled={isFixing}
            >
              {isFixing && <RefreshCw className="mr-2 h-4 w-4 animate-spin" />}
              Fix Issues ({issues.length})
            </Button>
          )}
        </div>

        {issues.length > 0 && (
          <div className="space-y-2">
            <h4 className="font-medium text-destructive">
              Courses with Missing References:
            </h4>
            <div className="max-h-40 overflow-y-auto space-y-1">
              {issues.map((course) => (
                <div key={course.id} className="text-sm p-2 bg-muted rounded">
                  <div className="font-medium">{course.title}</div>
                  <div className="text-muted-foreground">
                    Missing: {[
                      !course.study_area_id && 'Study Area ID',
                      !course.study_level_id && 'Study Level ID', 
                      !course.destination_id && 'Destination ID',
                      !course.university_id && 'University ID'
                    ].filter(Boolean).join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {issues.length === 0 && !isChecking && (
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle className="h-4 w-4" />
            All courses have consistent foreign key relationships
          </div>
        )}
      </CardContent>
    </Card>
  );
};