# Nutrition Meal Planner

## 1. Project Overview

Nutrition Meal Planner is an AI-powered meal planning application that creates personalized meal plans based on the user's personal information, health information, dietary preferences, health goals, budget constraints, available ingredients, and other relevant data.

The system is intended to support personalized nutrition planning and includes AI-powered meal recommendations, nutrition tracking, food image analysis, ingredient-based meal suggestions, and an AI nutrition chatbot.

The application also provides administration and monitoring functions.

---

## 2. Reference Systems

### 2.1 Eat This Much

Eat This Much is an AI-powered meal planning platform that automatically creates personalized meal plans based on users' weight, height, goals, and dietary preferences.

Key features include:

* Automatic meal plan generation.
* Weight loss, weight gain, and muscle-building goals.
* Calorie and nutrition tracking.
* Dietary preferences such as Keto, Vegetarian, and Low-Carb.
* Allergy filtering.
* Daily and weekly meal planning.
* Grocery list generation.

Limitations identified in the requirements:

* Mainly focuses on Western foods.
* Limited support for specific medical conditions.
* Not suitable for budget-conscious users.
* Can be difficult for beginners.
* Lacks community features.

### 2.2 MyFitnessPal

MyFitnessPal supports:

* Calorie and nutrition tracking.
* Food diary and meal logging.
* Exercise and activity tracking.
* Weight management.
* Barcode scanning.
* Progress reports and analytics.
* Fitness device and application integration.

Limitations identified in the requirements:

* Focuses more on tracking than meal planning.
* Limited personalized meal recommendations.
* Some features require payment.
* Limited support for Vietnamese cuisine.
* Does not provide deep disease-based nutrition planning.

---

# 3. System Innovations

Compared with the reference systems, Nutrition Meal Planner is intended to provide:

1. Vietnamese and Asian food support.
2. Disease-based personalization, including conditions such as diabetes, hypertension, gastritis, and gout.
3. Budget-friendly meal planning.
4. Adaptive AI learning based on user feedback and eating habits.
5. Health reminders for meals, water intake, and nutrition goals.
6. Community features such as meal sharing, ratings, and discussions.
7. AI Nutrition Chatbot for nutrition advice and food recommendations.
8. Smart refrigerator camera integration for identifying available ingredients and suggesting suitable meals and recipes.

---

# 4. Actors

## 4.1 User

The User can:

* Register an account.
* Log in.
* Recover a forgotten password.
* View the home page.
* Manage profile information.
* Update health information.
* Set dietary preferences.
* Set budget constraints.
* Set health goals.
* Generate personalized meal plans.
* View meal plans.
* Track nutrition intake.
* Receive health reminders.
* Save and remove favorite meals.
* Search recipes.
* Analyze food using the camera.
* Get ingredient-based meal suggestions.
* Chat with the AI nutrition assistant.
* Rate and comment on meals.

## 4.2 Admin

The Admin can:

* Manage users.
* Manage the food and nutrition database.
* Monitor the system.
* View reports and dashboard data.

---

# 5. Use Case List

| ID   | Use Case                         | Actor      | Type |
| ---- | -------------------------------- | ---------- | ---- |
| UC01 | Register Account                 | Guest      | Main |
| UC02 | Login                            | Guest/User | Main |
| UC03 | Forgot Password                  | User       | Main |
| UC04 | View Home Page                   | User       | Main |
| UC05 | Manage Profile                   | User       | Main |
| UC06 | Update Health Information        | User       | Main |
| UC07 | Set Dietary Preferences          | User       | Main |
| UC08 | Set Budget Constraints           | User       | Main |
| UC09 | Set Health Goals                 | User       | Main |
| UC10 | Generate Personalized Meal Plan  | User       | Main |
| UC11 | View Meal Plan                   | User       | Main |
| UC12 | Track Nutrition Intake           | User       | Main |
| UC13 | Receive Health Reminders         | User       | Main |
| UC14 | Save Favorite Meals              | User       | Main |
| UC15 | Remove Favorite Meals            | User       | Main |
| UC16 | Search Recipes                   | User       | Main |
| UC17 | Analyze Food via Camera          | User       | Main |
| UC18 | Get Ingredient-Based Suggestions | User       | Main |
| UC19 | Chat with AI Nutrition Assistant | User       | Main |
| UC20 | Rate and Comment Meals           | User       | Main |
| UC21 | Manage Users                     | Admin      | Main |
| UC22 | Manage Food & Nutrition Database | Admin      | Main |
| UC23 | Monitor System & Reports         | Admin      | Main |

---

# 6. Use Case Details

## UC06 — Update Health Information

### Use Case ID

UC06

### Use Case Name

Update Health Information

### Actor

User

### Description

The user updates personal health information, including height, weight, allergies, diseases, and nutritional requirements to ensure accurate meal recommendations.

### Preconditions

* User has logged in.
* User profile exists.

### Main Flow

1. User opens the Health Information page.
2. The system displays the current health information.
3. User updates personal health information.
4. User submits the changes.
5. The system validates the entered information.
6. The system saves the updated information.

### Alternative Flow

If required fields are empty or contain invalid values, the system displays an error message and requests correction.

### Postconditions

The user's health information is updated successfully.

---

# 7. UC09 — Set Health Goals

### Use Case ID

UC09

### Use Case Name

Set Health Goals

### Actor

User

### Description

The user selects health goals that will be used by the AI to generate personalized meal plans.

### Preconditions

* User has logged in.

### Main Flow

1. User opens the Health Goals page.
2. The system displays available health goals.
3. User selects one or more goals, such as weight loss, muscle gain, or healthy lifestyle.
4. User saves the selected goals.
5. The system updates the user's profile.

### Alternative Flow

If no goal is selected, the system asks the user to choose at least one goal.

### Postconditions

The user's health goals are stored successfully.

---

# 8. UC10 — Generate Personalized Meal Plan

### Use Case ID

UC10

### Use Case Name

Generate Personalized Meal Plan

### Actor

User

### Description

The AI generates a personalized meal plan based on the user's health information, dietary preferences, goals, and available data.

### Preconditions

* User has logged in.
* Health information has been completed.

### Main Flow

1. User selects Generate Meal Plan.
2. The system retrieves the user's profile and health information.
3. AI analyzes the collected data.
4. AI generates a personalized meal plan.
5. The system displays breakfast, lunch, dinner, snacks, calories, and nutritional values.
6. User saves the meal plan.

### Alternative Flow

If health information is incomplete, the system requests the user to update the profile before generating the meal plan.

### Postconditions

A personalized meal plan is generated and saved.

---

# 9. UC17 — Analyze Food via Camera

### Use Case ID

UC17

### Use Case Name

Analyze Food via Camera

### Actor

User

### Description

The system analyzes uploaded food images to identify ingredients and nutritional information.

### Preconditions

* User has logged in.
* Camera permission has been granted.

### Main Flow

1. User opens Camera Analysis.
2. User captures or uploads a food image.
3. AI recognizes the ingredients.
4. The system estimates calories and nutritional values.
5. The analysis results are displayed.

### Alternative Flow

If the image cannot be recognized, the system asks the user to upload another image.

### Postconditions

Food analysis results are generated successfully.

---

# 10. UC18 — Get Ingredient-Based Suggestions

### Use Case ID

UC18

### Use Case Name

Get Ingredient-Based Suggestions

### Actor

User

### Description

The system recommends meals and recipes based on the identified ingredients.

### Preconditions

* Food ingredients have been identified.

### Main Flow

1. The system retrieves the detected ingredients.
2. AI searches for suitable recipes.
3. AI suggests alternative ingredients if necessary.
4. The system displays recommended meals and recipes.
5. User selects a preferred recommendation.

### Alternative Flow

If no suitable recipe is found, the system recommends adding additional ingredients.

### Postconditions

Meal recommendations are displayed to the user.

---

# 11. UC19 — Chat with AI Nutrition Assistant

### Use Case ID

UC19

### Use Case Name

Chat with AI Nutrition Assistant

### Actor

User

### Description

The AI chatbot answers nutrition-related questions and provides personalized recommendations.

### Preconditions

* User has logged in.

### Main Flow

1. User opens the AI Chat feature.
2. User enters a question.
3. The system sends the request to the AI engine.
4. AI analyzes the user's profile and health information.
5. AI generates a response.
6. The system displays the response.

### Alternative Flow

If the AI cannot understand the question, the system asks the user to rephrase it.

### Postconditions

The conversation is stored in the chat history.

---

# 12. Important Requirement Document Note

The Use Case List identifies:

* UC17 = Analyze Food via Camera
* UC18 = Get Ingredient-Based Suggestions
* UC19 = Chat with AI Nutrition Assistant

However, the detailed Use Case section of the original requirements document contains inconsistent numbering in several headings and "Use Case ID" fields.

For implementation, use the **Use Case List in Section 5 as the authoritative numbering**:

* UC17 = Analyze Food via Camera
* UC18 = Get Ingredient-Based Suggestions
* UC19 = Chat with AI Nutrition Assistant

Do not introduce new use cases solely to resolve this numbering inconsistency.

---

# 13. Main User Interface Screens

The requirements document identifies the following main screens:

* Login
* Register
* Home
* Profile
* Camera
* Analysis
* Meal Plan
* AI Chat
* Favorite
* Admin Dashboard

The user interface concept uses a nutrition/health-oriented visual style with green as the primary visual color.

The user application includes navigation between the major features.

---

# 14. Main User Features

## Authentication

* Register account.
* Login.
* Forgot password.

## User Profile

* View and manage profile.
* Update health information.
* Set dietary preferences.
* Set budget constraints.
* Set health goals.

## Meal Planning

* Generate personalized meal plan.
* View meal plans.
* Track nutrition intake.
* Save favorite meals.
* Remove favorite meals.
* Search recipes.

## AI Features

* Personalized meal plan generation.
* Food image recognition and analysis.
* Ingredient-based meal suggestions.
* AI nutrition chatbot.
* Adaptive recommendations based on feedback and eating habits.

## Community

* Meal sharing.
* Ratings.
* Discussions.
* Meal ratings and comments.

## Health Reminders

* Meal reminders.
* Water intake reminders.
* Nutrition goal notifications.

---

# 15. Food Image Analysis

The system supports food image analysis.

The intended flow is:

User uploads or captures a food image.

↓

The AI recognizes ingredients.

↓

The system obtains nutritional information.

↓

The system calculates or estimates:

* Calories.
* Protein.
* Carbohydrates.
* Fat.
* Other available nutritional information.

↓

The system displays the food analysis.

The requirements identify YOLO11 as a reference for object/food recognition and USDA FoodData Central as a nutrition data source.

---

# 16. AI Meal Recommendation

The personalized meal planning process uses:

* User profile.
* Health information.
* Dietary preferences.
* Health goals.
* Budget constraints.
* Available ingredients or other available data.

The AI generates:

* Breakfast.
* Lunch.
* Dinner.
* Snacks.
* Calories.
* Nutritional values.

The generated meal plan can be displayed to the user and saved.

---

# 17. AI Nutrition Chatbot

The AI chatbot:

* Receives nutrition-related questions.
* Uses the user's profile and health information as context.
* Generates nutrition-related responses.
* Provides personalized recommendations.
* Stores conversation history.

---

# 18. Admin Features

## UC21 — Manage Users

The Admin manages user accounts.

## UC22 — Manage Food & Nutrition Database

The Admin manages food and nutrition information used by the system.

## UC23 — Monitor System & Reports

The Admin views dashboard data, system reports, and monitoring information.

---

# 19. Non-Functional Requirements

## NFR-01 — Performance: Response Time

### Name

AI Meal Recommendation Response Time

### Requirement

The Nutrition Meal Planner App shall generate and display a personalized meal plan within 5 seconds after a customer submits their health information and food image.

### Rationale

Fast response time improves user experience and encourages continuous use.

### Acceptance Criteria

95% of meal recommendation requests return results within 5 seconds.

### Test Method

The tester performs 100 meal recommendation requests and verifies that at least 95 requests are completed within 5 seconds.

---

## NFR-02 — Accuracy: Food Image Recognition

### Name

Food Image Recognition Accuracy

### Requirement

The Nutrition Meal Planner App shall identify food ingredients from uploaded refrigerator images with at least 90% accuracy.

### Rationale

Accurate food recognition is essential for generating reliable nutritional analysis and meal recommendations.

### Acceptance Criteria

The system correctly identifies at least 90% of food items in the testing dataset.

### Test Method

The tester uploads 100 labeled food images and verifies that at least 90 images are recognized correctly.

---

## NFR-03 — Availability: Uptime

### Name

System Availability

### Requirement

The Nutrition Meal Planner App shall maintain system availability of at least 99.5%, excluding scheduled maintenance.

### Rationale

Users should be able to access meal planning services whenever needed.

### Acceptance Criteria

Monthly system uptime shall be at least 99.5%.

### Test Method

Monitor system uptime for one month and verify that availability is no less than 99.5%.

---

## NFR-04 — Security: Data Security

### Name

Data Security

### Requirement

The system shall protect users' personal and health information using secure communication and role-based access control.

### Rationale

Health information is sensitive and must be protected from unauthorized access.

### Acceptance Criteria

* All sensitive data is transmitted using HTTPS.
* Only authorized users can access protected resources.
* Role-based access control is implemented for User and Admin accounts.

### Test Method

Perform security testing to verify encrypted communication and validate access permissions for User and Admin accounts.

---

## NFR-05 — Reliability: SMS Notification Delivery

### Name

SMS Notification Delivery

### Requirement

The system shall send verification codes, meal reminders, and health notifications within 30 seconds after they are triggered.

### Rationale

Timely notifications help users follow their meal schedules and nutrition plans effectively.

### Acceptance Criteria

95% of SMS notifications are delivered within 30 seconds.

### Test Method

The tester triggers 100 SMS notifications and verifies that at least 95% of notifications are delivered within 30 seconds.

---

# 20. External Services / References

The original requirements document references:

* YOLO11 documentation for object/food recognition.
* USDA FoodData Central for nutrition information.
* Gemini 2.5 Flash for AI functionality.

These are requirements/reference points from the project document. The exact production API/model configuration is to be determined during implementation.

---

# 21. Implementation Constraints

The implementation should:

1. Preserve the 23 Use Cases defined in the Use Case List.
2. Use User and Admin as the application roles.
3. Implement role-based access control.
4. Protect personal and health information.
5. Use HTTPS for sensitive data transmission in production.
6. Support personalized meal planning.
7. Support food image analysis.
8. Support ingredient-based recommendations.
9. Support AI nutrition chat.
10. Support administration and reporting.

The implementation should not introduce additional business requirements unless explicitly approved.

---

# 22. Source of Truth

This document represents the requirements extracted from the original Nutrition Meal Planner requirements document.

When using an AI coding agent:

* Read `docs/requirements.md` before implementing features.
* Treat this file as the primary functional requirements source.
* Do not invent additional business requirements.
* Do not remove a required Use Case without approval.
* If a requirement is ambiguous or contradictory, report the ambiguity before implementing it.
* Preserve the terminology used by the requirements document.
* Use the Use Case List as the authoritative numbering for UC01–UC23.
