import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Mail, Users, TrendingUp, Eye } from 'lucide-react';

interface Campaign {
  id: string;
  subject: string;
  type: string;
  sentDate: string;
  recipients: number;
  openRate: number;
  clickRate: number;
  status: 'sent' | 'draft' | 'scheduled';
}

const CampaignList = () => {
  // Mock data - in real implementation, this would come from your backend
  const [campaigns] = useState<Campaign[]>([
    {
      id: '1',
      subject: 'New Study Opportunities in Australia',
      type: 'Newsletter',
      sentDate: '2024-01-15',
      recipients: 1250,
      openRate: 24.5,
      clickRate: 3.2,
      status: 'sent'
    },
    {
      id: '2',
      subject: 'Scholarship Deadline Reminder',
      type: 'Announcement',
      sentDate: '2024-01-10',
      recipients: 890,
      openRate: 31.8,
      clickRate: 5.7,
      status: 'sent'
    },
    {
      id: '3',
      subject: 'Special Discount on Consultation Services',
      type: 'Promotional',
      sentDate: '2024-01-08',
      recipients: 2100,
      openRate: 19.3,
      clickRate: 2.8,
      status: 'sent'
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent':
        return 'bg-green-100 text-green-800';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Total Campaigns</span>
            </div>
            <p className="text-2xl font-bold mt-2">{campaigns.length}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium">Total Recipients</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {campaigns.reduce((sum, campaign) => sum + campaign.recipients, 0).toLocaleString()}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium">Avg Open Rate</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {(campaigns.reduce((sum, campaign) => sum + campaign.openRate, 0) / campaigns.length).toFixed(1)}%
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <span className="text-sm font-medium">Avg Click Rate</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {(campaigns.reduce((sum, campaign) => sum + campaign.clickRate, 0) / campaigns.length).toFixed(1)}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Campaigns List */}
      <div className="space-y-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold text-lg">{campaign.subject}</h3>
                    <Badge className={getStatusColor(campaign.status)}>
                      {campaign.status}
                    </Badge>
                    <Badge variant="outline">{campaign.type}</Badge>
                  </div>
                  
                  <div className="flex items-center gap-6 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(campaign.sentDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {campaign.recipients.toLocaleString()} recipients
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Open Rate</p>
                    <p className="font-semibold text-green-600">{campaign.openRate}%</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Click Rate</p>
                    <p className="font-semibold text-blue-600">{campaign.clickRate}%</p>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {campaigns.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Mail className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No campaigns found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CampaignList;