## Loyaly Program project with React, Node, React Native, OpenAI

This is small part of a bigger project and though not for use, here to show the early stages of the code.

In this project there will be a client side where vendors will add rewards. A user will then be able to scan this reward which will then appear in their React Native application.

A chat part of the application between the vendor and the user is initally set up.

NOTE - THE CHAT API IS SWITCHED OFF AT MOMENT - to prevent costs

## Table of Contents
- [Loyaly Program project with React, Node, React Native, OpenAI](#loyaly-program-project-with-react-node-react-native-openai)
- [Table of Contents](#table-of-contents)
- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Development Stages](#development-stages)
- [Screenshots](#screenshots)


## Project Overview
This is in preparation for SaaS I am uilding. For this is an initial Chat application between the client and react native.

The React app client is just a basic app that will later form part of a bigger extension.

NOTE - This uses Expo for React Native and has ONLY been tested for iOS use

## Tech Stack
- React
- Node
- React Native
- Expo
- Web Sockets
- REST API
- MongoDB
- OpenAPI

## Development Stages
1. Phase 1 - Build inital stage - DONE
   * Set up Client, Server and React Native
   * Apply Web sockets and create basic chat between Client and React Native

2. Phase 2 - Implement REST API - DONE
   * Set up MongoDB and create initial basic RESTAPIs
   * Create default user, vendor and rewards for initial stage.
   * Fetch rewards specific for user
  
3. Implement CHAT AI - IN PROGRESS
   * Set up OpenAPI in Backend - DONE
   * Set up Chat AI in backend - DONE
   * Set up Chat AI in frontend - DONE
   * Normalise code in backend so both websockects can run - IN PROGRESS

4. Implement Vendor side - IN PROGRESS
   * Allow vendor to create reward
   * Allow vendor to list and update rewards
   * Implement QR scan for new user to claim reward and/or increase stampe

5. Phase 3 - Implement Mobile User side - NOT STARTED
   * Allow user to scan the QR to claim or increase reward stamps
   * Implement feature to see other Rewards by other vendors not scanned

6. Implement other features for Mobile - NOT STARTED
   * Set up Profile screen and other screens

7. Phase 4 - Set up Auth, roles and middleware - NOT STARTED

8. Set up Chat to be between vendor and user only - NOT STARTED

9. Set up Vendor Dashboard properly - NOT STARTED

10. Set up Admin Dashboard to manage Vendors and Users - NOT STARTED

11. Phase 5 -  Set up site for SaaS - NOT STARTED

12. Set up other parts of the workflow - NOT STARTED
   * Enable non mobile app users to be directed to app store 

13. Phase 6 - Set up CI/CD, test environments, Cloud infrastructure - NOT STARTED
   * Likely to start between phases 8 to 11

14. Phase 7 - Admin and Vendor changes - NOT STARTED 

15. Backend, storage and DB changes - NOT STARTED

16. Mobile changes - NOT STARTED

17. Testing and deployment - NOT STARTED


## Screenshots
![Chat screen](./assets/screenshot1.png)
![AI_chat](./assets/AI_Chat.png)
![Mobile home screen](./assets/IMG_5013.PNG)
![Mobile chat screen](./assets/IMG_5015.PNG)
![Mobile list rewards screen](./assets/IMG_5041.PNG)
![Mobile list details screen](./assets/IMG_5040.PNG)