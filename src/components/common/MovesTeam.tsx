import React from 'react';

const LeadershipTeam = () => {
  const leaders = [
    {
      id: 1,
      name: "Shakil Shikder",
      position: "CEO",
      image: "/api/placeholder/300/400",
      alt: "Shakil Shikder - Professional headshot"
    },
    {
      id: 2,
      name: "Shahadat Hossain Sohag",
      position: "Director",
      image: "/api/placeholder/300/400",
      alt: "Shahadat Hossain Sohag - Professional headshot"
    }
  ];

  const counselors = [
    {
      id: 1,
      name: "Mudassar Bilal",
      position: "Counselor",
      image: "/api/placeholder/300/300",
      alt: "Mudassar Bilal - Counselor"
    },
    {
      id: 2,
      name: "Raju Sikder",
      position: "Counselor",
      image: "/api/placeholder/300/300",
      alt: "Raju Sikder - Counselor"
    },
    {
      id: 3,
      name: "Ridiyanul Hoq",
      position: "Counselor",
      image: "/api/placeholder/300/300",
      alt: "Ridiyanul Hoq - Counselor"
    }
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Upendra Adhikari",
      position: "Team Member",
      image: "/api/placeholder/300/300",
      alt: "Upendra Adhikari - Team Member"
    },
    {
      id: 2,
      name: "Karina Ali",
      position: "Team Member",
      image: "/api/placeholder/300/300",
      alt: "Karina Ali - Team Member"
    }
  ];

  const renderLeaderCard = (leader) => (
    <div 
      key={leader.id}
      className="group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
    >
      {/* Image Container */}
      <div className="relative overflow-hidden">
        <div className="aspect-[4/5] bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
          {/* Placeholder for actual images */}
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <div className="text-gray-500 text-center">
              <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-2"></div>
              <p className="text-sm">Photo</p>
            </div>
          </div>
        </div>
        {/* Overlay effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>

      {/* Content */}
      <div className="p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
          {leader.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{leader.position}</p>
        <div className="w-12 h-0.5 bg-blue-600 mx-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
    </div>
  );

  const renderMemberCard = (member) => (
    <div 
      key={member.id}
      className="group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden"
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
        <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
        <p className="text-sm text-gray-600">{member.position}</p>
      </div>
    </div>
  );

  return (
    <div className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Leadership Team
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Leaders Section */}
        <div className="mb-16">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {leaders.map(renderLeaderCard)}
          </div>
        </div>

        {/* Counselors Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            Our Counselors
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {counselors.map(renderMemberCard)}
          </div>
        </div>

        {/* Team Members Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-semibold text-gray-800 mb-8 text-center">
            Team Members
          </h3>
          <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
            {teamMembers.map(renderMemberCard)}
          </div>
        </div>

        {/* Optional CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Meet the dedicated professionals guiding our students to success.
          </p>
          <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-colors duration-300">
            Contact Our Team
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadershipTeam;



    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* <div className="text-center mb-12"> */}
          {/* <h2 className="text-3xl font-bold text-gray-900 mb-4"> */}
            {/* Our Core Values */}
          {/* </h2> */}
          {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto"> */}
            {/* The principles that guide everything we do and define who we are as an organization. */}
          {/* </p> */}
        {/* </div> */}
{/*  */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8"> */}
          {/* {values.map((value, index) => ( */}
            // <Card key={index} className="border-t-4 border-primary hover:shadow-lg transition-shadow">
              {/* <CardContent className="p-6 text-center"> */}
                {/* <div className="mb-4"> */}
                  {/* <div className="w-16 h-16 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto"> */}
                    {/* <value.icon className="h-8 w-8 text-white" /> */}
                  {/* </div> */}
                {/* </div> */}
                {/* <h3 className="text-xl font-semibold text-gray-900 mb-3"> */}
                  {/* {value.title} */}
                {/* </h3> */}
                {/* <p className="text-gray-600"> */}
                  {/* {value.description} */}
                {/* </p> */}
              {/* </CardContent> */}
            {/* </Card> */}
        //   ))}
        {/* </div> */}
      {/* </div> */}
// 
    //   {/* Why Choose Us Section */}
    //   <div className="bg-gradient-to-br from-gray-50 to-white py-16">
        {/* <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
          {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"> */}
            {/* <div> */}
              {/* <img  */}
                // src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=600&h=400&fit=crop" 
                // alt="International students" 
                // className="rounded-lg shadow-xl"
            //   />
            {/* </div> */}
            {/* <div> */}
              {/* <h2 className="text-3xl font-bold text-gray-900 mb-6"> */}
                {/* Why Choose Moves International? */}
              {/* </h2> */}
              {/* <div className="space-y-4"> */}
                {/* {whyChooseUs.map((reason, index) => ( */}
                //   <div key={index} className="flex items-start space-x-3">
                    {/* <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0 mt-0.5" /> */}
                    {/* <span className="text-gray-600">{reason}</span> */}
                  {/* </div> */}
                // ))}
              {/* </div> */}
              {/* <div className="mt-8"> */}
                {/* <Button size="lg" asChild> */}
                  {/* <Link to="/services"> */}
                    {/* Explore Our Services */}
                    {/* <ArrowRight className="ml-2 h-5 w-5" /> */}
                  {/* </Link> */}
                {/* </Button> */}
              {/* </div> */}
            {/* </div> */}
          {/* </div> */}
        {/* </div> */}
      {/* </div> */}






     