import { supabase } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';

interface StaffMember {
  id: string;
  name: string;
  position: string;
  image: string;
  alt: string;
  role: 'leader' | 'counselor' | 'team_member'; 
}

const LeadershipTeam = () => {
  const [staffMembers, setStaffMembers] = useState<StaffMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStaffMembers = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('staff_members')
          .select('*')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (error) throw error;

        const mappedData: StaffMember[] = data.map((member) => ({
          id: member.id,
          name: member.name,
          position: member.designation,
          image: member.profile_image_url || '/default-profile.png',
          alt: `${member.name}'s profile picture`,
          role: member.designation.toLowerCase().includes('leader')
            ? 'leader'
            : member.designation.toLowerCase().includes('counselor')
            ? 'counselor'
            : 'team_member',
        }));

        setStaffMembers(mappedData);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching staff members:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffMembers();
  }, []);

  if (loading) return <div className="text-center py-16">Loading team members...</div>;
  if (error) return <div className="text-center py-16 text-red-500">Error: {error}</div>;

  const leaders = staffMembers.filter((member) => member.role === 'leader');
  const counselors = staffMembers.filter((member) => member.role === 'counselor');
  const teamMembers = staffMembers.filter((member) => member.role === 'team_member');

  const renderLeaderCard = (leader: StaffMember) => (
    <div 
      key={leader.id}
      className="group bg-white rounded-2xl border-gray-100 shadow-lg border-[1px]"
    >
      <div className="relative overflow-hidden">
        <div className="flex items-center justify-center w-[300px] h-[300px]">
          <img
            src={leader.image}
            alt={leader.alt}
            className="w-full h-full object-cover rounded-t-2xl"
          />
        </div>
      </div>
      <div className="p-6 text-center">
        <h5 className="text-xl font-semibold text-primary mb-2 group-hover:text-orange-500 transition-colors duration-300">
          {leader.name}
        </h5>
      </div>
    </div>
  );

  const renderCounselorCard = (counselor: StaffMember) => (
    <div 
      key={counselor.id}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300"
    >
      <div className="flex items-center justify-center w-full h-[250px]">
        <img
          src={counselor.image}
          alt={counselor.alt}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-6 text-center">
        <h5 className="text-lg font-semibold text-primary mb-1 group-hover:text-orange-500 transition-colors duration-300">
          {counselor.name}
        </h5>
      </div>
    </div>
  );

  const renderMemberCard = (member: StaffMember) => (
    <div 
      key={member.id}
      className="group bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300"
    >
      {/* Square Image Container */}
      <div className="w-full aspect-square bg-gray-100">
        <img
          src={member.image}
          alt={member.alt}
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="p-4 text-center">
        <h5 className="text-xl font-semibold text-primary mb-2 group-hover:text-orange-500 transition-colors duration-300">
          {member.name
          }
          </h5>
      </div>
    </div>
  );

  return (
    <div className="py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Our Leadership Team
          </h2>
          <div className="w-24 h-1 bg-orange-600 mx-auto rounded-full"></div>
        </div>

        {/* Leaders Section */}
        {leaders.length > 0 && (
          <div className="mb-16">
            <div className="grid sm:max-w-[630px] mx-auto grid-cols-1 sm:grid-cols-2 gap-[30px]">
              {leaders.map(renderLeaderCard)}
            </div>
          </div>
        )}

        {/* Counselors Section */}
        {counselors.length > 0 && (
          <div className="mb-16">
            <h5 className="text-4xl font-bold text-primary mb-8 text-center">
              Our Counselors
            </h5>
            <div className="grid  lg:max-w-[960px] mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
              {counselors.map(renderCounselorCard)}
            </div>
          </div>
        )}

        {/* Team Members Section */}
        {teamMembers.length > 0 && (
          <div className="mb-16">
            <h5 className="text-4xl font-bold text-primary mb-8 text-center">
              Team Members
            </h5>
            <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
              {teamMembers.map(renderMemberCard)}
            </div>
          </div>
        )}

       
      </div>
    </div>
  );
};

export default LeadershipTeam;