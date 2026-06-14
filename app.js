document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const views = {
        home: document.getElementById('home-view'),
        workout: document.getElementById('workout-view')
    };
    const daysContainer = document.getElementById('days-container');
    const exercisesContainer = document.getElementById('exercises-container');
    const backBtn = document.getElementById('back-btn');
    const workoutDayTitle = document.getElementById('workout-day-title');
    const progressCompleted = document.getElementById('progress-completed');
    const progressTotal = document.getElementById('progress-total');
    const progressBarFill = document.getElementById('progress-bar-fill');
    const streakCountEl = document.getElementById('streak-count');

    // State
    let currentDayId = null;

    // Helper: Get today's date string (YYYY-MM-DD)
    const getTodayString = () => {
        const today = new Date();
        return `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    };

    // Helper: Calculate days between two date strings
    const getDaysDifference = (dateStr1, dateStr2) => {
        const d1 = new Date(dateStr1);
        const d2 = new Date(dateStr2);
        // Reset times to midnight
        d1.setHours(0, 0, 0, 0);
        d2.setHours(0, 0, 0, 0);
        const diffTime = Math.abs(d2 - d1);
        return Math.floor(diffTime / (1000 * 60 * 60 * 24));
    };

    // --- Streak Logic ---
    const updateStreak = () => {
        const today = getTodayString();
        const lastActiveDate = localStorage.getItem('gym_lastActiveDate');
        let streak = parseInt(localStorage.getItem('gym_streak')) || 0;

        if (lastActiveDate) {
            const diff = getDaysDifference(lastActiveDate, today);
            if (diff === 1) {
                // Consecutive day
                streak += 1;
            } else if (diff > 1) {
                // Streak broken
                streak = 1;
            }
            // if diff === 0, same day, streak remains same
        } else {
            // First time working out
            streak = 1;
        }

        localStorage.setItem('gym_lastActiveDate', today);
        localStorage.setItem('gym_streak', streak);
        renderStreak();
    };

    const renderStreak = () => {
        const streak = parseInt(localStorage.getItem('gym_streak')) || 0;
        streakCountEl.textContent = streak;
    };

    // --- Navigation ---
    const showView = (viewName) => {
        Object.values(views).forEach(v => v.classList.remove('active'));
        views[viewName].classList.add('active');
        window.scrollTo(0, 0);
    };

    // --- Render Home ---
    const renderHome = () => {
        daysContainer.innerHTML = '';
        workoutData.forEach(day => {
            const card = document.createElement('div');
            card.className = 'day-card';
            card.innerHTML = `
                <div class="day-info">
                    <h3>${day.name}</h3>
                    <p>${day.focus}</p>
                </div>
                <div class="day-arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </div>
            `;
            card.addEventListener('click', () => openWorkoutDay(day.id));
            daysContainer.appendChild(card);
        });
    };

    // --- Render Workout Day ---
    const openWorkoutDay = (dayId) => {
        currentDayId = dayId;
        const dayData = workoutData.find(d => d.id === dayId);
        if (!dayData) return;

        workoutDayTitle.textContent = `${dayData.name} - ${dayData.focus}`;
        renderExercises(dayData);
        updateProgress(dayData);
        showView('workout');
    };

    const renderExercises = (dayData) => {
        exercisesContainer.innerHTML = '';
        const today = getTodayString();
        
        dayData.exercises.forEach((ex, index) => {
            // Key format: completed_YYYY-MM-DD_mon-1
            const storageKey = `completed_${today}_${ex.id}`;
            const isCompleted = localStorage.getItem(storageKey) === 'true';

            const card = document.createElement('div');
            card.className = `exercise-card ${isCompleted ? 'completed' : ''}`;
            card.id = `card-${ex.id}`;

            card.innerHTML = `
                <div class="exercise-title">${index + 1}. ${ex.name}</div>
                <div class="exercise-details">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    ${ex.sets} Sets × ${ex.reps} Reps
                </div>
                <div class="exercise-actions">
                    <button class="btn-primary" onclick="window.open('https://www.google.com/search?tbm=isch&q=${encodeURIComponent(ex.name + ' exercise')}', '_blank')">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        View Exercise
                    </button>
                    
                    <label class="checkbox-container" style="margin-top: 8px;">
                        <input type="checkbox" class="exercise-checkbox" data-id="${ex.id}" ${isCompleted ? 'checked' : ''}>
                        <div class="checkmark"></div>
                        <span class="checkbox-text">Completed</span>
                    </label>
                </div>
            `;
            exercisesContainer.appendChild(card);
        });

        // Add Event Listeners for checkboxes
        document.querySelectorAll('.exercise-checkbox').forEach(cb => {
            cb.addEventListener('change', (e) => {
                const isChecked = e.target.checked;
                const exId = e.target.getAttribute('data-id');
                const card = document.getElementById(`card-${exId}`);
                
                // Visual update
                if (isChecked) {
                    card.classList.add('completed');
                    updateStreak(); // Update streak whenever an exercise is completed
                } else {
                    card.classList.remove('completed');
                }

                // Save state for today
                const storageKey = `completed_${today}_${exId}`;
                localStorage.setItem(storageKey, isChecked);

                // Update Progress Bar
                updateProgress(dayData);
            });
        });
    };

    // --- Progress Logic ---
    const updateProgress = (dayData) => {
        const today = getTodayString();
        let completedCount = 0;
        const total = dayData.exercises.length;

        dayData.exercises.forEach(ex => {
            const storageKey = `completed_${today}_${ex.id}`;
            if (localStorage.getItem(storageKey) === 'true') {
                completedCount++;
            }
        });

        progressCompleted.textContent = completedCount;
        progressTotal.textContent = total;

        const percentage = total === 0 ? 0 : Math.round((completedCount / total) * 100);
        progressBarFill.style.width = `${percentage}%`;
    };

    // --- Event Listeners ---
    backBtn.addEventListener('click', () => {
        showView('home');
    });

    // --- Init ---
    renderStreak();
    renderHome();
});
