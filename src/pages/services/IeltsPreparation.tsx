
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Clock, Users, BookOpen, Target, Award } from 'lucide-react';

const IeltsPreparation = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-accent text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">IELTS Preparation</h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Achieve your target IELTS score with our comprehensive preparation program
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Start Your Preparation
            </Button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Our IELTS Program?</h2>
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
                  Focused practice sessions for all four IELTS modules: Listening, Reading, Writing, and Speaking.
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
                  Learn from certified IELTS trainers with years of experience and proven track records.
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
                  Access to extensive study materials, practice tests, and mock exams.
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

      {/* Program Details */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Program Includes</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                  <span>40+ hours of structured classroom training</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                  <span>10 full-length practice tests</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                  <span>Individual speaking practice sessions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                  <span>Writing task evaluation and feedback</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                  <span>Online portal with additional resources</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-1" />
                  <span>Test booking assistance</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Course Options</h3>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Regular Course</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-2">6-8 weeks program</p>
                    <p className="text-2xl font-bold text-primary">$299</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Intensive Course</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-2">3-4 weeks program</p>
                    <p className="text-2xl font-bold text-primary">$399</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>One-on-One</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-2">Personalized training</p>
                    <p className="text-2xl font-bold text-primary">$599</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Achieve Your Target Score?</h2>
          <p className="text-xl mb-8">
            Join thousands of successful students who achieved their IELTS goals with us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
              Enroll Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
              Free Assessment Test
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IeltsPreparation;
