import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { StudentProfile, calculateProgress, REQUIRED_FIELDS } from './types';

interface ReviewSubmitProps {
  data: StudentProfile;
  onSubmit: () => Promise<void>;
  isLocked: boolean;
  isSubmitting: boolean;
}

export default function ReviewSubmitSection({ data, onSubmit, isLocked, isSubmitting }: ReviewSubmitProps) {
  const [confirmed, setConfirmed] = useState(false);
  const progress = calculateProgress(data);
  const isComplete = progress === 100;

  const missingFields = REQUIRED_FIELDS.filter(f => {
    const val = data[f];
    return val === null || val === undefined || val === '';
  });

  if (isLocked) {
    return (
      <Card className="rounded-2xl shadow-sm border-t-4 border-t-green-400/30">
        <CardContent className="py-12 text-center space-y-3">
          <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto" />
          <h3 className="text-xl font-semibold">Application Submitted</h3>
          <p className="text-muted-foreground">Your application has been submitted successfully. Your assigned agent will review it shortly.</p>
          {data.submitted_at && <p className="text-xs text-muted-foreground">Submitted on {new Date(data.submitted_at).toLocaleDateString()}</p>}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-2xl shadow-sm border-t-4 border-t-green-400/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="h-8 w-8 rounded-lg bg-green-500/10 flex items-center justify-center">
            <Send className="h-4 w-4 text-green-600" />
          </div>
          11. Review & Submit
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isComplete && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-700 font-medium">
              <AlertCircle className="h-4 w-4" />
              Profile Incomplete ({progress}%)
            </div>
            <p className="text-sm text-amber-600">Please complete the following required fields before submitting:</p>
            <ul className="text-sm text-amber-600 list-disc pl-5 space-y-0.5">
              {missingFields.map(f => (
                <li key={f}>{f.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</li>
              ))}
            </ul>
          </div>
        )}
        {isComplete && (
          <>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-700">
              <div className="flex items-center gap-2 font-medium">
                <CheckCircle2 className="h-4 w-4" />
                All required fields are complete
              </div>
              <p className="text-sm mt-1 text-emerald-600">Review your information above, then submit your application.</p>
            </div>
            <div className="flex items-start gap-3 pt-2">
              <Checkbox id="confirm" checked={confirmed} onCheckedChange={v => setConfirmed(v === true)} />
              <Label htmlFor="confirm" className="text-sm leading-5 cursor-pointer">
                I confirm that all information provided is correct and accurate to the best of my knowledge.
              </Label>
            </div>
            <div className="flex justify-end pt-2">
              <Button onClick={onSubmit} disabled={!confirmed || isSubmitting} className="rounded-xl gap-2 bg-emerald-600 hover:bg-emerald-700">
                <Send className="h-4 w-4" /> {isSubmitting ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
