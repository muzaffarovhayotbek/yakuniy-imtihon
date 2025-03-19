import React from 'react';
import profile from '../../assets/profile-DM-wpHcR.jpg';
function About() {
  return (
    <div className='min-h-screen bg-base-100 py-12'>
      <div className="container mx-auto flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-6 text-center">About Me</h1>
        <div className="avatar mb-8">
          <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img
              src={profile}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover"
            />
          </div>
        </div>
        <p className="text-lg text-center max-w-2xl mb-4">
          Hello! I'm Saminjonov Jamshid, a passionate web developer and designer
          with a love for crafting intuitive and visually appealing user
          experiences. With a strong background in front-end development and an
          eye for design, I bring ideas to life through code.
        </p>
        <p className="text-lg text-center max-w-2xl mb-4">
          Over the past few years, I've honed my skills in HTML, CSS,
          JavaScript, and modern frameworks like React and TailwindCSS. I
          believe in writing clean, efficient code and continuously improving my
          craft.
        </p>
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="badge badge-primary">HTML</div>
            <div className="badge badge-primary">CSS</div>
            <div className="badge badge-primary">JavaScript</div>
            <div className="badge badge-primary">React</div>
            <div className="badge badge-primary">TailwindCSS</div>
            <div className="badge badge-primary ">Git</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
