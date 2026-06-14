const workoutData = [
    {
        id: 'monday',
        name: 'Monday',
        focus: 'Chest + Shoulder',
        exercises: [
            { id: 'mon-1', name: 'Machine Chest Press', sets: 3, reps: '15,15,15' },
            { id: 'mon-2', name: 'DB Incline Chest Press', sets: 3, reps: '15,15,15' },
            { id: 'mon-3', name: 'Machine Fly', sets: 3, reps: '15,15,15' },
            { id: 'mon-4', name: 'Machine Shoulder Press', sets: 3, reps: '15,15,15' },
            { id: 'mon-5', name: 'Dumbbell Lateral Raise', sets: 3, reps: '15,15,15' },
            { id: 'mon-6', name: 'Cable Rope Face Pull', sets: 3, reps: '15,15,15' },
            { id: 'mon-7', name: 'Shrugs', sets: 3, reps: '15,15,15' }
        ]
    },
    {
        id: 'tuesday',
        name: 'Tuesday',
        focus: 'Back Bicep Tricep',
        exercises: [
            { id: 'tue-1', name: 'Lat Pull Down Cable', sets: 3, reps: '15,15,15' },
            { id: 'tue-2', name: 'Machine Assisted Pull Up', sets: 3, reps: '15,15,15' },
            { id: 'tue-3', name: 'Reverse Grip Lat Pull Down', sets: 3, reps: '15,15,15' },
            { id: 'tue-4', name: 'Cable Seated Row', sets: 3, reps: '15,15,15' },
            { id: 'tue-5', name: 'Barbell Curl', sets: 3, reps: '15,15,15' },
            { id: 'tue-6', name: 'Cable Rope Hammer Curls', sets: 3, reps: '15,15,15' },
            { id: 'tue-7', name: 'Barbell Standing Overhead Triceps Extension', sets: 3, reps: '15,15,15' },
            { id: 'tue-8', name: 'Triceps Pushdown V Bar', sets: 3, reps: '15,15,15' }
        ]
    },
    {
        id: 'wednesday',
        name: 'Wednesday',
        focus: 'Legs Abs',
        exercises: [
            { id: 'wed-1', name: 'Body Weight Squats', sets: 3, reps: '15,15,15' },
            { id: 'wed-2', name: 'Dumbbell Squat', sets: 3, reps: '15,15,15' },
            { id: 'wed-3', name: 'Leg Press', sets: 3, reps: '15,15,15' },
            { id: 'wed-4', name: 'Machine Abduction', sets: 3, reps: '15,15,15' },
            { id: 'wed-5', name: 'Adduction Machine', sets: 3, reps: '15,15,15' },
            { id: 'wed-6', name: 'Leg Curl', sets: 3, reps: '15,15,15' },
            { id: 'wed-7', name: 'Leg Extensions', sets: 3, reps: '15,15,15' },
            { id: 'wed-8', name: 'Calf Raise', sets: 3, reps: '15,15,15' },
            { id: 'wed-9', name: 'Bicycle Crunch', sets: 3, reps: '15,15,15' },
            { id: 'wed-10', name: 'Alternate Leg Raise', sets: 3, reps: '15,15,15' },
            { id: 'wed-11', name: 'Crunches', sets: 3, reps: '15,15,15' },
            { id: 'wed-12', name: 'Leg Raise', sets: 3, reps: '15,15,15' }
        ]
    },
    {
        id: 'thursday',
        name: 'Thursday',
        focus: 'Chest Shoulder',
        exercises: [
            { id: 'thu-1', name: 'Machine Chest Press', sets: 3, reps: '15,15,15' },
            { id: 'thu-2', name: 'DB Incline Chest Press', sets: 3, reps: '15,15,15' },
            { id: 'thu-3', name: 'Machine Fly', sets: 3, reps: '15,15,15' },
            { id: 'thu-4', name: 'Machine Shoulder Press', sets: 3, reps: '15,15,15' },
            { id: 'thu-5', name: 'Dumbbell Seated Side Lateral Raise', sets: 3, reps: '15,15,15' },
            { id: 'thu-6', name: 'Cable Rope Face Pull', sets: 3, reps: '15,15,15' },
            { id: 'thu-7', name: 'Shrugs', sets: 3, reps: '15,15,15' }
        ]
    },
    {
        id: 'friday',
        name: 'Friday',
        focus: 'Back Bicep Tricep',
        exercises: [
            { id: 'fri-1', name: 'Lat Pull Down Cable', sets: 3, reps: '15,15,15' },
            { id: 'fri-2', name: 'Machine Assisted Pull Up', sets: 3, reps: '15,15,15' },
            { id: 'fri-3', name: 'Reverse Grip Lat Pull Down', sets: 3, reps: '15,15,15' },
            { id: 'fri-4', name: 'Cable Seated Row', sets: 3, reps: '15,15,15' },
            { id: 'fri-5', name: 'Dumbbell Bicep Curl', sets: 3, reps: '15,15,15' },
            { id: 'fri-6', name: 'Dumbbell Hammer Curls', sets: 3, reps: '15,15,15' },
            { id: 'fri-7', name: 'Dumbbell Standing Triceps Extension', sets: 3, reps: '15,15,15' },
            { id: 'fri-8', name: 'Tricep Pushdown', sets: 3, reps: '15,15,15' }
        ]
    },
    {
        id: 'saturday',
        name: 'Saturday',
        focus: 'Legs Abs',
        exercises: [
            { id: 'sat-1', name: 'Body Weight Squats', sets: 3, reps: '15,15,15' },
            { id: 'sat-2', name: 'Dumbbell Squat', sets: 3, reps: '15,15,15' },
            { id: 'sat-3', name: 'Leg Press Horizontal', sets: 3, reps: '15,15,15' },
            { id: 'sat-4', name: 'Machine Abduction', sets: 3, reps: '15,15,15' },
            { id: 'sat-5', name: 'Adduction Machine', sets: 3, reps: '15,15,15' },
            { id: 'sat-6', name: 'Lying Leg Curls', sets: 3, reps: '15,15,15' },
            { id: 'sat-7', name: 'Leg Extensions', sets: 3, reps: '15,15,15' },
            { id: 'sat-8', name: 'Calf Raise', sets: 3, reps: '15,15,15' },
            { id: 'sat-9', name: 'Crunches', sets: 3, reps: '15,15,15' },
            { id: 'sat-10', name: 'Alternate Leg Raise', sets: 3, reps: '15,15,15' }
        ]
    }
];
