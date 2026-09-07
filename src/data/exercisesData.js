// Unique CC demonstration clips from Wikimedia Commons (FitnessScape and related).
// A few movements use the closest public clip when an exact match is not available.
const VIDEO = {
  squat:
    'https://upload.wikimedia.org/wikipedia/commons/5/5c/Squat_-_exercise_demonstration_video.webm',
  benchPress:
    'https://upload.wikimedia.org/wikipedia/commons/d/df/Bench_press_-_exercise_demonstration_video.webm',
  deadlift:
    'https://upload.wikimedia.org/wikipedia/commons/6/62/Deadlift_-_exercise_demonstration_video.webm',
  legRaises:
    'https://upload.wikimedia.org/wikipedia/commons/b/bf/Leg_raises_-_exercise_demonstration_video.webm',
  jumpingJacks:
    'https://upload.wikimedia.org/wikipedia/commons/5/57/Jumping_jacks_and_burpees.webm',
  shoulderPress:
    'https://upload.wikimedia.org/wikipedia/commons/6/69/Shoulder_press_-_exercise_demonstration_video.webm',
  burpee: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Burpee.webm',
  pullUps:
    'https://upload.wikimedia.org/wikipedia/commons/1/15/Pull-ups_-_exercise_demonstration_video.webm',
  singleLegSquat:
    'https://upload.wikimedia.org/wikipedia/commons/1/16/Basic_single_leg_squat.webm',
  hangingCrunches:
    'https://upload.wikimedia.org/wikipedia/commons/5/5e/Hanging_crunches_-_exercise_demonstration_video.webm',
  yogaTree:
    'https://upload.wikimedia.org/wikipedia/commons/8/8b/Yoga_with_Modi%E2%80%94Vrikshasana_%28English%29.webm',
  bentOverRow:
    'https://upload.wikimedia.org/wikipedia/commons/b/b2/Bent-over_row_-_exercise_demonstration_video.webm',
};

export const exercisesData = [
  {
    id: 1,
    name: 'Barbell Squat',
    category: 'Strength',
    muscleGroup: 'Legs',
    difficulty: 'Intermediate',
    instructions: [
      'Stand with feet shoulder-width apart and the bar on your upper back.',
      'Brace your core, then sit your hips back and down.',
      'Lower until your thighs are at least parallel to the floor.',
      'Drive through your heels to stand tall without locking your knees.',
    ],
    videoUrl: VIDEO.squat,
    imageUrl: '/assets/images/barbell-squat.svg',
  },
  {
    id: 2,
    name: 'Push-Up',
    category: 'Strength',
    muscleGroup: 'Chest',
    difficulty: 'Beginner',
    instructions: [
      'Place your hands slightly wider than shoulder-width.',
      'Keep your body in a straight line from head to heels.',
      'Lower your chest toward the floor with elbows at about 45 degrees.',
      'Press back up until your arms are straight.',
    ],
    videoUrl: VIDEO.benchPress,
    imageUrl: '/assets/images/push-up.svg',
  },
  {
    id: 3,
    name: 'Deadlift',
    category: 'Strength',
    muscleGroup: 'Back',
    difficulty: 'Advanced',
    instructions: [
      'Stand with the bar over mid-foot and grip just outside your knees.',
      'Keep your chest up and your back flat as you hinge at the hips.',
      'Push the floor away and stand up, keeping the bar close to your body.',
      'Lower the bar with control by pushing your hips back.',
    ],
    videoUrl: VIDEO.deadlift,
    imageUrl: '/assets/images/deadlift.svg',
  },
  {
    id: 4,
    name: 'Plank',
    category: 'Core',
    muscleGroup: 'Core',
    difficulty: 'Beginner',
    instructions: [
      'Set your elbows under your shoulders and extend your legs.',
      'Squeeze your glutes and brace your core.',
      'Keep your hips level so your body forms a straight line.',
      'Hold the position while breathing steadily.',
    ],
    videoUrl: VIDEO.legRaises,
    imageUrl: '/assets/images/plank.svg',
  },
  {
    id: 5,
    name: 'Jump Rope',
    category: 'Cardio',
    muscleGroup: 'Full Body',
    difficulty: 'Beginner',
    instructions: [
      'Hold the handles with a relaxed grip at hip height.',
      'Keep your elbows close to your sides.',
      'Jump just high enough for the rope to pass under your feet.',
      'Land softly on the balls of your feet and stay light.',
    ],
    videoUrl: VIDEO.jumpingJacks,
    imageUrl: '/assets/images/jump-rope.svg',
  },
  {
    id: 6,
    name: 'Overhead Press',
    category: 'Strength',
    muscleGroup: 'Shoulders',
    difficulty: 'Intermediate',
    instructions: [
      'Hold the bar at shoulder height with your wrists stacked.',
      'Brace your core and squeeze your glutes.',
      'Press the bar straight overhead until your arms lock out.',
      'Lower the bar back to your shoulders with control.',
    ],
    videoUrl: VIDEO.shoulderPress,
    imageUrl: '/assets/images/overhead-press.svg',
  },
  {
    id: 7,
    name: 'Burpee',
    category: 'Cardio',
    muscleGroup: 'Full Body',
    difficulty: 'Intermediate',
    instructions: [
      'Stand tall, then squat down and place your hands on the floor.',
      'Jump your feet back into a high plank.',
      'Perform a push-up, then jump your feet forward.',
      'Explode upward into a jump and repeat.',
    ],
    videoUrl: VIDEO.burpee,
    imageUrl: '/assets/images/burpee.svg',
  },
  {
    id: 8,
    name: 'Pull-Up',
    category: 'Strength',
    muscleGroup: 'Back',
    difficulty: 'Advanced',
    instructions: [
      'Grip the bar slightly wider than shoulder-width.',
      'Hang with your arms straight and your core tight.',
      'Pull your chest toward the bar by driving your elbows down.',
      'Lower yourself under control until your arms are straight.',
    ],
    videoUrl: VIDEO.pullUps,
    imageUrl: '/assets/images/pull-up.svg',
  },
  {
    id: 9,
    name: 'Reverse Lunge',
    category: 'Strength',
    muscleGroup: 'Legs',
    difficulty: 'Beginner',
    instructions: [
      'Stand tall with your feet hip-width apart.',
      'Step one foot back and lower both knees to about 90 degrees.',
      'Keep your front knee stacked over your ankle.',
      'Push through the front heel to return to standing.',
    ],
    videoUrl: VIDEO.singleLegSquat,
    imageUrl: '/assets/images/reverse-lunge.svg',
  },
  {
    id: 10,
    name: 'Bicycle Crunch',
    category: 'Core',
    muscleGroup: 'Core',
    difficulty: 'Intermediate',
    instructions: [
      'Lie on your back with your hands lightly behind your head.',
      'Lift your shoulders and bring your knees to a tabletop position.',
      'Rotate your torso and bring the opposite elbow toward the opposite knee.',
      'Switch sides in a slow, controlled pedaling motion.',
    ],
    videoUrl: VIDEO.hangingCrunches,
    imageUrl: '/assets/images/bicycle-crunch.svg',
  },
  {
    id: 11,
    name: 'Downward Dog',
    category: 'Flexibility',
    muscleGroup: 'Full Body',
    difficulty: 'Beginner',
    instructions: [
      'Start on your hands and knees with shoulders over wrists.',
      'Tuck your toes and lift your hips up and back.',
      'Press your heels toward the floor and relax your neck.',
      'Hold the stretch while keeping a long spine.',
    ],
    videoUrl: VIDEO.yogaTree,
    imageUrl: '/assets/images/downward-dog.svg',
  },
  {
    id: 12,
    name: 'Bent-Over Row',
    category: 'Strength',
    muscleGroup: 'Back',
    difficulty: 'Intermediate',
    instructions: [
      'Hinge at the hips until your torso is nearly parallel to the floor.',
      'Hold the weights with your arms hanging under your shoulders.',
      'Pull the weights toward your ribs and squeeze your shoulder blades.',
      'Lower the weights with control without rounding your back.',
    ],
    videoUrl: VIDEO.bentOverRow,
    imageUrl: '/assets/images/bent-over-row.svg',
  },
];

export const audioTracks = [
  {
    id: 1,
    title: 'Power Up',
    src: '/assets/audio/power-up.mp3',
  },
  {
    id: 2,
    title: 'Stay Strong',
    src: '/assets/audio/stay-strong.mp3',
  },
];
