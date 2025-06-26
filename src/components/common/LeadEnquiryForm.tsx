
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { GraduationCap, Users, Award, Phone, Mail, Globe } from 'lucide-react';
import { useCounsellingBookingForm } from '@/hooks/useCounsellingBookingForm';

const LeadEnquiryForm = () => {
  const {
    formData,
    loading,
    destinations,
    studyLevels,
    handleInputChange,
    handleSubmit,
  } = useCounsellingBookingForm();

  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');

  // Update student_name when first or last name changes
  React.useEffect(() => {
    const fullName = `${firstName} ${lastName}`.trim();
    if (fullName !== formData.student_name) {
      handleInputChange('student_name', fullName);
    }
  }, [firstName, lastName, formData.student_name, handleInputChange]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Ensure full name is set before submission
    handleInputChange('student_name', `${firstName} ${lastName}`.trim());
    handleSubmit(e);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            IDP can help you
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Enter your details and one of our expert counsellors will reach out to you so we can connect you to the right course, country, university - and even scholarships!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form Section - Left Side */}
          <div className="order-2 lg:order-1">
            <Card className="shadow-xl border-0 bg-white">
              <CardContent className="p-8">
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  {/* First Name & Last Name */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first_name">First name*</Label>
                      <Input
                        id="first_name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last_name">Last name*</Label>
                      <Input
                        id="last_name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="h-12"
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="space-y-2">
                    <Label htmlFor="student_email">Email address*</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <Input
                        id="student_email"
                        type="email"
                        value={formData.student_email}
                        onChange={(e) => handleInputChange('student_email', e.target.value)}
                        required
                        className="pl-10 h-12"
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="space-y-2">
                    <Label htmlFor="mobile_number">Mobile number*</Label>
                    <div className="flex gap-2">
                      <Select defaultValue="+61 AU">
                        <SelectTrigger className="w-24 h-12">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="+61 AU">+61 AU</SelectItem>
                          <SelectItem value="+1 US">+1 US</SelectItem>
                          <SelectItem value="+44 UK">+44 UK</SelectItem>
                          <SelectItem value="+91 IN">+91 IN</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <Input
                          id="mobile_number"
                          type="tel"
                          value={formData.student_phone}
                          onChange={(e) => handleInputChange('student_phone', e.target.value)}
                          required
                          className="pl-10 h-12"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Study Destination & Start Date */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="preferred_destination">Your preferred study destination*</Label>
                      <Select onValueChange={(value) => handleInputChange('preferred_destination', value)}>
                        <SelectTrigger className="h-12">
                          <div className="flex items-center">
                            <Globe className="mr-2 h-5 w-5 text-gray-400" />
                            <SelectValue placeholder="Select" />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {destinations?.map((destination) => (
                            <SelectItem key={destination.id} value={destination.name}>
                              {destination.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="start_date">When would you like to start?*</Label>
                      <Select onValueChange={(value) => handleInputChange('preferred_time', value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2024">2024</SelectItem>
                          <SelectItem value="2025">2025</SelectItem>
                          <SelectItem value="2026">2026</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Counselling Mode & Office */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="counselling_mode">Preferred mode of counselling*</Label>
                      <Select onValueChange={(value) => handleInputChange('message', value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Online">Online</SelectItem>
                          <SelectItem value="In-person">In-person</SelectItem>
                          <SelectItem value="Phone">Phone</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nearest_office">Nearest IDP Office*</Label>
                      <Select onValueChange={(value) => handleInputChange('work_experience', value)}>
                        <SelectTrigger className="h-12">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Sydney">Sydney</SelectItem>
                          <SelectItem value="Melbourne">Melbourne</SelectItem>
                          <SelectItem value="Brisbane">Brisbane</SelectItem>
                          <SelectItem value="Perth">Perth</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox id="terms" className="mt-1" />
                      <Label htmlFor="terms" className="text-sm leading-relaxed">
                        I agree to IDP <span className="text-blue-600 underline">Terms</span> and <span className="text-blue-600 underline">privacy policy</span>
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="contact_permission" className="mt-1" />
                      <Label htmlFor="contact_permission" className="text-sm leading-relaxed">
                        Please contact me by phone, email or SMS to assist with my enquiry
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox id="updates" className="mt-1" />
                      <Label htmlFor="updates" className="text-sm leading-relaxed">
                        Please accept to receive updates and offers from IDP
                      </Label>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={loading}
                    className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700 rounded-full"
                  >
                    {loading ? 'Submitting...' : 'Enquire now'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Image Section - Right Side */}
          <div className="order-1 lg:order-2">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-blue-500/20 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
                <img
                  src="/lovable-uploads/83a4743b-bb54-48d4-8e44-390018e133cc.png"
                  alt="Student counselling"
                  className="w-full h-80 object-cover rounded-2xl mb-6"
                />
                
                {/* Statistics Cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-r from-primary to-primary/80 rounded-xl p-4 text-white text-center">
                    <Users className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-2xl font-bold">10,000+</div>
                    <div className="text-sm opacity-90">Students Placed</div>
                  </div>
                  <div className="bg-gradient-to-r from-accent to-orange-500 rounded-xl p-4 text-white text-center">
                    <Award className="h-6 w-6 mx-auto mb-2" />
                    <div className="text-2xl font-bold">99%</div>
                    <div className="text-sm opacity-90">Success Rate</div>
                  </div>
                </div>

                {/* Trust Indicators */}
                <div className="mt-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent border-2 border-white shadow-sm flex items-center justify-center text-white text-xs font-bold">
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">Trusted by thousands</span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Join successful students who achieved their dreams with our expert guidance
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LeadEnquiryForm;
