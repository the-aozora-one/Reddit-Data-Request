# Reddit Data Request

[r/Save3rdPartyApps](https://www.reddit.com/r/Save3rdPartyApps/)

Automate a request for your Reddit data.

## Purpose

Reddit is a user content aggregation site that depends on users for all content; it makes sense for users to have some degree of control.
Unfortunately, Reddit has enacted policies that has killed most 3rd party apps in an endeavor to encourage users to install the official app
which lacks many features for that were present in the 3rd party apps.
Many moderators, protest to Reddit's actions, marked their subreddits as NSFW (to prevent Reddit from making revenue from them) and allowed users to submit content that was not entirely in line with the original purpose of the subreddit.
These moderators where threatened by Reddit for their peaceful protests despite being unpaid volunteers.
To protest Reddit's actions, users can request their data from Reddit every thirty (30) days. They are required to provide this information within 30 days and it costs them to collect the data in time and resources. 
This project aims to be a simple script that users can schedule to run every 30 days to [request their data](https://reddit.com/settings/data-request) from Reddit, in support of 3rd party apps and protest Reddit's policies.

## Requirements

- Node.js
- Node Package Manager (NPM)

## Setup

Install the dependencies
`npm i`

Rename `.env.example` to `.env`
Windows users may encounter an issue naming files that start with a period. If you use `Shift + Right Click` in the file explorer, you will get a context menu. Select `Open Powershell Window Here` and use this command to copy and rename the file `copy .env.example .env`

Enter your credentials in `.env`

### Windows

Use the Task Scheduler to run the `node app.js` every thirty days.

### Ubuntu

Use a cron job to schedule run `node app.js` every thirty days.
`0 0 1/30 * *` will run every thirty days at midnight.

## Restrictions

If you have enabled Two-Factor Authentication (2FA), this script will not work since you are required to use a randomly generated number to login.
One option is to switch `NODE_ENV` to `development` so you can see the webpage. From here you can enter your 2FA code and the script will continue.
Since this takes away the automatic portion of this project, you might prefer to set a reminder on your phone or calendar every thirty days to simply go to the web site and do it yourself.
