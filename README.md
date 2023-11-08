# Project Documentation

## Table of Content
  - [Table of Content](#table-of-content)
  - [Libraries](#libraries)
    - [Backend](#backend)
    - [Frontend](#frontend)
  - [Working Functionalities](#working-functionalities)
  - [Guidelines/Quick Start](#guidelinesquick-start)
    - [Docker way (Recommended)](#docker-way-recommended)
    - [Localhost way](#localhost-way)

## Libraries

### Backend
- spring-boot-starter-web 2.7.2
- mybatis-spring-boot-starter 2.1.1
- druid 1.1.21
- spring-boot-starter-jdbc 2.7.2
- mysql-connector-java 8.0.29
- Lombok 1.18.24
- spring-boot-starter-test 2.7.2
- jasypt-spring-boot-starter 3.0.4
- spring-boot-devtools 2.7.2
- spring-boot-starter-mail 2.7.2
- expiringmap 0.5.8
- commons-codec 1.10
- spring-boot-configuration-processor 2.7.2
- spring-boot-starter-data-redis 2.7.2
- jackson-core	2.13.3
- commons-pool2 2.11.1
- junit-jupiter 5.8.2
### Frontend
- @vueuse/core: 9.1.1,
- axios: 0.27.2,
- dayjs: 1.11.5,
- mitt: 3.0.0,
- pinia: 2.0.14,
- pinia-plugin-persist: 1.0.0,
- postcss-px-to-viewport: 1.1.1,
- vant: 3.6.1,
- vue: 3.2.37,
- vue-router: 4.0.16
- @types/mockjs: 1.0.6,
- @types/node: 18.0.1,
- @typescript-eslint/eslint-plugin: 5.30.4,
- @typescript-eslint/parser: 5.30.4,
- @vitejs/plugin-vue: 2.3.3,
- eslint: 8.19.0,
- eslint-config-prettier: 8.5.0,
- eslint-plugin-prettier: 4.2.1,
- eslint-plugin-vue: 9.1.1,
- less: 4.1.3,
- lint-staged: 13.0.3,
- mockjs: 1.1.0,
- prettier: 2.7.1,
- typescript: 4.7.4,
- unplugin-vue-components: 0.21.2,
- vite: 2.9.13,
- vite-plugin-banner: 0.3.0,
- vue-tsc: 0.38.2,
- yorkie: 2.0.0

## Working Functionalities

1. Users can create a free account with an email address – To create an account, the user needs to click the "Sign up" button on the login page and enter the information. 

2. Users can log in to the site to access all the features – If the user types in their username and password, and clicks the login button, the page will redirect to the “Home” page. The system will validate the username and password. If the information is incorrect, a notification will be shown to the user. 

3. Users can only register distinct accounts – When the user attempts to create an account and enter the username, the system will check whether it has already been registered by other users. If the username has already existed, a notification will be shown to the user.

4. User can reset the password – If the user forgets the password, the user is allowed to recover the password by clicking the forget password button and typing in the email associated with the account.

5. Users can view all posts on the Home page – The system will display all posts on the Home page when users login to the system.

6. Users can view comments of any posts - If a user wants to view the comments of a post, he/she can tap the comment section and view the comments left by other users.

7. Users can leave comments on any posts – If a user wants to leave a comment on a post, he/she can tap the comment section and enter the comment.

8. Users can show appreciation or agreement for any posts by tapping the “heart” icon – If a user likes a post or agrees with a post, he/she can simply tap the “heart” icon next to the comment section.

9. Users can view the trending topics – The system will show at most five trending topics when a user taps on the search bar. Users can view the post by tapping on any topic.

10. Users can view the advertisement – The system will show the advertisement under the trending searches when a user taps on the search bar.
 
11. Users can search posts by typing in the keywords in the search bar – If a user types in the keywords in the search bar and press return to search, the related posts will be shown to him/her.

12. Users can choose to view the posts either sorted by the date added, or sorted by the number of “likes” – If a user wants to view the latest post, he/she can tap on the option “Sorted by date”. If a user wants to view the most liked post, he/she can tap on the option “Sorted by like”.

13. Users can view their profiles – A user can view his/her personal profile by tapping the “Me” button.

14. Users can update their nicknames, personal introduction and avatars – A user can update his/her nickname, personal introduction and avatar by tapping the “Edit” button on the profile page and making changes.

15. Users can view other users’ profiles and posts by tapping their avatars – If a user wants to view another user’s profile, he/she can tap on a user’s avatar to explore his/her profile, pet photos and posts.

16. Users can add new friends – If a user wants to add a friend, he/she can tap on the “Add” button on the other user’s profile. An adding friend request will be sent to that user.

17. Users can view all their friends and friend requests – A user can view his/her current friends or check any adding friend requests on the “Friend” page. 

18. Users can choose to accept or decline friend requests – A user can accept a friend request by tapping the “tick” icon or decline an adding friend request by tapping the “cross” icon.

19. Users can delete an existing friend – If a user wants to delete an existing friend, he/she can tap the “Cancel” button on this friend’s profile page.

20. Users can publish new posts – A user can share the pet photos or experiences with other pet lovers by tapping the “add” icon and the “Post” button.

21. Users can delete an existing post – A user can permanently delete a post by tapping the “delete” icon when he/she is editing their profile. The system will send a notification to the user to double-check if he/her decides to delete the post.

22. Users can create “pet profiles” for their pets – A user can create a “pet profile” for his/her pets by tapping the “add” icon and the “Pet” button.

23. Users can view their photos of pets on their profiles – A user can view his/her or other users’ photos of pets by swiping the photos in the gallery on any profile page.

24. Users can delete their “pet profiles” for their pets – If a user wants to delete a “pet profile” for a pet, he/she can tap the gallery and then slide left and click the "delete" button on any pet.

## Guidelines/Quick Start

There are two ways to run our project. The first way is to run it locally, the second way is to run it with Docker.

### Docker way (Recommended)
1. Open the project using Intellij IDE
2. Find application.yml file at `{PROJECT_DIR_PATH}/src/main/resources/application.yml` and change the IP address of project-prefix to your server IP address. 
    ```
    // NOTE: this is only an example

    // http://35.189.24.208:8080 is our IP address
    project:
        file-disk-location: "/D:/userdata/"
        project-prefix: "http://35.189.24.208:8080/images/"
    ```

3. Package project in a JAR file within the target directory using Maven. You can either double-click package in the Maven tool windows in the Intellij IDE, 
![package project](screenshots/package.png)
or run the command in the terminal.
    ```
    mvn package -f pom.xml
    ```

4. Find `animalcare-0.0.1-SNAPSHOT.jar` within the target directory and place this JAR file into `AnimalCare/Backend`. 
![jar file](screenshots/find_jar_file.png)
![jar file](screenshots/place_jar_file_in_backend.png)


5. Go to the parent directory `AnimalCare` and run the command in the Terminal:
    ```
    docker-compose up -d –build
    ```

6. Connect to your MySQL database and execute prepared SQL file. The passwords of MySQL and Redis are defined in `application.yml` file. 
    ```
    // NOTE: this is only an example

    // connect to mysql database
    mysql -u root -p

    // execute prepared SQL file
    source 1.sql
    ```

7. Open the browser and navigate to ${IP_ADDRESS}:3000 (e.g., localhost:3000) in the browser to visit the main page of our project. 

### Localhost way
1. Go to frontend directory and run command `npm install` in the Terminal to download and install libraires
    ```
    npm install
    ```
2. Run command `npm run dev` to start the frontend application.
    ```
    npm run dev
    ```
3. Open the `application.yml` file in the backend directory and 
   - update the username and password in the `datasource` to match the local username and password of your database configuration.
   - update the host and port in the `redis` to match the local username and password of your Redis configuration. 
   - Mount the file disk to your local file disk for storing images
    ```
    // NOTE: this is only an example

    // update for database configuration
    datasource:
        username: root
        password: 123456

    // update for redis configuration
    redis:
        host: 35.189.27.6
        port: 6381

    // update for the path of file disk 
    project:
        file-disk-location: "/D:/userdata/"
    ```

4. Run backend application by clicking `Run` in the Intellij IDE or running the command in the Terminal
   ```
   mvn spring-boot:run
   ```
5. Open the browser and navigate to ${IP_ADDRESS}:3000 (e.g., localhost:3000) in the browser to visit the main page of our project.



