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

    // Calendar Elements
    const calendarMonthYear = document.getElementById('calendar-month-year');
    const calendarGrid = document.querySelector('.calendar-grid');
    const workoutsMonthCount = document.getElementById('workouts-month-count');
    const consistencyPercent = document.getElementById('consistency-percent');
    
    // New Calendar Enhancements
    const calendarSummary = document.getElementById('calendar-summary');
    const calendarExpanded = document.getElementById('calendar-expanded');
    const toggleCalendarDown = document.getElementById('toggle-calendar-down');
    const toggleCalendarUp = document.getElementById('toggle-calendar-up');
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const goTodayBtn = document.getElementById('go-today-btn');
    const summaryWorkouts = document.getElementById('summary-workouts');
    const summaryConsistency = document.getElementById('summary-consistency');
    
    // Modal Elements
    const calendarModal = document.getElementById('calendar-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalDate = document.getElementById('modal-date');
    const modalStatus = document.getElementById('modal-status');
    const modalDetails = document.getElementById('modal-details');

    // State
    let currentDayId = null;
    let currentViewDate = new Date();
    let currentViewMonth = currentViewDate.getMonth();
    let currentViewYear = currentViewDate.getFullYear();

    // Helper: Get formatted date string (YYYY-MM-DD)
    const getDateString = (dateObj) => {
        return `${dateObj.getFullYear()}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${String(dateObj.getDate()).padStart(2, '0')}`;
    };

    const getTodayString = () => getDateString(new Date());

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

        // Automatically mark day as completed if all exercises are done
        if (completedCount === total && total > 0) {
            if (localStorage.getItem(`gym_dayCompleted_${today}`) !== 'true') {
                localStorage.setItem(`gym_dayCompleted_${today}`, 'true');
                updateStreak(); // Auto update streak
                renderCalendar();
            }
        } else if (completedCount < total && localStorage.getItem(`gym_dayCompleted_${today}`) === 'true') {
            localStorage.setItem(`gym_dayCompleted_${today}`, 'false');
            renderCalendar();
        }
    };

    // --- Calendar Logic ---
    const isDayCompleted = (dateStr) => {
        return localStorage.getItem(`gym_dayCompleted_${dateStr}`) === 'true';
    };

    const toggleDayCompletion = (dateStr) => {
        if (isDayCompleted(dateStr)) {
            localStorage.removeItem(`gym_dayCompleted_${dateStr}`);
        } else {
            localStorage.setItem(`gym_dayCompleted_${dateStr}`, 'true');
        }
        updateStreak();
        renderCalendar();
    };

    const renderCalendar = () => {
        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        calendarMonthYear.textContent = `${monthNames[currentViewMonth]} ${currentViewYear}`;
        
        // Remove existing day squares
        const daySquares = calendarGrid.querySelectorAll('.calendar-day');
        daySquares.forEach(el => el.remove());
        
        const firstDay = new Date(currentViewYear, currentViewMonth, 1).getDay();
        const daysInMonth = new Date(currentViewYear, currentViewMonth + 1, 0).getDate();
        
        // Add empty spaces for first day
        for (let i = 0; i < firstDay; i++) {
            const empty = document.createElement('div');
            empty.className = 'calendar-day empty';
            calendarGrid.appendChild(empty);
        }
        
        let completedCount = 0;
        let elapsedCount = 0;

        for (let date = 1; date <= daysInMonth; date++) {
            const currentObj = new Date(currentViewYear, currentViewMonth, date);
            const currentStr = getDateString(currentObj);
            
            const square = document.createElement('div');
            square.className = 'calendar-day';
            square.textContent = date;
            
            const completed = isDayCompleted(currentStr);
            
            const currentZero = new Date(currentObj); currentZero.setHours(0,0,0,0);
            const todayZero = new Date(); todayZero.setHours(0,0,0,0);
            
            if (completed) {
                square.classList.add('completed');
                completedCount++;
            } else if (currentZero.getTime() === todayZero.getTime()) {
                square.classList.add('today');
            } else if (currentZero.getTime() < todayZero.getTime()) {
                square.classList.add('missed');
            } else {
                square.classList.add('future');
            }
            
            if (currentZero.getTime() <= todayZero.getTime()) {
                elapsedCount++;
            }
            
            square.addEventListener('click', () => {
                toggleDayCompletion(currentStr);
                // After toggling, open modal with new state
                openModal(currentObj, currentStr, isDayCompleted(currentStr));
            });
            calendarGrid.appendChild(square);
        }
        
        const consistency = elapsedCount === 0 ? 0 : Math.round((completedCount / elapsedCount) * 100);
        
        // Update both expanded and collapsed stats
        workoutsMonthCount.textContent = completedCount;
        consistencyPercent.textContent = `${consistency}%`;
        summaryWorkouts.textContent = completedCount;
        summaryConsistency.textContent = `${consistency}%`;
    };

    const openModal = (dateObj, dateStr, completed) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        modalDate.textContent = dateObj.toLocaleDateString('en-GB', options);
        
        if (completed) {
            modalStatus.textContent = 'Workout Completed';
            modalStatus.className = 'modal-status completed';
            
            const daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            const dayName = daysMap[dateObj.getDay()];
            const workout = workoutData.find(w => w.name === dayName);
            
            if (workout) {
                modalDetails.textContent = `${workout.name} - ${workout.focus}\nCompleted`;
            } else {
                modalDetails.textContent = 'Workout Recorded';
            }
        } else {
            const currentZero = new Date(dateObj); currentZero.setHours(0,0,0,0);
            const todayZero = new Date(); todayZero.setHours(0,0,0,0);
            
            if (currentZero.getTime() > todayZero.getTime()) {
                modalStatus.textContent = 'Upcoming Day';
                modalStatus.className = 'modal-status';
            } else {
                modalStatus.textContent = 'Not Completed';
                modalStatus.className = 'modal-status missed';
            }
            modalDetails.textContent = '';
        }
        
        calendarModal.classList.remove('hidden');
    };

    // --- Expand / Collapse Logic ---
    const applyCalendarState = () => {
        const isExpanded = localStorage.getItem('gym_calendarExpanded') === 'true';
        if (isExpanded) {
            calendarSummary.classList.add('collapsed');
            calendarExpanded.classList.remove('collapsed');
        } else {
            calendarSummary.classList.remove('collapsed');
            calendarExpanded.classList.add('collapsed');
        }
    };

    const toggleCalendar = () => {
        const isExpanded = localStorage.getItem('gym_calendarExpanded') === 'true';
        localStorage.setItem('gym_calendarExpanded', !isExpanded);
        applyCalendarState();
    };

    toggleCalendarDown.addEventListener('click', toggleCalendar);
    toggleCalendarUp.addEventListener('click', toggleCalendar);

    // --- Month Navigation ---
    prevMonthBtn.addEventListener('click', () => {
        currentViewMonth--;
        if (currentViewMonth < 0) {
            currentViewMonth = 11;
            currentViewYear--;
        }
        renderCalendar();
    });

    nextMonthBtn.addEventListener('click', () => {
        currentViewMonth++;
        if (currentViewMonth > 11) {
            currentViewMonth = 0;
            currentViewYear++;
        }
        renderCalendar();
    });

    goTodayBtn.addEventListener('click', () => {
        const today = new Date();
        currentViewMonth = today.getMonth();
        currentViewYear = today.getFullYear();
        renderCalendar();
    });

    // --- Event Listeners ---
    closeModalBtn.addEventListener('click', () => {
        calendarModal.classList.add('hidden');
    });
    
    calendarModal.addEventListener('click', (e) => {
        if (e.target === calendarModal) calendarModal.classList.add('hidden');
    });

    backBtn.addEventListener('click', () => {
        showView('home');
    });

    // --- Init ---
    applyCalendarState();
    renderStreak();
    renderCalendar();
    renderHome();
});
