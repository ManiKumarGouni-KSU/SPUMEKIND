# SWE6733-Development-Project

# Team SPUMEKIND
        Name                        Role
        
  Mani Kumar Gouni &emsp; &emsp; &emsp;Scrum Master
  
  Deepthi Pottipally &emsp; &emsp; &emsp;Product Owner
  
  Sputnika Madhavaram &emsp; &emsp; &emsp;Tech Lead
  
  
# Sprint3 Userstories and Forecasted Points( Points)
 Total Forecasted points : 26
 
 Completed points : 26
 
 
 ### Userstory&emsp; &emsp; &emsp;&emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;&emsp; &emsp; Story Points
 
As a user I want to chat, send voice messages within the app. &emsp; &emsp; &emsp;&emsp; &emsp; &emsp; &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;8
 
As a user I want to share information on social medium. &emsp;&emsp; &emsp; &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;8
 
As a user, I want to get the match profiles based on skills and activities with a swipe of a button. &emsp;&emsp; &emsp;  8
 
As a user, I want to update my profile with recent activities, and level of experience.&emsp; &emsp;&emsp; &emsp;&emsp;5

As a user I want to create my activity and skill board like hiking, skiing, and the level of proficiency respectively (ACTUAL story: TDD unit test cases for update user profile).

 
 ### Rationale

**Story**: As a user I want to chat, send voice messages within the app.  

**Rationale**: In this story, we implement the chat component by using a third-party API, COMETCHAT, which provides text, audio, and video chatting functionalities within the application. 

**Story**: As a user I want to share information on social medium. 

**Rationale**: In this story, we integrated the Instagram API, which allows users to share profile pictures on Instagram directly from our application. 

**Story**: As a user, I want to get the match profiles based on skills and activities with a swipe of a button.  

**Rationale**: In this story, we used the react-tinder-card library to display matched profiles to the user and allow the user to swipe right or left. 

**Story**: As a user, I want to update my profile with recent activities, and level of experience. 

**Rationale**: In this story, we allowed users to add or change their interests (skills), as well as update their user name, gender, and age. 

**Story**: As a user I want to create my activity and skill board like hiking, skiing, and the level of proficiency respectively (ACTUAL story: TDD unit test cases for update user profile). 

**Rationale**: We used the TDD approach to develop the test cases for updating user profiles. The React Jest library was used to implement this. 

In this sprint, we worked on integrating chat within the application along with the integration of social media into our application and completely focused on delivering a full-fledged real-time application as described in the project instructions. 
 
# Jira Product backlog

  
#  Sprint Burndown Chart



# Daily Scrums



# Mob Programming





# Sprint Review



# Working Prototype

https://emergingswe-bd158.web.app/

# Demo of Sprint 2 stories

## Continuous Integration & Continous Deployment
Team developed CI and CD using Github Actions. When user create pull request, the system run a workflow that run all test cases and create temporary demo page when all tests are passes. Team members can test the new features in the demo page and review the code accordingly. The following link shows the CI script:
https://github.com/ManiKumarGouni-KSU/SPUMEKIND/blob/main/.github/workflows/firebase-hosting-pull-request.yml

![Screenshot (6)](https://user-images.githubusercontent.com/99055144/163868149-2fc99558-2532-4877-9dc0-89e39065d53a.png)


Also, when a team member merges his/her code to the main branch, the system will test all changes and deploy to the hosting server automatically. The following link shows the CD script:
https://github.com/ManiKumarGouni-KSU/SPUMEKIND/blob/main/.github/workflows/firebase-hosting-merge.yml

![Screenshot (7)](https://user-images.githubusercontent.com/99055144/163868178-9120d119-8e65-4a9f-9b7a-c1c3d3f61a38.png)


