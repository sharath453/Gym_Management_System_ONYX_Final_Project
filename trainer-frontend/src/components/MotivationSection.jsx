import React from 'react';

const MotivationSection = () => {
  const workoutMotivations = [
    "The only workout you regret is the one you didn't do",
    "Don't stop when you're tired. Stop when you're done",
    "Your future self will thank you for the work you do today",
    "Strength doesn't come from what you can do. It comes from overcoming the things you once thought you couldn't",
    "The body achieves what the mind believes",
    "Success starts with self-discipline",
    "Be stronger than your excuses",
    "The pain you feel today will be the strength you feel tomorrow",
    "Don't wish for it, work for it",
    "Your only limit is you"
  ];

  const randomMotivation = workoutMotivations[Math.floor(Math.random() * workoutMotivations.length)];

  return (
    <div className="motivation-section glow">
      <h3>Quote of the day</h3>
      <p>"{randomMotivation}"</p>
    </div>
  );
};

export default MotivationSection;