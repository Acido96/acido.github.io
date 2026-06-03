/* ============================================
   TrailFlame - Adventure Dating App
   Application JavaScript
   ============================================ */

(function () {
    'use strict';

    // ============================================
    // Loading Screen
    // ============================================
    window.addEventListener('load', function () {
        setTimeout(function () {
            const loader = document.getElementById('loading-screen');
            if (loader) loader.classList.add('hidden');
        }, 1800);
    });

    // ============================================
    // Navigation
    // ============================================
    const nav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', function () {
        if (window.scrollY > 40) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        updateActiveNav();
    });

    function updateActiveNav() {
        let current = '';
        const scrollPos = window.scrollY + 120;
        sections.forEach(function (section) {
            if (scrollPos >= section.offsetTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(function (link) {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }

    // Mobile menu
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinksContainer = document.getElementById('nav-links');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinksContainer.classList.toggle('mobile-open');
        });
    }

    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            navLinksContainer.classList.remove('mobile-open');
        });
    });

    // Smooth scroll helper
    window.scrollToSection = function (id) {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // ============================================
    // Animated Counters
    // ============================================
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(function (counter) {
            const target = parseInt(counter.getAttribute('data-count'), 10);
            const duration = 2000;
            const startTime = performance.now();

            function update(now) {
                const elapsed = now - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                const value = Math.floor(eased * target);
                counter.textContent = formatNumber(value);
                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = formatNumber(target);
                }
            }
            requestAnimationFrame(update);
        });
    }

    function formatNumber(num) {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
        }
        if (num >= 1000) {
            return (num / 1000).toFixed(0) + 'K';
        }
        return num.toString();
    }

    // Trigger counters when hero is visible
    let countersAnimated = false;
    const heroObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.3 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) heroObserver.observe(heroStats);

    // ============================================
    // Hero Particles
    // ============================================
    function createParticles() {
        const container = document.getElementById('hero-particles');
        if (!container) return;
        const count = 30;
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            const size = Math.random() * 4 + 2;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 15 + 10) + 's';
            particle.style.animationDelay = (Math.random() * 10) + 's';
            container.appendChild(particle);
        }
    }
    createParticles();

    // ============================================
    // Scroll Reveal Animation
    // ============================================
    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    const revealElements = document.querySelectorAll(
        '.activity-card, .event-card, .safety-card, .pricing-card, .testimonial-card, .feature-row, .group-card, .challenge-card'
    );
    revealElements.forEach(function (el, index) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease ' + (index % 4 * 0.08) + 's, transform 0.6s ease ' + (index % 4 * 0.08) + 's';
        revealObserver.observe(el);
    });

    // ============================================
    // Auth Modal
    // ============================================
    const authModal = document.getElementById('auth-modal');
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    window.showAuthModal = function (type) {
        authModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        switchAuth(type);
    };

    window.closeAuthModal = function () {
        authModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    window.switchAuth = function (type) {
        if (type === 'login') {
            loginForm.classList.remove('hidden');
            signupForm.classList.add('hidden');
        } else {
            signupForm.classList.remove('hidden');
            loginForm.classList.add('hidden');
        }
    };

    // Close modal on overlay click
    if (authModal) {
        authModal.addEventListener('click', function (e) {
            if (e.target === authModal) {
                closeAuthModal();
            }
        });
    }

    // Escape key closes modal
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && authModal.classList.contains('active')) {
            closeAuthModal();
        }
    });

    // ============================================
    // Password Visibility Toggle
    // ============================================
    window.togglePassword = function (id) {
        const input = document.getElementById(id);
        const btn = input.parentElement.querySelector('.password-toggle i');
        if (input.type === 'password') {
            input.type = 'text';
            btn.classList.remove('fa-eye');
            btn.classList.add('fa-eye-slash');
        } else {
            input.type = 'password';
            btn.classList.remove('fa-eye-slash');
            btn.classList.add('fa-eye');
        }
    };

    // ============================================
    // MFA Toggle
    // ============================================
    const useMfaCheckbox = document.getElementById('use-mfa');
    const mfaSection = document.getElementById('mfa-section');
    if (useMfaCheckbox) {
        useMfaCheckbox.addEventListener('change', function () {
            if (this.checked) {
                mfaSection.classList.remove('hidden');
            } else {
                mfaSection.classList.add('hidden');
            }
        });
    }

    // ============================================
    // Password Strength & Requirements
    // ============================================
    const signupPassword = document.getElementById('signup-password');
    if (signupPassword) {
        signupPassword.addEventListener('input', function () {
            checkPasswordStrength(this.value);
        });
    }

    function checkPasswordStrength(password) {
        const requirements = {
            length: password.length >= 12,
            upper: /[A-Z]/.test(password),
            lower: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password)
        };

        updateRequirement('req-length', requirements.length);
        updateRequirement('req-upper', requirements.upper);
        updateRequirement('req-lower', requirements.lower);
        updateRequirement('req-number', requirements.number);
        updateRequirement('req-special', requirements.special);

        const metCount = Object.values(requirements).filter(Boolean).length;
        const bars = document.querySelectorAll('.strength-bar');
        const strengthText = document.querySelector('.strength-text');
        const levels = ['', 'weak', 'fair', 'good', 'strong'];
        const labels = ['Password strength', 'Weak', 'Fair', 'Good', 'Strong'];

        bars.forEach(function (bar) {
            bar.className = 'strength-bar';
        });

        let activeBarCount = 0;
        if (metCount <= 2) activeBarCount = 1;
        else if (metCount === 3) activeBarCount = 2;
        else if (metCount === 4) activeBarCount = 3;
        else if (metCount === 5) activeBarCount = 4;

        const levelClass = levels[activeBarCount];
        for (let i = 0; i < activeBarCount; i++) {
            if (bars[i]) bars[i].classList.add(levelClass);
        }
        if (strengthText) strengthText.textContent = labels[activeBarCount] || 'Password strength';
    }

    function updateRequirement(id, met) {
        const el = document.getElementById(id);
        if (!el) return;
        if (met) {
            el.classList.add('met');
        } else {
            el.classList.remove('met');
        }
    }

    // ============================================
    // Form Validation
    // ============================================
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showError(id, message) {
        const errorEl = document.getElementById(id);
        if (errorEl) {
            errorEl.textContent = message;
            const input = document.getElementById(id.replace('-error', ''));
            if (input) input.classList.add('error');
        }
    }

    function clearError(id) {
        const errorEl = document.getElementById(id);
        if (errorEl) {
            errorEl.textContent = '';
            const input = document.getElementById(id.replace('-error', ''));
            if (input) input.classList.remove('error');
        }
    }

    // ============================================
    // Login Handler
    // ============================================
    window.handleLogin = function (event) {
        event.preventDefault();
        let valid = true;

        const email = document.getElementById('login-email').value.trim();
        const password = document.getElementById('login-password').value;

        clearError('login-email-error');
        clearError('login-password-error');

        if (!email) {
            showError('login-email-error', 'Email is required');
            valid = false;
        } else if (!validateEmail(email)) {
            showError('login-email-error', 'Please enter a valid email');
            valid = false;
        }

        if (!password) {
            showError('login-password-error', 'Password is required');
            valid = false;
        }

        // Check MFA if enabled
        const useMfa = document.getElementById('use-mfa').checked;
        if (useMfa) {
            const mfaCode = document.getElementById('mfa-code').value;
            if (!mfaCode || mfaCode.length !== 6) {
                showToast('error', 'Invalid Code', 'Please enter a valid 6-digit authentication code.');
                valid = false;
            }
        }

        if (valid) {
            const submitBtn = event.target.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Signing in...';
            submitBtn.disabled = true;

            // Simulate secure authentication
            setTimeout(function () {
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
                closeAuthModal();
                showToast('success', 'Welcome back!', 'You have securely signed in to TrailFlame.');
                setLoggedInState();
            }, 1500);
        }
    };

    // ============================================
    // Signup Handler
    // ============================================
    window.handleSignup = function (event) {
        event.preventDefault();
        let valid = true;

        const firstName = document.getElementById('signup-firstname').value.trim();
        const lastName = document.getElementById('signup-lastname').value.trim();
        const email = document.getElementById('signup-email').value.trim();
        const password = document.getElementById('signup-password').value;
        const confirm = document.getElementById('signup-confirm').value;
        const dob = document.getElementById('signup-dob').value;
        const terms = document.getElementById('signup-terms').checked;

        ['signup-firstname-error', 'signup-lastname-error', 'signup-email-error',
            'signup-password-error', 'signup-confirm-error', 'signup-dob-error',
            'signup-terms-error'].forEach(clearError);

        if (!firstName) {
            showError('signup-firstname-error', 'First name is required');
            valid = false;
        }
        if (!lastName) {
            showError('signup-lastname-error', 'Last name is required');
            valid = false;
        }
        if (!email) {
            showError('signup-email-error', 'Email is required');
            valid = false;
        } else if (!validateEmail(email)) {
            showError('signup-email-error', 'Please enter a valid email');
            valid = false;
        }

        // Strong password validation
        const pwReqs = {
            length: password.length >= 12,
            upper: /[A-Z]/.test(password),
            lower: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            special: /[^A-Za-z0-9]/.test(password)
        };
        const allMet = Object.values(pwReqs).every(Boolean);
        if (!password) {
            showError('signup-password-error', 'Password is required');
            valid = false;
        } else if (!allMet) {
            showError('signup-password-error', 'Password must meet all security requirements');
            valid = false;
        }

        if (password !== confirm) {
            showError('signup-confirm-error', 'Passwords do not match');
            valid = false;
        }

        if (!dob) {
            showError('signup-dob-error', 'Date of birth is required');
            valid = false;
        } else {
            const age = calculateAge(dob);
            if (age < 18) {
                showError('signup-dob-error', 'You must be 18 or older to join');
                valid = false;
            }
        }

        if (!terms) {
            showError('signup-terms-error', 'You must agree to the terms');
            valid = false;
        }

        if (valid) {
            const submitBtn = event.target.querySelector('button[type="submit"]');
            const originalHTML = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating account...';
            submitBtn.disabled = true;

            setTimeout(function () {
                submitBtn.innerHTML = originalHTML;
                submitBtn.disabled = false;
                closeAuthModal();
                showToast('success', 'Account created!', 'Welcome to TrailFlame, ' + firstName + '! Your adventure begins now.');
                setLoggedInState(firstName);

                // Request geolocation if opted in
                const locationOptIn = document.getElementById('signup-location').checked;
                if (locationOptIn) {
                    requestLocation();
                }
            }, 1800);
        }
    };

    function calculateAge(dob) {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    function setLoggedInState(name) {
        const loginBtn = document.getElementById('login-btn');
        const signupBtn = document.getElementById('signup-btn');
        if (loginBtn) loginBtn.style.display = 'none';
        if (signupBtn) {
            signupBtn.textContent = name ? 'Hi, ' + name : 'My Profile';
            signupBtn.onclick = function () {
                showToast('info', 'Profile', 'Profile dashboard would open here.');
            };
        }
    }

    // ============================================
    // Geolocation
    // ============================================
    function requestLocation() {
        if ('geolocation' in navigator) {
            showToast('info', 'Locating...', 'Requesting your GPS location for nearby matching.');
            navigator.geolocation.getCurrentPosition(
                function (position) {
                    // Fuzz the location for privacy (approximate only)
                    showToast('success', 'Location enabled', 'You can now see adventurers and events near you.');
                },
                function (error) {
                    showToast('error', 'Location unavailable', 'Enable location access to find nearby adventurers.');
                },
                { enableHighAccuracy: false, timeout: 8000 }
            );
        } else {
            showToast('error', 'Not supported', 'Geolocation is not supported by your browser.');
        }
    }

    const shareLocationBtn = document.getElementById('share-location-btn');
    if (shareLocationBtn) {
        shareLocationBtn.addEventListener('click', function () {
            requestLocation();
        });
    }

    // ============================================
    // Notification Panel
    // ============================================
    const notificationBtn = document.getElementById('notification-btn');
    const notificationPanel = document.getElementById('notification-panel');

    if (notificationBtn) {
        notificationBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            notificationPanel.classList.toggle('active');
        });
    }

    document.addEventListener('click', function (e) {
        if (notificationPanel && notificationPanel.classList.contains('active')) {
            if (!notificationPanel.contains(e.target) && e.target !== notificationBtn) {
                notificationPanel.classList.remove('active');
            }
        }
    });

    const markAllRead = document.querySelector('.mark-all-read');
    if (markAllRead) {
        markAllRead.addEventListener('click', function () {
            document.querySelectorAll('.notification-item.unread').forEach(function (item) {
                item.classList.remove('unread');
            });
            const badge = document.querySelector('.notification-badge');
            if (badge) badge.style.display = 'none';
            showToast('success', 'Notifications cleared', 'All notifications marked as read.');
        });
    }

    // ============================================
    // Profile Card Swiping (Discover)
    // ============================================
    const profileCard = document.getElementById('current-profile-card');
    const profiles = [
        {
            name: 'Sarah M., 28',
            img: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=500&fit=crop',
            distance: '3.2 mi away',
            score: '92%',
            bio: 'Trail runner & weekend climber. Training for my first ultra marathon. Looking for someone to share sunrise summits with 🌄',
            activities: [
                { icon: 'fa-running', label: 'Trail Running' },
                { icon: 'fa-mountain', label: 'Climbing V5' },
                { icon: 'fa-hiking', label: 'Hiking' }
            ],
            stats: [
                { icon: 'fa-route', text: '1,200 mi this year' },
                { icon: 'fa-trophy', text: '12 races completed' },
                { icon: 'fa-mountain', text: '45 peaks summited' }
            ],
            prompt: { label: 'My best adventure was...', text: 'Summiting Mt. Rainier at sunrise after a 2-day climb. The glacier traverse was unforgettable.' }
        },
        {
            name: 'Marcus T., 31',
            img: 'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?w=400&h=500&fit=crop',
            distance: '5.1 mi away',
            score: '88%',
            bio: 'Mountain biker and rock climber. Weekends are for adventures. Coffee snob and dog dad. Lets find a new crag together!',
            activities: [
                { icon: 'fa-bicycle', label: 'Mountain Biking' },
                { icon: 'fa-mountain', label: 'Climbing V7' },
                { icon: 'fa-campground', label: 'Camping' }
            ],
            stats: [
                { icon: 'fa-route', text: '2,400 mi biked' },
                { icon: 'fa-mountain', text: '60 routes sent' },
                { icon: 'fa-fire', text: '45-day streak' }
            ],
            prompt: { label: 'My ideal first date...', text: 'A morning bike ride followed by coffee and bouldering at the local gym.' }
        },
        {
            name: 'Elena R., 26',
            img: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=500&fit=crop',
            distance: '1.8 mi away',
            score: '95%',
            bio: 'Ultra runner & yoga enthusiast. Just finished my first 100-miler! Looking for a partner who loves early mornings and big mountains.',
            activities: [
                { icon: 'fa-running', label: 'Ultra Running' },
                { icon: 'fa-hiking', label: 'Backpacking' },
                { icon: 'fa-water', label: 'Kayaking' }
            ],
            stats: [
                { icon: 'fa-route', text: '1,850 mi this year' },
                { icon: 'fa-trophy', text: '1 hundred-miler' },
                { icon: 'fa-mountain', text: '28 peaks summited' }
            ],
            prompt: { label: 'Im training for...', text: 'The Western States 100. Always looking for long run partners on weekends!' }
        },
        {
            name: 'Jordan K., 29',
            img: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=500&fit=crop',
            distance: '4.4 mi away',
            score: '90%',
            bio: 'Alpinist and ski mountaineer. Happiest above treeline. Looking for someone to share epic objectives and quiet summit moments.',
            activities: [
                { icon: 'fa-skiing', label: 'Ski Mountaineering' },
                { icon: 'fa-mountain', label: 'Alpine Climbing' },
                { icon: 'fa-hiking', label: 'Mountaineering' }
            ],
            stats: [
                { icon: 'fa-mountain', text: '15 alpine summits' },
                { icon: 'fa-skiing', text: '40 backcountry days' },
                { icon: 'fa-route', text: '900 mi skinned' }
            ],
            prompt: { label: 'My dream expedition...', text: 'A ski traverse of the Sierra High Route. Looking for a reliable rope partner.' }
        }
    ];

    let currentProfileIndex = 0;

    function renderProfile(index) {
        const profile = profiles[index % profiles.length];
        if (!profileCard || !profile) return;

        profileCard.innerHTML =
            '<div class="card-image-container">' +
            '<img src="' + profile.img + '" alt="Profile" class="card-image">' +
            '<div class="card-badges">' +
            '<span class="badge badge-verified"><i class="fas fa-check-circle"></i> Verified</span>' +
            '<span class="badge badge-active"><i class="fas fa-circle"></i> Active Today</span>' +
            '</div>' +
            '<div class="card-distance"><i class="fas fa-map-marker-alt"></i> ' + profile.distance + '</div>' +
            '</div>' +
            '<div class="card-info">' +
            '<div class="card-header">' +
            '<h3>' + profile.name + '</h3>' +
            '<div class="compatibility-score"><span class="score">' + profile.score + '</span><span class="score-label">Match</span></div>' +
            '</div>' +
            '<p class="card-bio">' + profile.bio + '</p>' +
            '<div class="card-activities">' +
            profile.activities.map(function (a) {
                return '<span class="activity-tag"><i class="fas ' + a.icon + '"></i> ' + a.label + '</span>';
            }).join('') +
            '</div>' +
            '<div class="card-stats">' +
            profile.stats.map(function (s) {
                return '<div class="card-stat"><i class="fas ' + s.icon + '"></i><span>' + s.text + '</span></div>';
            }).join('') +
            '</div>' +
            '<div class="card-prompts"><div class="prompt-item">' +
            '<span class="prompt-label">' + profile.prompt.label + '</span>' +
            '<p>' + profile.prompt.text + '</p>' +
            '</div></div>' +
            '</div>' +
            '<div class="card-actions">' +
            '<button class="action-btn action-pass" title="Pass" aria-label="Pass"><i class="fas fa-times"></i></button>' +
            '<button class="action-btn action-superlike" title="Super Like" aria-label="Super Like"><i class="fas fa-star"></i></button>' +
            '<button class="action-btn action-like" title="Like" aria-label="Like"><i class="fas fa-heart"></i></button>' +
            '<button class="action-btn action-adventure" title="Propose Adventure" aria-label="Propose Adventure"><i class="fas fa-compass"></i></button>' +
            '</div>';

        attachCardActions();
    }

    function attachCardActions() {
        const passBtn = profileCard.querySelector('.action-pass');
        const likeBtn = profileCard.querySelector('.action-like');
        const superlikeBtn = profileCard.querySelector('.action-superlike');
        const adventureBtn = profileCard.querySelector('.action-adventure');

        if (passBtn) passBtn.addEventListener('click', function () { swipeCard('pass'); });
        if (likeBtn) likeBtn.addEventListener('click', function () { swipeCard('like'); });
        if (superlikeBtn) superlikeBtn.addEventListener('click', function () { swipeCard('superlike'); });
        if (adventureBtn) adventureBtn.addEventListener('click', function () { swipeCard('adventure'); });
    }

    function swipeCard(action) {
        const currentProfile = profiles[currentProfileIndex % profiles.length];

        if (action === 'pass') {
            profileCard.style.transform = 'translateX(-120%) rotate(-15deg)';
            profileCard.style.opacity = '0';
        } else if (action === 'like') {
            profileCard.style.transform = 'translateX(120%) rotate(15deg)';
            profileCard.style.opacity = '0';
            // Random match chance
            if (Math.random() > 0.4) {
                setTimeout(function () { showMatch(currentProfile); }, 300);
            } else {
                showToast('success', 'Liked!', 'You liked ' + currentProfile.name.split(',')[0] + '. We will let you know if they like you back!');
            }
        } else if (action === 'superlike') {
            profileCard.style.transform = 'translateY(-120%) rotate(5deg)';
            profileCard.style.opacity = '0';
            showToast('info', 'Super Like sent!', 'You super liked ' + currentProfile.name.split(',')[0] + '. They will be notified!');
            setTimeout(function () { showMatch(currentProfile); }, 400);
        } else if (action === 'adventure') {
            showToast('info', 'Adventure proposed!', 'Your adventure invite was sent to ' + currentProfile.name.split(',')[0] + '.');
            return;
        }

        setTimeout(function () {
            currentProfileIndex++;
            profileCard.style.transition = 'none';
            profileCard.style.transform = 'scale(0.9)';
            profileCard.style.opacity = '0';
            renderProfile(currentProfileIndex);
            requestAnimationFrame(function () {
                profileCard.style.transition = 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
                profileCard.style.transform = 'scale(1)';
                profileCard.style.opacity = '1';
            });
        }, 400);
    }

    // Initial card actions
    attachCardActions();

    // ============================================
    // Match Modal
    // ============================================
    function showMatch(profile) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay active';
        modal.innerHTML =
            '<div class="modal-content match-modal-content">' +
            '<button class="modal-close">&times;</button>' +
            '<h2 class="match-title">It\'s a Match!</h2>' +
            '<p>You and ' + profile.name.split(',')[0] + ' both want to adventure together.</p>' +
            '<div class="match-photos">' +
            '<img src="https://i.pravatar.cc/120?img=8" alt="You">' +
            '<div class="match-heart"><i class="fas fa-heart"></i></div>' +
            '<img src="' + profile.img + '" alt="' + profile.name + '">' +
            '</div>' +
            '<div style="display:flex; gap:12px; margin-top:24px;">' +
            '<button class="btn btn-primary btn-block send-msg-btn"><i class="fas fa-comment"></i> Send a Message</button>' +
            '</div>' +
            '<button class="btn btn-outline btn-block keep-swiping-btn" style="margin-top:12px;">Keep Swiping</button>' +
            '</div>';

        document.body.appendChild(modal);
        document.body.style.overflow = 'hidden';

        function close() {
            modal.remove();
            document.body.style.overflow = '';
        }

        modal.querySelector('.modal-close').addEventListener('click', close);
        modal.querySelector('.keep-swiping-btn').addEventListener('click', close);
        modal.querySelector('.send-msg-btn').addEventListener('click', function () {
            close();
            scrollToSection('messages');
            showToast('success', 'Chat opened', 'Start planning your first adventure together!');
        });
        modal.addEventListener('click', function (e) {
            if (e.target === modal) close();
        });
    }

    // ============================================
    // Filter Interactions
    // ============================================
    document.querySelectorAll('.filter-tags').forEach(function (group) {
        group.querySelectorAll('.filter-tag').forEach(function (tag) {
            tag.addEventListener('click', function () {
                group.querySelectorAll('.filter-tag').forEach(function (t) {
                    t.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    });

    // Distance range display
    const distanceRange = document.getElementById('distance-range');
    const distanceValue = document.getElementById('distance-value');
    if (distanceRange && distanceValue) {
        distanceRange.addEventListener('input', function () {
            distanceValue.textContent = this.value + ' miles';
        });
    }

    // Activity card click -> scroll to discover
    document.querySelectorAll('.activity-card').forEach(function (card) {
        card.addEventListener('click', function () {
            const activity = this.getAttribute('data-activity');
            scrollToSection('discover');
            showToast('info', 'Filter applied', 'Showing matches who love ' + (this.querySelector('h3').textContent) + '.');
        });
    });

    // ============================================
    // Event Tabs
    // ============================================
    document.querySelectorAll('.event-tab').forEach(function (tab) {
        tab.addEventListener('click', function () {
            document.querySelectorAll('.event-tab').forEach(function (t) {
                t.classList.remove('active');
            });
            this.classList.add('active');
            const tabName = this.getAttribute('data-tab');
            if (tabName === 'create') {
                showToast('info', 'Create Event', 'The event creation form would open here.');
            }
        });
    });

    // Event RSVP buttons
    document.querySelectorAll('.event-actions .btn-primary').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const card = this.closest('.event-card');
            const title = card.querySelector('h3').textContent;
            if (this.textContent.trim() === 'RSVP' || this.textContent.trim() === 'Register') {
                this.innerHTML = '<i class="fas fa-check"></i> Going';
                this.classList.remove('btn-primary');
                this.classList.add('btn-outline');
                showToast('success', 'You\'re going!', 'You RSVP\'d to "' + title + '". See you there!');
            }
        });
    });

    // ============================================
    // Group Join buttons
    // ============================================
    document.querySelectorAll('.group-info .btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            if (this.textContent.trim() === 'Join') {
                this.textContent = 'Joined';
                this.classList.add('btn-primary');
                this.classList.remove('btn-outline');
                const groupName = this.closest('.group-info').querySelector('h4').textContent;
                showToast('success', 'Joined group', 'Welcome to ' + groupName + '!');
            } else {
                this.textContent = 'Join';
                this.classList.remove('btn-primary');
                this.classList.add('btn-outline');
            }
        });
    });

    // ============================================
    // Chat Input
    // ============================================
    const chatInput = document.querySelector('.chat-input');
    const sendBtn = document.querySelector('.send-btn');
    const chatMessages = document.querySelector('.chat-messages');

    function sendMessage() {
        if (!chatInput || !chatInput.value.trim()) return;
        const text = chatInput.value.trim();

        const messageEl = document.createElement('div');
        messageEl.className = 'chat-message sent';
        const now = new Date();
        const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        messageEl.innerHTML =
            '<div class="message-bubble"><p>' + escapeHtml(text) + '</p>' +
            '<span class="message-timestamp">' + time + '</span></div>';
        chatMessages.appendChild(messageEl);
        chatInput.value = '';
        chatMessages.scrollTop = chatMessages.scrollHeight;

        // Simulate reply
        setTimeout(function () {
            const reply = document.createElement('div');
            reply.className = 'chat-message received';
            const replies = [
                'Sounds great! Can\'t wait 🏔️',
                'I\'m so in for that!',
                'Perfect, let\'s do it!',
                'That works for me. What should I bring?',
                'Awesome, see you on the trail!'
            ];
            const replyText = replies[Math.floor(Math.random() * replies.length)];
            reply.innerHTML =
                '<img src="https://i.pravatar.cc/28?img=15" alt="Alex">' +
                '<div class="message-bubble"><p>' + replyText + '</p>' +
                '<span class="message-timestamp">' + time + '</span></div>';
            chatMessages.appendChild(reply);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }, 1200);
    }

    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    if (sendBtn) sendBtn.addEventListener('click', sendMessage);
    if (chatInput) {
        chatInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    // Message list selection
    document.querySelectorAll('.message-item').forEach(function (item) {
        item.addEventListener('click', function () {
            document.querySelectorAll('.message-item').forEach(function (i) {
                i.classList.remove('active');
            });
            this.classList.add('active');
            const dot = this.querySelector('.unread-dot');
            if (dot) dot.remove();
            const name = this.querySelector('.message-name').textContent;
            const chatName = document.querySelector('.chat-name');
            if (chatName) chatName.textContent = name;
        });
    });

    // Chat action buttons
    document.querySelectorAll('.chat-action-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const title = this.getAttribute('title');
            showToast('info', title, 'The "' + title + '" feature would open here.');
        });
    });

    // Adventure proposal accept buttons
    document.addEventListener('click', function (e) {
        if (e.target.closest('.adventure-actions-mini .btn-primary')) {
            const btn = e.target.closest('.btn-primary');
            btn.innerHTML = '<i class="fas fa-check"></i> Accepted';
            showToast('success', 'Adventure confirmed!', 'Your adventure date is set. Stay safe out there!');
        }
    });

    // ============================================
    // Map Marker Interactions
    // ============================================
    document.querySelectorAll('.map-marker').forEach(function (marker) {
        marker.addEventListener('click', function () {
            const title = this.getAttribute('title');
            if (title) {
                showToast('info', 'Map Pin', title);
            }
        });
    });

    document.querySelectorAll('.nearby-item').forEach(function (item) {
        item.addEventListener('click', function () {
            const name = this.querySelector('.nearby-name').textContent;
            showToast('info', 'View profile', 'Opening ' + name + '\'s profile.');
        });
    });

    // ============================================
    // Toast Notifications
    // ============================================
    let toastContainer = document.querySelector('.toast-container');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.className = 'toast-container';
        document.body.appendChild(toastContainer);
    }

    function showToast(type, title, message) {
        const icons = {
            success: 'fa-check-circle',
            error: 'fa-exclamation-circle',
            info: 'fa-info-circle'
        };
        const toast = document.createElement('div');
        toast.className = 'toast ' + type;
        toast.innerHTML =
            '<i class="fas ' + (icons[type] || icons.info) + '"></i>' +
            '<div class="toast-content">' +
            '<div class="toast-title">' + title + '</div>' +
            '<div class="toast-message">' + message + '</div>' +
            '</div>';
        toastContainer.appendChild(toast);

        setTimeout(function () {
            toast.classList.add('removing');
            setTimeout(function () {
                toast.remove();
            }, 300);
        }, 4000);
    }

    window.showToast = showToast;

    // Social auth buttons
    document.querySelectorAll('.social-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const provider = this.textContent.trim();
            showToast('info', 'Connecting...', 'Redirecting to ' + provider + ' secure sign-in.');
        });
    });

    // Pricing buttons
    document.querySelectorAll('.pricing-card .btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const plan = this.closest('.pricing-card').querySelector('h3').textContent;
            if (plan === 'Explorer') {
                showAuthModal('signup');
            } else {
                showToast('info', plan + ' Plan', 'Starting your ' + plan + ' subscription flow.');
            }
        });
    });

    // Hero CTA already wired via onclick

    // ============================================
    // Toggle controls feedback
    // ============================================
    document.querySelectorAll('.toggle-control input').forEach(function (toggle) {
        toggle.addEventListener('change', function () {
            const label = this.parentElement.querySelector('.toggle-label').textContent;
            const state = this.checked ? 'shown' : 'hidden';
            showToast('info', 'Map updated', label + ' are now ' + state + '.');
        });
    });

    console.log('%c🔥 TrailFlame loaded! Your adventure awaits.', 'color: #ff6b35; font-size: 16px; font-weight: bold;');
})();
