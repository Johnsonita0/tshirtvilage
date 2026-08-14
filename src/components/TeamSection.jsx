import React from 'react';
import '../css/components/TeamSection.css';

function TeamSection() {
  const team = [
    {
      id: 1,
      name: 'Ufot Ekaete',
      role: 'Founder & CEO',
      bio: 'With 8+ years of experience in textile production, leading T-Shirts Village to excellence.',
      image: '/team/founder.jpg',
      socials: { linkedin: '#', twitter: '#', instagram: '#' }
    },
    {
      id: 2,
      name: 'Okon Udoimon',
      role: 'Production Manager',
      bio: 'Expert in quality control and production optimization. Ensures every piece meets our standards.',
      image: '/team/production.jpg',
      socials: { linkedin: '#', twitter: '#', instagram: '#' }
    },
    {
      id: 3,
      name: 'Abasi Kokor',
      role: 'Design Director',
      bio: 'Creative designer with passion for innovative custom apparel designs.',
      image: '/team/designer.jpg',
      socials: { linkedin: '#', twitter: '#', instagram: '#' }
    },
    {
      id: 4,
      name: 'Ito Udo',
      role: 'Training Director',
      bio: 'Leads our internship program with commitment to skill development and mentorship.',
      image: '/team/trainer.jpg',
      socials: { linkedin: '#', twitter: '#', instagram: '#' }
    }
  ];

  return (
    <section className="team-section" id="team">
      <div className="app-shell">
        <div className="section-header">
          <h2>Meet Our Team</h2>
          <p>Expert professionals dedicated to delivering exceptional results</p>
        </div>

        <div className="team-grid">
          {team.map((member) => (
            <div key={member.id} className="team-card">
              <div className="team-image-wrapper">
                <img src={member.image} alt={member.name} className="team-image" />
                <div className="team-overlay">
                  <div className="team-socials">
                    {member.socials.linkedin && <a href={member.socials.linkedin} title="LinkedIn">in</a>}
                    {member.socials.twitter && <a href={member.socials.twitter} title="Twitter">𝕏</a>}
                    {member.socials.instagram && <a href={member.socials.instagram} title="Instagram">📷</a>}
                  </div>
                </div>
              </div>
              <div className="team-info">
                <h3>{member.name}</h3>
                <p className="role">{member.role}</p>
                <p className="bio">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TeamSection;
