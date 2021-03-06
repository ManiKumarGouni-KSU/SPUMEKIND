# SWE6733-Development-Project

# Team SPUMEKIND
        Name                        Role
        
  Mani Kumar Gouni &emsp; &emsp; &emsp;Scrum Master
  
  Deepthi Pottipally &emsp; &emsp; &emsp;Product Owner
  
  Sputnika Madhavaram &emsp; &emsp; &emsp;Tech Lead
  
  
# Sprint2 Userstories and Forecasted Points( Points)
 Total Forecasted points : 26
 
 Completed points : 26
 
 
 ### Userstory&emsp; &emsp; &emsp;&emsp; &emsp; &emsp; &emsp; &emsp; &emsp; &emsp;&emsp; &emsp; Story Points
 
 As a user I want to delete my profile&emsp; &emsp; &emsp;&emsp; &emsp; &emsp; &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;8
 
 As a user I want to upload an image in profile page &emsp;&emsp; &emsp; &emsp;&emsp;&emsp;&emsp;&emsp;5
 
 As a user I want to find matches based on interests, skill level &emsp;&emsp; &emsp;  8
 
 TDD unit test cases for saving Image and search profile.&emsp; &emsp;&emsp; &emsp;&emsp;5
 
 ### Rationale
**Story:** As a user I want to delete my profile.<br/>
**Rationale:** In this story, we implemented user profile delete functionality <br/>
**Story:** As a user I want to upload an image in profile page <br/>
**Rationale:** In this story, we implemented functionality where user can upload their profile picture.<br/>
**Story:** As a user I want to find matches based on interests, skill level.<br/>
**Rationale:** By implementing this story, user can find their matches based on their interests.<br/>
**Story:** TDD unit test cases for saving Image and search profile.<br/>
**Rationale:** We used TDD approach to develop the saving Image and search profile<br/>

In this sprint, we completely focused on allowing users to update their profile picture and delete user profiles. We are going to complete remaining high-level features in the next sprint.
 
 
 
# Jira Product backlog

https://swe6763.atlassian.net/jira/software/projects/SPS/boards/4/backlog
  
#  Sprint Burndown Chart

![Sprint 2 Burndown Chart](https://user-images.githubusercontent.com/99605998/163859006-54fce3f0-6d7e-483a-98ce-39eb9757bd5a.jpg)


# Daily Scrums

[Sprint 2 -  SWE 6733 EMERGING SOFTWARE ENGINEERING PROCESS(1-28).xlsx](https://github.com/ManiKumarGouni-KSU/SPUMEKIND/files/8502686/Sprint.2.-.SWE.6733.EMERGING.SOFTWARE.ENGINEERING.PROCESS.1-28.xlsx)


# Mob Programming


https://user-images.githubusercontent.com/99055144/163694264-42704298-eb2a-436f-aab9-0160831da8ac.mp4



# Sprint Review

https://user-images.githubusercontent.com/99055144/163694536-6425992a-79d8-4ba0-8e0b-f6dbe75026f2.mp4


# Working Prototype

https://emergingswe-bd158.web.app/

# Demo of Sprint 2 stories
https://kennesawedu-my.sharepoint.com/:v:/g/personal/dpottipa_students_kennesaw_edu/EebytDAA68lKie2I0qytLxsBEutq2MDyCwpL0pfm_ZbRXQ

## Continuous Integration & Continous Deployment
Team developed CI and CD using Github Actions. When user create pull request, the system run a workflow that run all test cases and create temporary demo page when all tests are passes. Team members can test the new features in the demo page and review the code accordingly. The following link shows the CI script:
https://github.com/ManiKumarGouni-KSU/SPUMEKIND/blob/main/.github/workflows/firebase-hosting-pull-request.yml

![Screenshot (6)](https://user-images.githubusercontent.com/99055144/163868149-2fc99558-2532-4877-9dc0-89e39065d53a.png)


Also, when a team member merges his/her code to the main branch, the system will test all changes and deploy to the hosting server automatically. The following link shows the CD script:
https://github.com/ManiKumarGouni-KSU/SPUMEKIND/blob/main/.github/workflows/firebase-hosting-merge.yml

![Screenshot (7)](https://user-images.githubusercontent.com/99055144/163868178-9120d119-8e65-4a9f-9b7a-c1c3d3f61a38.png)


