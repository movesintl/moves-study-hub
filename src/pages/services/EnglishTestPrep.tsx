
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Users, BookOpen, Target, Award } from 'lucide-react';

const EnglishTestPrep = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">English Test Preparation</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Master IELTS and PTE with our comprehensive preparation programs
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Start Your Preparation
            </Button>
          </div>
        </div>
      </div>

      {/* Test Types Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Test</h2>
            <p className="text-xl text-gray-600">We offer specialized preparation for both IELTS and PTE</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">IELTS Preparation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  International English Language Testing System - the world's most popular English test for study and migration.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                    <span>Academic & General Training modules</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                    <span>All four skills: Listening, Reading, Writing, Speaking</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                    <span>Band score improvement guarantee</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                    <span>Mock tests with detailed feedback</span>
                  </li>
                </ul>
                <Button className="w-full">Choose IELTS Prep</Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">PTE Preparation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-6">
                  Pearson Test of English - computer-based English test accepted worldwide for study and migration.
                </p>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                    <span>Computer-based test format training</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                    <span>Integrated skills assessment</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                    <span>AI-powered practice sessions</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                    <span>Fast results and score reporting</span>
                  </li>
                </ul>
                <Button className="w-full">Choose PTE Prep</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our Test Prep?</h2>
            <p className="text-xl text-gray-600">Comprehensive preparation designed for success</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Target className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Targeted Practice</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Focused practice sessions tailored to your target score and test format.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Expert Instructors</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Learn from certified trainers with proven track records in both IELTS and PTE.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <BookOpen className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Comprehensive Materials</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Access to extensive study materials, practice tests, and mock exams for both tests.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Clock className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Flexible Schedule</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Choose from weekday, weekend, or intensive crash course options.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Award className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Score Guarantee</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  We're confident in our methods - score guarantee program available.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-primary mb-4" />
                <CardTitle>Proven Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  95% of our students achieve their target scores within their desired timeframe.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Course Options */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Course Options</h2>
            <p className="text-xl text-gray-600">Flexible programs to suit your needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Regular Course</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">6-8 weeks program</p>
                <p className="text-gray-600 mb-4">40+ hours of training</p>
                <p className="text-2xl font-bold text-primary mb-4">$299</p>
                <Button className="w-full">Enroll Now</Button>
              </CardContent>
            </Card>

            <Card className="border-primary border-2">
              <CardHeader>
                <CardTitle>Intensive Course</CardTitle>
                <div className="bg-primary text-white text-xs px-2 py-1 rounded-full w-fit">POPULAR</div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">3-4 weeks program</p>
                <p className="text-gray-600 mb-4">60+ hours of training</p>
                <p className="text-2xl font-bold text-primary mb-4">$399</p>
                <Button className="w-full">Enroll Now</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>One-on-One</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">Personalized training</p>
                <p className="text-gray-600 mb-4">Flexible schedule</p>
                <p className="text-2xl font-bold text-primary mb-4">$599</p>
                <Button className="w-full">Enroll Now</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Achieve Your Target Score?</h2>
          <p className="text-xl mb-8">
            Join thousands of successful students who achieved their English test goals with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Book Free Assessment
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Download Study Guide
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnglishTestPrep;
