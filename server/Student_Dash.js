import React, { useState } from 'react';
import './Student_Dash.css';

const StudentDashboard = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [studentName, setStudentName] = useState('');
    const [teamNo, setTeamNo] = useState('');
    const [selectedProject, setSelectedProject] = useState(null);

    const projects = [
        { title: 'AI Project', description: 'An AI-based project' },
        { title: 'ML Model', description: 'Develop a machine learning model' },
    ];

    const feedbacks = [
        { project: 'AI Project', comment: 'Great progress!', date: '2024-09-01' },
        { project: 'ML Model', comment: 'Needs improvement in accuracy.', date: '2024-09-15' },
    ];

    const marks = [
        { project: 'AI Project', mark: 85 },
        { project: 'ML Model', mark: 75 },
    ];

    // Handle login form submission
    const handleLogin = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const teamNumber = e.target.teamNo.value;
        setStudentName(name);
        setTeamNo(teamNumber);
        setIsLoggedIn(true);
    };

    const handleProjectClick = (projectTitle) => {
        const selectedProjectFeedback = feedbacks.find(f => f.project === projectTitle);
        const selectedProjectMark = marks.find(m => m.project === projectTitle);
        setSelectedProject({
            title: projectTitle,
            feedback: selectedProjectFeedback ? selectedProjectFeedback.comment : 'No feedback yet',
            mark: selectedProjectMark ? selectedProjectMark.mark : 'Not graded yet'
        });
    };

    return (
        <div className="student-dashboard">
            <header>
                <h1>MentorMap - Student Dashboard</h1>
            </header>

            {!isLoggedIn ? (
                <section id="login">
                    <h2>Login to your account</h2>
                    <form onSubmit={handleLogin}>
                        <input type="text" name="name" placeholder="Enter your name" required />
                        <input type="text" name="teamNo" placeholder="Enter your team number" required />
                        <button type="submit">Login</button>
                    </form>
                </section>
            ) : (
                <section id="main-dashboard">
                    <div className="navbar">
                        <button className="nav-btn">Settings</button>
                        <button className="nav-btn">Log Out</button>
                    </div>

                    <div className="welcome-section">
                        <h2>Welcome, {studentName}</h2>
                        <h3>Team No: {teamNo}</h3>
                    </div>

                    <div className="project-box">
                        <h3>Your Projects</h3>
                        <ul>
                            {projects.map((project, index) => (
                                <li key={index} onClick={() => handleProjectClick(project.title)}>
                                    <strong>{project.title}</strong>: {project.description}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Modal or Section for Project Details */}
                    {selectedProject && (
                        <div className="project-details">
                            <h3>Project Details</h3>
                            <p><strong>Project Title:</strong> {selectedProject.title}</p>
                            <p><strong>Feedback:</strong> {selectedProject.feedback}</p>
                            <p><strong>Marks:</strong> {selectedProject.mark} / 100</p>
                            <button className="close-btn" onClick={() => setSelectedProject(null)}>Close</button>
                        </div>
                    
                    
                    )}
                </section>
            )}
        </div>
    );
};

export default StudentDashboard;
