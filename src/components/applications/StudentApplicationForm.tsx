
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Combobox } from '@/components/ui/combobox';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Upload, X } from 'lucide-react';

const applicationSchema = z.object({
  student_name: z.string().min(2, 'Name must be at least 2 characters'),
  student_email: z.string().email('Please enter a valid email'),
  student_phone: z.string().min(10, 'Phone number must be at least 10 characters'),
  date_of_birth: z.string().optional(),
  nationality: z.string().optional(),
  address: z.string().optional(),
  destination_id: z.string().min(1, 'Please select a destination'),
  university_id: z.string().min(1, 'Please select a university'),
  course_id: z.string().min(1, 'Please select a course'),
});

type ApplicationFormData = z.infer<typeof applicationSchema>;

interface StudentApplicationFormProps {
  editingApplication?: any;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const StudentApplicationForm: React.FC<StudentApplicationFormProps> = ({
  editingApplication,
  onSuccess,
  onCancel,
}) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [universities, setUniversities] = useState<any[]>([]);
  const [courses, setCourses] = useState<any[]>([]);
  const [filteredUniversities, setFilteredUniversities] = useState<any[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<any[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ApplicationFormData>({
    resolver: zodResolver(applicationSchema),
    defaultValues: editingApplication ? {
      student_name: editingApplication.student_name,
      student_email: editingApplication.student_email,
      student_phone: editingApplication.student_phone,
      date_of_birth: editingApplication.date_of_birth,
      nationality: editingApplication.nationality,
      address: editingApplication.address,
      destination_id: editingApplication.destination_id,
      university_id: editingApplication.university_id,
      course_id: editingApplication.course_id,
    } : {},
  });

  const selectedDestination = watch('destination_id');
  const selectedUniversity = watch('university_id');

  useEffect(() => {
    fetchDestinations();
    fetchUniversities();
    fetchCourses();
  }, []);

  useEffect(() => {
    if (selectedDestination) {
      const filtered = universities.filter(uni => 
        uni.location?.toLowerCase().includes(
          destinations.find(dest => dest.id === selectedDestination)?.name?.toLowerCase() || ''
        )
      );
      setFilteredUniversities(filtered);
      setValue('university_id', '');
      setValue('course_id', '');
    } else {
      setFilteredUniversities(universities);
    }
  }, [selectedDestination, universities, destinations]);

  useEffect(() => {
    if (selectedUniversity) {
      const filtered = courses.filter(course => course.university_id === selectedUniversity);
      setFilteredCourses(filtered);
      setValue('course_id', '');
    } else {
      setFilteredCourses(courses);
    }
  }, [selectedUniversity, courses]);

  const fetchDestinations = async () => {
    const { data } = await supabase.from('destinations').select('*').order('name');
    setDestinations(data || []);
  };

  const fetchUniversities = async () => {
    const { data } = await supabase.from('universities').select('*').order('name');
    setUniversities(data || []);
  };

  const fetchCourses = async () => {
    const { data } = await supabase.from('courses').select('*').order('title');
    setCourses(data || []);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setDocuments(prev => [...prev, ...files]);
  };

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ApplicationFormData) => {
    setLoading(true);
    try {
      const applicationData = {
        ...data,
        documents: documents.map(doc => ({
          name: doc.name,
          size: doc.size,
          type: doc.type,
        })),
      };

      if (editingApplication) {
        const { error } = await supabase
          .from('applications')
          .update(applicationData)
          .eq('id', editingApplication.id);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Application updated successfully!",
        });
      } else {
        const { error } = await supabase
          .from('applications')
          .insert([applicationData]);

        if (error) throw error;

        toast({
          title: "Success",
          description: "Application submitted successfully!",
        });
        reset();
        setDocuments([]);
      }

      onSuccess?.();
    } catch (error) {
      console.error('Error submitting application:', error);
      toast({
        title: "Error",
        description: "Failed to submit application. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const destinationOptions = destinations.map(dest => ({
    value: dest.id,
    label: dest.name,
  }));

  const universityOptions = filteredUniversities.map(uni => ({
    value: uni.id,
    label: uni.name,
  }));

  const courseOptions = filteredCourses.map(course => ({
    value: course.id,
    label: course.title,
  }));

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{editingApplication ? 'Edit Application' : 'Submit Your Course Application'}</CardTitle>
        <CardDescription>
          {editingApplication ? 'Update your application details below.' : 'Fill out the form below to apply for your desired course.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="student_name">Full Name *</Label>
                <Input
                  id="student_name"
                  {...register('student_name')}
                  className="mt-1"
                />
                {errors.student_name && (
                  <p className="text-red-500 text-sm mt-1">{errors.student_name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="student_email">Email Address *</Label>
                <Input
                  id="student_email"
                  type="email"
                  {...register('student_email')}
                  className="mt-1"
                />
                {errors.student_email && (
                  <p className="text-red-500 text-sm mt-1">{errors.student_email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="student_phone">Phone Number *</Label>
                <Input
                  id="student_phone"
                  {...register('student_phone')}
                  className="mt-1"
                />
                {errors.student_phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.student_phone.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="date_of_birth">Date of Birth</Label>
                <Input
                  id="date_of_birth"
                  type="date"
                  {...register('date_of_birth')}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="nationality">Nationality</Label>
                <Input
                  id="nationality"
                  {...register('nationality')}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                {...register('address')}
                className="mt-1"
                rows={3}
              />
            </div>
          </div>

          {/* Course Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Course Selection</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Destination *</Label>
                <Combobox
                  options={destinationOptions}
                  value={watch('destination_id')}
                  onSelect={(value) => setValue('destination_id', value)}
                  placeholder="Select destination..."
                  searchPlaceholder="Search destinations..."
                  className="w-full mt-1"
                />
                {errors.destination_id && (
                  <p className="text-red-500 text-sm mt-1">{errors.destination_id.message}</p>
                )}
              </div>
              <div>
                <Label>University *</Label>
                <Combobox
                  options={universityOptions}
                  value={watch('university_id')}
                  onSelect={(value) => setValue('university_id', value)}
                  placeholder="Select university..."
                  searchPlaceholder="Search universities..."
                  className="w-full mt-1"
                />
                {errors.university_id && (
                  <p className="text-red-500 text-sm mt-1">{errors.university_id.message}</p>
                )}
              </div>
              <div>
                <Label>Course *</Label>
                <Combobox
                  options={courseOptions}
                  value={watch('course_id')}
                  onSelect={(value) => setValue('course_id', value)}
                  placeholder="Select course..."
                  searchPlaceholder="Search courses..."
                  className="w-full mt-1"
                />
                {errors.course_id && (
                  <p className="text-red-500 text-sm mt-1">{errors.course_id.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Document Upload */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Document Upload</h3>
            <div>
              <Label htmlFor="documents">Upload Documents</Label>
              <div className="mt-2">
                <input
                  id="documents"
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('documents')?.click()}
                  className="w-full"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Documents
                </Button>
              </div>
              {documents.length > 0 && (
                <div className="mt-4 space-y-2">
                  {documents.map((doc, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                      <span className="text-sm">{doc.name}</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDocument(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            {editingApplication && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
            <Button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : editingApplication ? 'Update Application' : 'Submit Application'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default StudentApplicationForm;
