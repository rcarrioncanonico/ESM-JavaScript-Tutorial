# Quickstart Guide

**EMA In-Lab Protocol — Tilburg University**

> **Who is this guide for?**
> Students with little or no programming experience who need to set up and use 
> PsychoPy-based cognitive tasks on a Windows PC. No prior coding knowledge is assumed.

---

## How to Use This Guide

This guide is organized into three levels.

| Level | Goal | Steps to complete |
|-------|------|-------------------|
| **Level 1** | Powershell and Downloads/Accounts | Sections 1 & 2|
| **Level 2** | Familiarizing with applications | Sections 3,  4, & 5|

---

## The Big Picture: How the Tools Connect

<img src="https://i.imgur.com/AQR1vt8.jpeg" alt="Big Picture Diagram" width="650">

| Tool | What it does |
|------|--------------|
| **Miniconda** | Installs and manages Python environments  |
| **psychopy_env** | A Python 3.10 environment pre-loaded with PsychoPy and all required packages to |
| **VS Code** | Code editor where you read, edit, and run experiment scripts |
| **PsychoPy** | The Python library that actually runs cognitive tasks |
| **Pavlovia** | Hosts the web version of tasks so participants can do them on a phone |
| **m-Path** | Sends scheduled notifications to participants and links them to Pavlovia |

---

## Section 1 — Enable Script Execution (Windows only)

Powershell is a **a command-line shell and scripting platform for automation and systems management**. In other words, it can controll your computer similar to what we do when tuning our settings in our smartphones.
Windows blocks scripts by default. You must change this setting once before anything else will work. This is the first line of code you going to run!

1. Press **Win**, type **Powershell**, right-click it, and choose **Run as Administrator**
   <br> <img src="https://i0.wp.com/morgantechspace.com/wp-content/uploads/2021/09/powershell-run-as-administrator-1.png?w=973&ssl=1" width="400">
2. **Paste** the following **command** and press **Enter**:
   <br>
   <br>
   
   `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser`
   <br>
   <br>
3. Type `Y` and press `Enter` if prompted to confirm.
   <br>
   <br>
4. Close PowerShell.

> **Why?** Without this change, Conda and many other tools will silently fail to activate environments or run scripts on Windows.

---

<br>

## Section 2 — Downloads Checklist

Download and install these applications in order to get your computer ready for programming.

### 2a. Required for all levels

| # | What | Where to get it | Notes |
|---|------|-----------------|-------|
| 1 | **VS Code** | [Download Visual Studio Code - Mac, Linux, Windows](https://code.visualstudio.com/Download) | Choose the Windows installer or MacOs depending on your PC |
| 2 | **Miniconda** | [Download Anaconda Distribution Anaconda](https://www.anaconda.com/download) | Scroll to the bottom to find miniconda installer and follow the installation process |
| 3 | **psychopy_env.yml** | [github.com/rcarrioncanonico/Momentary-Assesment-Tools](https://github.com/rcarrioncanonico/Momentary-Assesment-Tools/blob/main/psychopy_env.yml) | Click **Raw**, then `Ctrl+S` to save as `psychopy_env.yml` |
| 4 | **Git** | [Git - Install](https://git-scm.com/install/) | Necessary to Push code to Pavlovia |

> **Important:** During Git Installation there will be a window that will ask you to choose a default editor, be sure to select Visual Studio Code just like in this image:<img src="https://i.imgur.com/0J9Z70F.jpeg" alt="Git editor selection" width="325"> This is the only modification you have to do during Git installation.

> **Important:** During Miniconda Installation be sure to leave this box unchecked like in this image: <img src="https://i.imgur.com/wnWlWSU.png" alt="Miniconda installation checkbox" width="450">

<br>
<br>

### 2b. Necessary Accounts

| # | What | Where to get it | Notes |
|---|------|-----------------|-------|
| 5 | **Github** | [GitHub](https://github.com/) | Needed to sync with VS-Code and to access AI Copilot for easy coding |
| 6 | **Pavlovia account** | [pavlovia.org](https://pavlovia.org/) | Free for researchers |
| 7 | **m-Path account** | [m-path.io](https://m-path.io/) | Coordinate with your supervisor |

### 2c. Optional additional program:

| # | What | Where to get it | Notes |
|---|------|-----------------|-------|
| 8 | **PsychoPy Standalone** | [psychopy.org/download.html](https://www.psychopy.org/download.html) | In-case you are curious how PsychoPy looks like|

---

## Section 3 — Miniconda Use

---

Once Miniconda is intalled you will have a new application called **Anaconda Prompt** which looks like this:

<img src="https://i.imgur.com/8wSNduI.png" alt="Anaconda Prompt" width="200">

To build the `psychopy_env` workspace that we need for all scripts to run PsychoPy tasks we need to:

1. Press `Win`, type **Anaconda Prompt**, and open it (similar to **section 1**).
   <br>
   <br>
2. **Skip this step if your psychopy_env.yml is in the Downloads folder**. To change where **Anaconda Prompt** searches for the folder containing the saved psychopy_env.yml . Copy and paste the code below:

<br>**cd %USERPROFILE%**

3. Create the PsychoPy environment by running this code:
   <br> <br>
   **conda env create -f psychopy_env.yml**
   <br> <br>
4. This downloads and installs all required packages. It may take 5–15 minutes.
   <br> <br>
5. To confirm it succeeded — you should see a `psychopy_env` folder here:

```
C:\Users\<YourName>\miniconda3\envs\psychopy_env\
```
<br>

6.) You can also check by running this code in **Anaconda Prompt**:

**conda env list**


`psychopy_env` should appear in the list.

It will appear something like this: <img src="https://i.imgur.com/vvyGGit.png" alt="conda env list output" width="325">

---

## Section 4 — GitHub Familiarization

Like anything new, GitHub looks scary and contains a lot of new terminology which we are not use to. Terms like **"Repositories"**, **"Commit"**, **"Pull Requests"** and **"Branch"** are common terms in the GitHub community

You have access to this document through the public *repository* known as `EMA-In-Lab-Protocol` ([Link](https://github.com/rcarrioncanonico/EMA-In-Lab-Protocol)). A *repository* is nothing more than a *big folder* which was uploaded to the cloud in GitHub. It contains different files such as this PDF document, other file types such as jupyter notebook files (.ipynb), python files (.py) and can also contain even more folders inside of it.

As you can see the `EMA-In-Lab-Protocol` has a lot of different files in it. This Quick Guide PDF was just one of those files inside that repository. In order to use this protocol we will want to clone (download) the whole repository into your computer.

There are different ways of saving (cloning) a repository into your computer. The simplest way of doing that is to go to the **"Green Box** that has **"Code** written on it, **click** on it and **click** **Download Zip**

<img src="https://i.imgur.com/LpD6791.png" alt="GitHub download zip" width="325">

Once the Zip file is download. You will find it in your files in "Downloads", hover the cursor on the zip file, *right click* and then click on *extract everything* and confirm extraction.

A new folder with the same name of the zip file will be created, be sure to remember where it is located, which would be in the Downloads folder if you don´t decide to change its location.

<img src="https://i.imgur.com/Lxs2qDJ.png" alt="Extracted folder" width="500">

## Recommended- Obtain Copilot Pro

Coding has never been easier with the help of AI and students and teachers can get Copilot Pro for free for 2 years. Be sure to link your account to the GitHub Education benefits following the instructions of this [Link](https://github.com/settings/education/benefits).

For now that is all you have to do in GitHub, but if you wish to know more about it, I recommend this quick 10 minute video to know more about GitHub.
[How To Use GitHub For Beginners - YouTube](https://www.youtube.com/watch?v=a9u2yZvsqHA&t=325s)
<br>
<br>
<br>
<br>
<br>
<br>
<br>

## Section 5 — VS Code Familiarization

### 5a. User Interface

Just like GitHUb, VS-Code can be a little bit confusing and overwhelming as soon as you start it up, don´t worry the user-interface is pretty friendly once you get use to it.
Since it is better to visualize someone using VS-Code rather than in text, I recommend you to watch the first 7 minutes of this video which explains the very initial steps of installing and opening VS-Code. These 7 minutes also explains the "Explorer" part of the "Activity Bar" of VS-Code.
Be sure to have VS-Code open along these videos so you can familiarize yourself with the application.

[VS Code for Absolute Beginners](https://www.youtube.com/watch?v=lWEKiak0WVU)

Another recommended video is the following, in which the first 12 minutes are enough for you to know the other functions such as extensions and the use of Copilot AI.

[Learn Visual Studio Code in 15 minutes: 2026 Official Beginner Tutorial - YouTube](https://www.youtube.com/watch?v=f8_uF_IDV50)

### 5b. Installing Necessary Extension and Linking GitHub.

As this tutorial works within the VS-Code enviroment,  we are going to need to install some extensions to run other types of files such as Jupyter Notebook files known to finish in `.ipynb`.

1. 1.) Open VS Code.
2. 2.) Click the **Extensions** icon in the left sidebar (it looks like four squares, or press `Ctrl+Shift+X`).
3. 3.) Search for **Jupyter** (publisher: Microsoft) and click **Install**. <img src="https://i.imgur.com/qaoIv07.png" alt="Jupyter extension" width="325">
4. 4.) Search for **GitHub Copilot Chat** (publisher: GitHub) and click **Install** <img src="https://i.imgur.com/hoa4FRQ.png" alt="GitHub Copilot Chat extension" width="325">
5. 5.) Search for **Python** (publisher: Microsoft) and click **Install** <img src="https://i.imgur.com/72Eykhs.png" alt="Python extension" width="325">

On the "Activity Bar" on the left hand sight of VS-Code you will see an Icon with a cat on it, click on it and sign in with your Github account in order to sync VS-Code with Github and be able to use all of the AI pro tools. If you wish to know more about how GitHub works inside VS-Code you can check out this link: [Working with GitHub in VS Code](https://code.visualstudio.com/docs/sourcecontrol/github)

### 5c. Open the Protocol Folder

1. 1.) In VS Code, go to **File → Open Folder**.  You can find **"File"** on the top-left corner of VS-Code
2. 2.) Navigate to Downloads Folder
3. 3.) **Select** the folder known as `EMA-In-Lab-Protocol-main` (the one we downloaded and extracted in **Section 4**. <img src="https://i.imgur.com/A9dIqrg.png" alt="Folder selection" width="325">
4. 4.) Once selected, you will see all of the files of the repository  in the "Explorer" icon of the "Activity Bar" which is the "paper looking" icon on the left hand side of VS-Code.
5. 

**Congratulations!** you are free to explore the files of the repository inside VS-Code. From now on this tutorial will take place inside VS-Code. All the files needed to continue were already open during section **5c**. Your next step is to open Jupyter_Starter file inside VS-Code.



```

```
