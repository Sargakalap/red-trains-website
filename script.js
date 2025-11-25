// script.js

// Navigation functionality
function navigateTo(section) {
    const sections = document.querySelectorAll('section');
    sections.forEach(sec => {
        sec.style.display = 'none';
    });
    document.getElementById(section).style.display = 'block';
}

// Ticket booking interaction
function bookTicket(ticketDetails) {
    // Simulate booking process
    console.log(`Booking ticket for: ${ticketDetails}.`);
    alert('Ticket booked successfully!');
}

// Schedule search feature
function searchSchedule(date) {
    // Simulated schedule
    const schedule = [
        { time: '10:00 AM', destination: 'City A' },
        { time: '12:00 PM', destination: 'City B' },
        { time: '02:00 PM', destination: 'City C' }
    ];

    const results = schedule.filter(s => s.time.includes(date));
    console.log('Search Results:', results);
    return results;
}

// Event Listener for ticket booking
document.getElementById('bookBtn').addEventListener('click', () => {
    const ticketDetails = document.getElementById('ticketInfo').value;
    bookTicket(ticketDetails);
});

// Event Listener for navigation
document.getElementById('navBtn').addEventListener('click', () => {
    const section = document.getElementById('sectionInput').value;
    navigateTo(section);
});

// Event Listener for schedule search
document.getElementById('searchBtn').addEventListener('click', () => {
    const date = document.getElementById('searchDate').value;
    searchSchedule(date);
});
