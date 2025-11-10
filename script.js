// Quotes Database
const quotes = {
    study: [
        {
            text: "The beautiful thing about learning is that no one can take it away from you.",
            author: "B.B. King"
        },
        {
            text: "Education is the most powerful weapon which you can use to change the world.",
            author: "Nelson Mandela"
        },
        {
            text: "The expert in anything was once a beginner.",
            author: "Helen Hayes"
        },
        {
            text: "Live as if you were to die tomorrow. Learn as if you were to live forever.",
            author: "Mahatma Gandhi"
        },
        {
            text: "The capacity to learn is a gift; the ability to learn is a skill; the willingness to learn is a choice.",
            author: "Brian Herbert"
        },
        {
            text: "Learning never exhausts the mind.",
            author: "Leonardo da Vinci"
        },
        {
            text: "Study hard what interests you the most in the most undisciplined, irreverent and original manner possible.",
            author: "Richard Feynman"
        },
        {
            text: "Knowledge is power. Information is liberating. Education is the premise of progress, in every society, in every family.",
            author: "Kofi Annan"
        }
    ],
    work: [
        {
            text: "Choose a job you love, and you will never have to work a day in your life.",
            author: "Confucius"
        },
        {
            text: "The only way to do great work is to love what you do.",
            author: "Steve Jobs"
        },
        {
            text: "Work hard in silence, let your success be your noise.",
            author: "Frank Ocean"
        },
        {
            text: "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful.",
            author: "Albert Schweitzer"
        },
        {
            text: "The way to get started is to quit talking and begin doing.",
            author: "Walt Disney"
        },
        {
            text: "Don't be afraid to give up the good to go for the great.",
            author: "John D. Rockefeller"
        },
        {
            text: "Innovation distinguishes between a leader and a follower.",
            author: "Steve Jobs"
        },
        {
            text: "The future depends on what you do today.",
            author: "Mahatma Gandhi"
        }
    ],
    hardwork: [
        {
            text: "The only place where success comes before work is in the dictionary.",
            author: "Vidal Sassoon"
        },
        {
            text: "Hard work beats talent when talent doesn't work hard.",
            author: "Tim Notke"
        },
        {
            text: "There are no shortcuts to any place worth going.",
            author: "Beverly Sills"
        },
        {
            text: "I'm a great believer in luck, and I find the harder I work, the more I have of it.",
            author: "Thomas Jefferson"
        },
        {
            text: "Success is the sum of small efforts repeated day in and day out.",
            author: "Robert Collier"
        },
        {
            text: "The difference between ordinary and extraordinary is that little extra.",
            author: "Jimmy Johnson"
        },
        {
            text: "Don't watch the clock; do what it does. Keep going.",
            author: "Sam Levenson"
        },
        {
            text: "Great things never come from comfort zones.",
            author: "Roy T. Bennett"
        },
        {
            text: "The harder you work for something, the greater you'll feel when you achieve it.",
            author: "Unknown"
        },
        {
            text: "Dreams don't work unless you do.",
            author: "John C. Maxwell"
        }
    ]
};

// State management
let currentStudyIndex = 0;
let currentWorkIndex = 0;
let currentHardworkIndex = 0;
const quotesPerLoad = 4;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Load initial quotes
    loadQuotes('study', 'study-quotes', 0, quotesPerLoad);
    loadQuotes('work', 'work-quotes', 0, quotesPerLoad);
    loadQuotes('hardwork', 'hardwork-quotes', 0, quotesPerLoad);
    loadAllQuotes();
});

// Load quotes for a specific section
function loadQuotes(category, containerId, startIndex, count) {
    const container = document.getElementById(containerId);
    const categoryQuotes = quotes[category];
    const endIndex = Math.min(startIndex + count, categoryQuotes.length);
    
    for (let i = startIndex; i < endIndex; i++) {
        const quote = categoryQuotes[i];
        const quoteCard = createQuoteCard(quote.text, quote.author, category);
        container.appendChild(quoteCard);
    }
}

// Load more quotes
function loadMoreQuotes(category) {
    let containerId, currentIndex;
    
    switch(category) {
        case 'study':
            containerId = 'study-quotes';
            currentIndex = currentStudyIndex;
            currentStudyIndex += quotesPerLoad;
            break;
        case 'work':
            containerId = 'work-quotes';
            currentIndex = currentWorkIndex;
            currentWorkIndex += quotesPerLoad;
            break;
        case 'hardwork':
            containerId = 'hardwork-quotes';
            currentIndex = currentHardworkIndex;
            currentHardworkIndex += quotesPerLoad;
            break;
    }
    
    const categoryQuotes = quotes[category];
    if (currentIndex >= categoryQuotes.length) {
        // All quotes loaded
        const loadMoreBtn = event.target;
        loadMoreBtn.style.display = 'none';
        return;
    }
    
    loadQuotes(category, containerId, currentIndex, quotesPerLoad);
    
    // Hide button if all quotes are loaded
    if (currentIndex + quotesPerLoad >= categoryQuotes.length) {
        event.target.style.display = 'none';
    }
}

// Create a quote card element
function createQuoteCard(text, author, category) {
    const card = document.createElement('div');
    card.className = 'quote-card';
    card.dataset.category = category;
    
    const categoryLabels = {
        'study': '📚 Study',
        'work': '💼 Work',
        'hardwork': '🔥 Hard Work'
    };
    
    card.innerHTML = `
        <p class="quote-text">${text}</p>
        <p class="quote-author">— ${author}</p>
        <span class="quote-category">${categoryLabels[category]}</span>
    `;
    
    // Add animation
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    setTimeout(() => {
        card.style.transition = 'all 0.5s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 10);
    
    return card;
}

// Load all quotes for the "All Quotes" section
function loadAllQuotes() {
    const container = document.getElementById('all-quotes');
    container.innerHTML = ''; // Clear existing quotes
    
    // Combine all quotes
    const allQuotes = [];
    Object.keys(quotes).forEach(category => {
        quotes[category].forEach(quote => {
            allQuotes.push({
                ...quote,
                category: category
            });
        });
    });
    
    // Shuffle quotes for variety
    const shuffledQuotes = shuffleArray([...allQuotes]);
    
    // Display all quotes
    shuffledQuotes.forEach(quote => {
        const quoteCard = createQuoteCard(quote.text, quote.author, quote.category);
        container.appendChild(quoteCard);
    });
}

// Filter quotes by category
function filterQuotes(category) {
    const container = document.getElementById('all-quotes');
    const cards = container.querySelectorAll('.quote-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active button
    filterButtons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Filter cards
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease';
        } else {
            card.style.display = 'none';
        }
    });
}

// Shuffle array function
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Scroll to section function
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Add scroll animation for sections
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe sections when they load
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.motivation-section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
});

