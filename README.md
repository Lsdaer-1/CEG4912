
![QRCode_website](https://github.com/user-attachments/assets/74fed782-35d5-4442-bd28-6425dfa972ce)


(https://lsdaer-1.github.io/4912.1/)
<br>
**Functional Requirements**  
User Authentication  
The system should allow users to log in using their own unique account, making sure that each user’s information is safely.

QR Code Scanning  
Users can simply scan a QR code at the entrance to access the book search interface.

Book Search  
Users are able to search for books by typing the title, author, book numbers. The system will show each book’s availability status and exact location.

Book Availability Check  
When users search for a book, the system will check its availability in real time, display whether it’s on the shelf. If the book is checked out, it will provide the expected return date.

Book Location Identification  
The system should pinpoint the exact location of the book, including its shelf number and row, so that the retrieval process is as efficient as possible.

Automated Book Retrieval  
The robotic arm should pick up the requested book accurately based on the system’s instructions and then deliver it to a designated collection point.

Book Reservation  
If a book is not currently available, users should have the option to reserve it. The system will save the reservation and send a notification when the book becomes available.

User Notifications  
Users will receive timely notifications through email or the web interface whenever their requested book is ready for pickup or when there is an update on their reserved books.

Book Pickup Confirmation  
After the user collects the book, the system should confirm the pickup and update the inventory to reflect the change.

User Session Management  
The system should manage each user’s session securely until they manually log out or until the session times out, ensuring safety and ease of use.

**Non-Functional Requirements**  
Performance  
The system should respond to user requests within 3 seconds for the majority of the users to maintain a positive experience.

Scalability  
The system should be designed to expand smoothly to handle more users as needed, especially during busy times.

Security  
All user information and book data should be securely stored and transmitted using high-level encryption.

Reliability  
The system should maintain a high level of availability, aiming for 99.5% uptime throughout the year to provide consistent service.

Usability  
The interface should follow accessibility standards to ensure that all users, including those with disabilities, find it easy to navigate and use.

**Constraints**  
Technology Constraint  
The system will be built using the Python language for the backend and the React framework for the frontend to ensure smooth integration.

Regulatory Constraint  
The system will comply with GDPR data privacy regulations to safeguard user data and provide options for data management.

Resource Constraint  
The system’s CPU and memory usage should remain within 70% of capacity during peak usage times to avoid slowing down the service.
