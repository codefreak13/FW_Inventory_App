## INVENTORY MANAGEMENT APP

An app that allows a user to create, update and delete inventory.

## Overview

The app was built using React Native, Typescript, Context API, and the apps' AsyncStorage was used to persist user logins and data.

## Setup

### Cloning The App Repo

Open this link([Setup React Native CLI](https://reactnative.dev/docs/environment-setup)) on your computer browser tab.  
Select your operating system(OS) type as the Development OS and iOS as your target OS.  
Follow the instructions to properly setup your local machine for React Native Development.

When you have successfully completed the setup, you can proceed to clone the app.

_Before cloning the app, specify the directory/folder to clone the app to with the command line prompt_.

_For example, to clone into the Desktop folder, enter the command below into your command line_.

> `$ cd Desktop`

##

To clone the application, copy and paste any of the commands below to your machine command line, according to your git setup, then press enter

#### If your Git is setup for:

##### HTTPS

> `$ git clone https://github.com/codefreak13/FW_Inventory_App.git`

##### SSH

> `$ git clone git@github.com:codefreak13/FW_Inventory_App.git`

##

### Running The App

After cloning the app, open the app folder with your favourite IDE or code editor and install node modules with the command below

> `$ yarn install`

##

All is set!
You can now build the app by running the following command on your IDE terminal

> `$ yarn android`

This command will also spin up the simulator and run the app

## Testing the App

Testing in the app was setup using Jest for snapshot and Detox for end to end testing.

### Snapshot Test

To run snapshot tests

> `$ yarn test`
