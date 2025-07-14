import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Combobox } from '@/components/ui/combobox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { X, Upload, FileText } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Course {
  id: string;
  title: string;
  university: string;
  country: string;
}

interface University {
  id: string;
  name: string;
}

interface Destination {
  id: string;
  name: string;
}

interface Document {
  id?: string;
  name: string;
  size: number;
  type: string;
  category: 'passport' | 'academic' | 'english' | 'other';
  label?: string;
  file?: File;
}

interface Application {
  id: string;
  student_name: string;
  student_email: string;
  student_phone: string;
  date_of_birth?: string;
  nationality?: string;
  address?: string;
  course_id?: string;
  university_id?: string;
  destination_id?: string;
  documents?: Document[];
}

interface StudentApplicationFormProps {
  editingApplication?: Application | null;
  preselectedCourseId?: string | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const StudentApplicationForm: React.FC<StudentApplicationFormProps> = ({
  editingApplication,
  preselectedCourseId,
  onSuccess,
  onCancel
}) => {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    student_name: '',
    student_email: user?.email || '',
    student_phone: '',
    date_of_birth: '',
    nationality: '',
    address: '',
    course_id: preselectedCourseId || '',
    university_id: '',
    destination_id: '',
  });

  const [courses, setCourses] = useState<Course[]>([]);
  const [universities, setUniversities] = useState<University[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(false);
  const [courseSearchTerm, setCourseSearchTerm] = useState('');
  const [currentCategory, setCurrentCategory] = useState<'passport' | 'academic' | 'english' | 'other'>('passport');
  const [customLabel, setCustomLabel] = useState('');

  useEffect(() => {
    fetchCourses();
    fetchUniversities();
    fetchDestinations();
  }, []);

  useEffect(() => {
    if (editingApplication) {
      setFormData({
        student_name: editingApplication.student_name,
        student_email: editingApplication.student_email,
        student_phone: editingApplication.student_phone,
        date_of_birth: editingApplication.date_of_birth || '',
        nationality: editingApplication.nationality || '',
        address: editingApplication.address || '',
        course_id: editingApplication.course_id || '',
        university_id: editingApplication.university_id || '',
        destination_id: editingApplication.destination_id || '',
      });
      setDocuments(editingApplication.documents || []);
    } else if (preselectedCourseId) {
      // Set preselected course and auto-populate related fields
      setFormData(prev => ({ ...prev, course_id: preselectedCourseId }));
      
      // Find the course and auto-populate university and destination
      const selectedCourse = courses.find(course => course.id === preselectedCourseId);
      if (selectedCourse) {
        const relatedUniversity = universities.find(uni => uni.name === selectedCourse.university);
        const relatedDestination = destinations.find(dest => dest.name === selectedCourse.country);
        
        setFormData(prev => ({
          ...prev,
          university_id: relatedUniversity?.id || '',
          destination_id: relatedDestination?.id || ''
        }));
      }
    }
  }, [editingApplication, preselectedCourseId, courses, universities, destinations]);

  const fetchCourses = async () => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('id, title, university, country');
      
      if (error) throw error;
      setCourses(data || []);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };

  const fetchUniversities = async () => {
    try {
      const { data, error } = await supabase
        .from('universities')
        .select('id, name');
      
      if (error) throw error;
      setUniversities(data || []);
    } catch (error) {
      console.error('Error fetching universities:', error);
    }
  };

  const fetchDestinations = async () => {
    try {
      const { data, error } = await supabase
        .from('destinations')
        .select('id, name');
      
      if (error) throw error;
      setDestinations(data || []);
    } catch (error) {
      console.error('Error fetching destinations:', error);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    const newDocuments = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      category: currentCategory,
      label: currentCategory === 'other' ? customLabel : getCategoryLabel(currentCategory),
      file
    }));
    setDocuments(prev => [...prev, ...newDocuments]);
    setCustomLabel('');
    // Reset the file input
    event.target.value = '';
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'passport': return 'Passport';
      case 'academic': return 'Academic Document';
      case 'english': return 'English Test (IELTS/PTE)';
      case 'other': return 'Other Document';
      default: return 'Document';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'passport': return 'bg-blue-100 text-blue-800';
      case 'academic': return 'bg-green-100 text-green-800';
      case 'english': return 'bg-purple-100 text-purple-800';
      case 'other': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const removeDocument = (index: number) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Convert documents to JSON format for database storage
      const documentsForDb = documents.map(doc => ({
        id: doc.id,
        name: doc.name,
        size: doc.size,
        type: doc.type,
        category: doc.category,
        label: doc.label
      }));

      const applicationData = {
        ...formData,
        documents: documentsForDb,
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
      }

      onSuccess();
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

  const filteredCourses = courses.filter(course =>
    course.title.toLowerCase().includes(courseSearchTerm.toLowerCase())
  );

  const courseOptions = filteredCourses.map(course => ({
    value: course.id,
    label: `${course.title} - ${course.university}`
  }));

  const universityOptions = universities.map(university => ({
    value: university.id,
    label: university.name
  }));

  const destinationOptions = destinations.map(destination => ({
    value: destination.id,
    label: destination.name
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editingApplication ? 'Edit Application' : 'Submit New Application'}</CardTitle>
        <CardDescription>
          {editingApplication ? 'Update your course application details' : 'Apply for your desired course'}
          {preselectedCourseId && !editingApplication && (
            <span className="block text-primary font-medium mt-1">
              Course pre-selected - complete your application below
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="student_name">Full Name *</Label>
              <Input
                id="student_name"
                value={formData.student_name}
                onChange={(e) => handleInputChange('student_name', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="student_email">Email *</Label>
              <Input
                id="student_email"
                type="email"
                value={formData.student_email}
                onChange={(e) => handleInputChange('student_email', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="student_phone">Phone Number *</Label>
              <Input
                id="student_phone"
                value={formData.student_phone}
                onChange={(e) => handleInputChange('student_phone', e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="date_of_birth">Date of Birth</Label>
              <Input
                id="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={(e) => handleInputChange('date_of_birth', e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="nationality">Nationality</Label>
              <Input
                id="nationality"
                value={formData.nationality}
                onChange={(e) => handleInputChange('nationality', e.target.value)}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              value={formData.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label>Destination</Label>
              <Combobox
                options={destinationOptions}
                value={formData.destination_id}
                onSelect={(value) => handleInputChange('destination_id', value)}
                placeholder="Select destination..."
                className="w-full"
              />
            </div>
            <div>
              <Label>University</Label>
              <Combobox
                options={universityOptions}
                value={formData.university_id}
                onSelect={(value) => handleInputChange('university_id', value)}
                placeholder="Select university..."
                className="w-full"
              />
            </div>
            <div>
              <Label>Course</Label>
              <Combobox
                options={courseOptions}
                value={formData.course_id}
                onSelect={(value) => handleInputChange('course_id', value)}
                placeholder="Search courses..."
                searchPlaceholder="Type to search courses..."
                className="w-full"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Label>Upload Documents</Label>
            
            {/* Document Upload Controls */}
            <div className="border rounded-lg p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="document_category">Document Category</Label>
                  <Select value={currentCategory} onValueChange={(value: any) => setCurrentCategory(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select document type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="passport">Passport</SelectItem>
                      <SelectItem value="academic">Academic Documents</SelectItem>
                      <SelectItem value="english">English Test (IELTS/PTE)</SelectItem>
                      <SelectItem value="other">Other Documents</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {currentCategory === 'other' && (
                  <div>
                    <Label htmlFor="custom_label">Document Label</Label>
                    <Input
                      id="custom_label"
                      value={customLabel}
                      onChange={(e) => setCustomLabel(e.target.value)}
                      placeholder="Enter document description"
                    />
                  </div>
                )}
              </div>
              
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <Label htmlFor="documents" className="cursor-pointer">
                  <span className="text-sm text-gray-600">
                    Click to upload {getCategoryLabel(currentCategory).toLowerCase()}
                  </span>
                  <Input
                    id="documents"
                    type="file"
                    multiple={currentCategory === 'academic' || currentCategory === 'other'}
                    onChange={handleFileUpload}
                    className="hidden"
                    accept={currentCategory === 'passport' ? 'image/*,.pdf' : '*/*'}
                  />
                </Label>
                <p className="text-xs text-gray-500 mt-1">
                  {currentCategory === 'passport' && 'Upload passport photo or scan'}
                  {currentCategory === 'academic' && 'Upload transcripts, certificates, etc. (multiple files allowed)'}
                  {currentCategory === 'english' && 'Upload IELTS/PTE score report'}
                  {currentCategory === 'other' && 'Upload any additional documents'}
                </p>
              </div>
            </div>

            {/* Uploaded Documents Display */}
            {documents.length > 0 && (
              <div className="space-y-3">
                <h4 className="font-medium text-sm">Uploaded Documents ({documents.length})</h4>
                <div className="grid gap-3">
                  {documents.map((doc, index) => (
                    <div key={doc.id || index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{doc.name}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge className={getCategoryColor(doc.category)}>
                              {doc.label}
                            </Badge>
                            <span className="text-xs text-gray-500">
                              {(doc.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDocument(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="flex gap-4">
            <Button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : editingApplication ? 'Update Application' : 'Submit Application'}
            </Button>
            {editingApplication && (
              <Button type="button" variant="outline" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default StudentApplicationForm;
