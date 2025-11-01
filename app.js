// Student Records Management System - JavaScript
// This file handles all the functionality for managing student records

// Global data storage (using in-memory storage instead of localStorage)
let students = [];

// Initialize the app when page loads
window.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Function to initialize the application
function initializeApp() {
    // Load sample data on first load
    loadSampleData();
    
    // Set up navigation
    setupNavigation();
    
    // Set up form submission
    setupFormSubmission();
    
    // Set up search functionality
    setupSearch();
    
    // Display records if we're on the view records page
    displayStudents();
    
    // Set up edit form submission
    setupEditFormSubmission();
    
    // Set up delete confirmation button
    setupDeleteConfirmation();
}

// Load sample data (pre-populated students)
function loadSampleData() {
    // Check if students array is empty
    if (students.length === 0) {
        students = [
            {
                id: "1001",
                name: "Rahul Kumar",
                email: "rahul.kumar@email.com",
                phone: "9876543210",
                course: "BCA",
                semester: "4",
                gpa: "3.5"
            },
            {
                id: "1002",
                name: "Priya Singh",
                email: "priya.singh@email.com",
                phone: "8765432109",
                course: "BCA",
                semester: "3",
                gpa: "3.8"
            },
            {
                id: "1003",
                name: "Amit Patel",
                email: "amit.patel@email.com",
                phone: "7654321098",
                course: "B.Tech",
                semester: "5",
                gpa: "3.2"
            }
        ];
    }
}

// Navigation functionality
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    
    // Add click event to each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const pageName = this.getAttribute('data-page');
            navigateToPage(pageName);
            
            // Close mobile menu if open
            navMenu.classList.remove('active');
        });
    });
    
    // Hamburger menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
    }
}

// Function to navigate between pages
function navigateToPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show selected page
    const selectedPage = document.getElementById(pageName);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }
    
    // Update active nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });
    
    // Refresh student table if viewing records
    if (pageName === 'view-records') {
        displayStudents();
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Form submission for adding new student
function setupFormSubmission() {
    const form = document.getElementById('studentForm');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Clear previous error messages
            clearErrors();
            
            // Get form values
            const studentData = {
                id: document.getElementById('studentId').value.trim(),
                name: document.getElementById('studentName').value.trim(),
                email: document.getElementById('studentEmail').value.trim(),
                phone: document.getElementById('studentPhone').value.trim(),
                course: document.getElementById('studentCourse').value,
                semester: document.getElementById('studentSemester').value,
                gpa: document.getElementById('studentGpa').value
            };
            
            // Validate form
            if (validateForm(studentData)) {
                // Check if student ID already exists
                const existingStudent = students.find(s => s.id === studentData.id);
                if (existingStudent) {
                    showError('studentId', 'Student ID already exists!');
                    return;
                }
                
                // Add student to array
                students.push(studentData);
                
                // Show success message
                showSuccessMessage();
                
                // Reset form
                form.reset();
            }
        });
    }
}

// Function to validate form data
function validateForm(data) {
    let isValid = true;
    
    // Validate Student ID
    if (!data.id) {
        showError('studentId', 'Student ID is required');
        isValid = false;
    } else if (!/^\d+$/.test(data.id)) {
        showError('studentId', 'Student ID must be numeric');
        isValid = false;
    }
    
    // Validate Name
    if (!data.name) {
        showError('studentName', 'Student Name is required');
        isValid = false;
    } else if (!/^[a-zA-Z\s]+$/.test(data.name)) {
        showError('studentName', 'Name should contain only letters');
        isValid = false;
    }
    
    // Validate Email
    if (!data.email) {
        showError('studentEmail', 'Email is required');
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        showError('studentEmail', 'Please enter a valid email address');
        isValid = false;
    }
    
    // Validate Phone
    if (!data.phone) {
        showError('studentPhone', 'Phone number is required');
        isValid = false;
    } else if (!/^\d{10}$/.test(data.phone)) {
        showError('studentPhone', 'Phone number must be exactly 10 digits');
        isValid = false;
    }
    
    // Validate Course
    if (!data.course) {
        showError('studentCourse', 'Please select a course');
        isValid = false;
    }
    
    // Validate Semester
    if (!data.semester) {
        showError('studentSemester', 'Semester is required');
        isValid = false;
    } else if (data.semester < 1 || data.semester > 8) {
        showError('studentSemester', 'Semester must be between 1 and 8');
        isValid = false;
    }
    
    // Validate GPA
    if (!data.gpa) {
        showError('studentGpa', 'GPA is required');
        isValid = false;
    } else if (data.gpa < 0 || data.gpa > 4) {
        showError('studentGpa', 'GPA must be between 0.0 and 4.0');
        isValid = false;
    }
    
    return isValid;
}

// Function to show error message
function showError(fieldName, message) {
    const errorElement = document.getElementById(fieldName + 'Error');
    const inputElement = document.getElementById(fieldName);
    
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.classList.add('show');
    }
    
    if (inputElement) {
        inputElement.classList.add('error');
    }
}

// Function to clear all error messages
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(msg => {
        msg.textContent = '';
        msg.classList.remove('show');
    });
    
    const errorInputs = document.querySelectorAll('.error');
    errorInputs.forEach(input => {
        input.classList.remove('error');
    });
}

// Function to show success message
function showSuccessMessage() {
    const successMsg = document.getElementById('successMessage');
    if (successMsg) {
        successMsg.style.display = 'block';
        
        // Hide after 5 seconds
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 5000);
    }
}

// Function to display students in table
function displayStudents(studentsToDisplay = null) {
    const tableBody = document.getElementById('studentTableBody');
    const noRecordsMsg = document.getElementById('noRecordsMessage');
    
    if (!tableBody) return;
    
    // Use filtered students if provided, otherwise use all students
    const studentList = studentsToDisplay || students;
    
    // Clear table
    tableBody.innerHTML = '';
    
    // Check if there are any students
    if (studentList.length === 0) {
        noRecordsMsg.style.display = 'block';
        return;
    } else {
        noRecordsMsg.style.display = 'none';
    }
    
    // Add each student to table
    studentList.forEach((student, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.phone}</td>
            <td>${student.course}</td>
            <td>${student.semester}</td>
            <td>${student.gpa}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-success" onclick="editStudent(${students.indexOf(student)})">Edit</button>
                    <button class="btn btn-danger" onclick="deleteStudent(${students.indexOf(student)})">Delete</button>
                </div>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

// Search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            if (searchTerm === '') {
                displayStudents();
                return;
            }
            
            // Filter students based on search term
            const filteredStudents = students.filter(student => {
                return student.name.toLowerCase().includes(searchTerm) ||
                       student.id.toLowerCase().includes(searchTerm) ||
                       student.email.toLowerCase().includes(searchTerm) ||
                       student.course.toLowerCase().includes(searchTerm);
            });
            
            displayStudents(filteredStudents);
        });
    }
}

// Sort table functionality
let sortDirection = {};

function sortTable(column) {
    // Toggle sort direction
    sortDirection[column] = sortDirection[column] === 'asc' ? 'desc' : 'asc';
    
    // Sort students array
    students.sort((a, b) => {
        let valueA = a[column];
        let valueB = b[column];
        
        // Convert to numbers for numeric columns
        if (column === 'id' || column === 'semester' || column === 'gpa') {
            valueA = parseFloat(valueA);
            valueB = parseFloat(valueB);
        } else {
            valueA = valueA.toLowerCase();
            valueB = valueB.toLowerCase();
        }
        
        if (sortDirection[column] === 'asc') {
            return valueA > valueB ? 1 : -1;
        } else {
            return valueA < valueB ? 1 : -1;
        }
    });
    
    // Refresh display
    displayStudents();
}

// Delete student function
let studentIndexToDelete = null;

function deleteStudent(index) {
    // Store the index
    studentIndexToDelete = index;
    
    // Get student details
    const student = students[index];
    
    // Populate student details in modal
    const studentDetailsDiv = document.getElementById('studentToDelete');
    studentDetailsDiv.innerHTML = `
        <p><strong>ID:</strong> ${student.id}</p>
        <p><strong>Name:</strong> ${student.name}</p>
        <p><strong>Email:</strong> ${student.email}</p>
        <p><strong>Course:</strong> ${student.course}</p>
    `;
    
    // Show delete confirmation modal
    const modal = document.getElementById('deleteModal');
    modal.classList.add('show');
}

// Close delete modal
function closeDeleteModal() {
    const modal = document.getElementById('deleteModal');
    modal.classList.remove('show');
    studentIndexToDelete = null;
}

// Confirm delete
function confirmDelete() {
    if (studentIndexToDelete !== null) {
        students.splice(studentIndexToDelete, 1);
        closeDeleteModal();
        displayStudents();
        showDeleteSuccessMessage();
        studentIndexToDelete = null;
    }
}

// Show delete success message
function showDeleteSuccessMessage() {
    // Create a temporary success message element
    const messageDiv = document.createElement('div');
    messageDiv.className = 'success-message';
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '80px';
    messageDiv.style.left = '50%';
    messageDiv.style.transform = 'translateX(-50%)';
    messageDiv.style.zIndex = '1001';
    messageDiv.style.minWidth = '300px';
    messageDiv.style.textAlign = 'center';
    messageDiv.innerHTML = '✓ Student record deleted successfully!';
    
    document.body.appendChild(messageDiv);
    
    // Remove message after 3 seconds
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// Edit student function
function editStudent(index) {
    const student = students[index];
    
    // Populate edit form
    document.getElementById('editIndex').value = index;
    document.getElementById('editStudentId').value = student.id;
    document.getElementById('editStudentName').value = student.name;
    document.getElementById('editStudentEmail').value = student.email;
    document.getElementById('editStudentPhone').value = student.phone;
    document.getElementById('editStudentCourse').value = student.course;
    document.getElementById('editStudentSemester').value = student.semester;
    document.getElementById('editStudentGpa').value = student.gpa;
    
    // Show modal
    const modal = document.getElementById('editModal');
    modal.classList.add('show');
}

// Close edit modal
function closeEditModal() {
    const modal = document.getElementById('editModal');
    modal.classList.remove('show');
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const editModal = document.getElementById('editModal');
    const deleteModal = document.getElementById('deleteModal');
    
    if (event.target === editModal) {
        closeEditModal();
    }
    
    if (event.target === deleteModal) {
        closeDeleteModal();
    }
});

// Setup delete confirmation button
function setupDeleteConfirmation() {
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', confirmDelete);
    }
}

// Setup edit form submission
function setupEditFormSubmission() {
    const editForm = document.getElementById('editForm');
    
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const index = document.getElementById('editIndex').value;
            const updatedStudent = {
                id: document.getElementById('editStudentId').value.trim(),
                name: document.getElementById('editStudentName').value.trim(),
                email: document.getElementById('editStudentEmail').value.trim(),
                phone: document.getElementById('editStudentPhone').value.trim(),
                course: document.getElementById('editStudentCourse').value,
                semester: document.getElementById('editStudentSemester').value,
                gpa: document.getElementById('editStudentGpa').value
            };
            
            // Basic validation
            if (validateEditForm(updatedStudent)) {
                // Check if ID is changed and already exists
                const existingStudent = students.find((s, i) => s.id === updatedStudent.id && i != index);
                if (existingStudent) {
                    alert('Student ID already exists!');
                    return;
                }
                
                // Update student
                students[index] = updatedStudent;
                
                // Close modal
                closeEditModal();
                
                // Refresh display
                displayStudents();
                
                alert('Student record updated successfully!');
            }
        });
    }
}

// Validate edit form
function validateEditForm(data) {
    // Basic validation (same as add form)
    if (!data.id || !/^\d+$/.test(data.id)) {
        alert('Please enter a valid Student ID (numbers only)');
        return false;
    }
    
    if (!data.name || !/^[a-zA-Z\s]+$/.test(data.name)) {
        alert('Please enter a valid name (letters only)');
        return false;
    }
    
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        alert('Please enter a valid email address');
        return false;
    }
    
    if (!data.phone || !/^\d{10}$/.test(data.phone)) {
        alert('Phone number must be exactly 10 digits');
        return false;
    }
    
    if (!data.course) {
        alert('Please select a course');
        return false;
    }
    
    if (!data.semester || data.semester < 1 || data.semester > 8) {
        alert('Semester must be between 1 and 8');
        return false;
    }
    
    if (!data.gpa || data.gpa < 0 || data.gpa > 4) {
        alert('GPA must be between 0.0 and 4.0');
        return false;
    }
    
    return true;
}